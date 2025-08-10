'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { LifestyleAmenity } from '../lib/overpass'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Dynamically import Leaflet components to prevent SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false })

interface LifestyleMapProps {
  amenities: LifestyleAmenity[]
  center: [number, number]
  radius: number
  className?: string
}

const LifestyleMap: React.FC<LifestyleMapProps> = ({
  amenities,
  center,
  radius,
  className = ''
}) => {
  const [isClient, setIsClient] = useState(false)
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    // Import Leaflet only on client side
    import('leaflet').then(leaflet => {
      setL(leaflet.default)
      
      // Fix for default markers in react-leaflet
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    })
  }, [])

  if (!isClient || !L) {
    return (
      <div className={`bg-slate-100 rounded-lg flex items-center justify-center h-96 ${className}`}>
        <div className="text-slate-500">Loading map...</div>
      </div>
    )
  }

  const getAmenityIcon = (type: string) => {
    const iconSize = [25, 25]
    const iconAnchor = [12, 25]
    
    switch (type) {
      case 'restaurant':
        return L.divIcon({
          html: '<div class="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">🍽️</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      case 'cafe':
        return L.divIcon({
          html: '<div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">☕</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      case 'school':
        return L.divIcon({
          html: '<div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">🏫</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      case 'library':
        return L.divIcon({
          html: '<div class="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">📚</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      case 'park':
      case 'garden':
        return L.divIcon({
          html: '<div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">🌳</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      case 'subway_station':
      case 'train_station':
      case 'bus_station':
        return L.divIcon({
          html: '<div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">🚇</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      case 'gym':
      case 'sports_centre':
        return L.divIcon({
          html: '<div class="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">💪</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      case 'shop':
      case 'supermarket':
        return L.divIcon({
          html: '<div class="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">🛍️</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      case 'hospital':
      case 'pharmacy':
        return L.divIcon({
          html: '<div class="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">🏥</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
      default:
        return L.divIcon({
          html: '<div class="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">📍</div>',
          className: 'custom-div-icon',
          iconSize,
          iconAnchor
        })
    }
  }

  const getAmenityColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'bg-red-500'
      case 'cafe': return 'bg-orange-500'
      case 'school': return 'bg-blue-500'
      case 'library': return 'bg-indigo-500'
      case 'park':
      case 'garden': return 'bg-green-500'
      case 'subway_station':
      case 'train_station':
      case 'bus_station': return 'bg-purple-500'
      case 'gym':
      case 'sports_centre': return 'bg-pink-500'
      case 'shop':
      case 'supermarket': return 'bg-yellow-500'
      case 'hospital':
      case 'pharmacy': return 'bg-red-600'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: '500px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Search Radius Circle */}
        <Circle
          center={center}
          radius={radius}
          pathOptions={{
            color: '#3b82f6',
            weight: 2,
            opacity: 0.6,
            fillColor: '#3b82f6',
            fillOpacity: 0.1
          }}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg">Search Area</h3>
              <p className="text-sm text-slate-600">
                Radius: {radius}m
              </p>
              <p className="text-sm text-slate-600">
                {amenities.length} amenities found
              </p>
            </div>
          </Popup>
        </Circle>
        
        {/* Amenity Markers */}
        {amenities.map((amenity) => (
          <Marker
            key={amenity.id}
            position={[amenity.coordinates[0], amenity.coordinates[1]]}
            icon={getAmenityIcon(amenity.type)}
          >
            <Popup>
              <div className="text-center min-w-[200px]">
                <div className={`w-12 h-12 ${getAmenityColor(amenity.type)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-white text-xl">
                    {getAmenityIcon(amenity.type).options.html.match(/[^\u0000-\u007F]+/)?.[0] || '📍'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{amenity.name}</h3>
                <p className="text-slate-600 text-sm mb-2 capitalize">
                  {amenity.type.replace('_', ' ')}
                </p>
                {amenity.distance && (
                  <p className="text-slate-500 text-sm mb-3">
                    📍 {(amenity.distance / 1000).toFixed(1)}km away
                  </p>
                )}
                {amenity.tags && Object.keys(amenity.tags).length > 0 && (
                  <div className="text-xs text-slate-500">
                    {Object.entries(amenity.tags).map(([key, value]) => (
                      <div key={key} className="mb-1">
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default LifestyleMap 