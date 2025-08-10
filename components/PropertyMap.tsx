'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Property, BoroughBoundary } from '../lib/api'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface PropertyMapProps {
  properties: Property[]
  boroughs?: BoroughBoundary[]
  center?: [number, number]
  zoom?: number
  onPropertyClick?: (property: Property) => void
  className?: string
}

// Component to handle map updates when properties change
function MapUpdater({ properties, boroughs }: { properties: Property[], boroughs?: BoroughBoundary[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(
        properties.map(prop => [prop.coordinates?.lat || 0, prop.coordinates?.lng || 0])
      )
      map.fitBounds(bounds, { padding: [20, 20] })
    }
  }, [properties, map])
  
  return null
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  boroughs = [],
  center = [51.5074, -0.1278], // London center
  zoom = 10,
  onPropertyClick,
  className = ''
}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`bg-slate-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-slate-500">Loading map...</div>
      </div>
    )
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '500px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Borough Boundaries */}
        {boroughs.map((borough, index) => (
          <Polygon
            key={borough.id}
            positions={borough.coordinates.map(coord => [coord[1], coord[0]])}
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
                <h3 className="font-bold text-lg">{borough.name}</h3>
                <p className="text-sm text-slate-600">
                  Area: {borough.area.toLocaleString()} km²
                </p>
              </div>
            </Popup>
          </Polygon>
        ))}
        
        {/* Property Markers */}
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.coordinates?.lat || 0, property.coordinates?.lng || 0]}
            eventHandlers={{
              click: () => onPropertyClick?.(property)
            }}
          >
            <Popup>
              <div className="text-center min-w-[200px]">
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-3 flex items-center justify-center">
                  {property.imageUrl ? (
                    <img 
                      src={property.imageUrl} 
                      alt={property.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-blue-600 text-4xl">🏠</div>
                  )}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{property.title}</h3>
                <p className="text-blue-600 font-bold text-xl mb-2">{property.price}</p>
                <p className="text-slate-600 text-sm mb-2">{property.location}</p>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                  <span>🛏️ {property.bedrooms} beds</span>
                  <span>🚿 {property.bathrooms} baths</span>
                  <span>⭐ {property.lifestyleScore}%</span>
                </div>
                <button
                  onClick={() => {
                    // For now, show property details in an alert
                    // In a real app, this would navigate to a details page
                    alert(`Property Details:\n\n${property.title}\n${property.price}\n${property.location}\n${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms\n\nDescription: ${property.description}`)
                    onPropertyClick?.(property)
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapUpdater properties={properties} boroughs={boroughs} />
      </MapContainer>
    </div>
  )
}

export default PropertyMap 