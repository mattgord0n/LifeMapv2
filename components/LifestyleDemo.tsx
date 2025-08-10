'use client'

import { useState, useEffect } from 'react'
import { LifestyleAmenity } from '../lib/overpass'
import dynamic from 'next/dynamic'

// Dynamically import the map component to prevent SSR issues
const LifestyleMap = dynamic(() => import('./LifestyleMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-slate-100 rounded-lg flex items-center justify-center h-96">
      <div className="text-slate-500">Loading map...</div>
    </div>
  )
})

interface LifestyleDemoProps {
  defaultLat?: number
  defaultLng?: number
}

export default function LifestyleDemo({ defaultLat = 51.5074, defaultLng = -0.1278 }: LifestyleDemoProps) {
  const [lat, setLat] = useState(defaultLat)
  const [lng, setLng] = useState(defaultLng)
  const [radius, setRadius] = useState(2000)
  const [amenityType, setAmenityType] = useState('all')
  const [amenities, setAmenities] = useState<LifestyleAmenity[]>([])
  const [lifestyleScore, setLifestyleScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAmenities = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `/api/lifestyle?lat=${lat}&lng=${lng}&radius=${radius}&type=${amenityType}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch amenities')
      }
      
      const data = await response.json()
      setAmenities(data.amenities || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const fetchLifestyleScore = async () => {
    try {
      const response = await fetch(
        `/api/lifestyle?lat=${lat}&lng=${lng}&radius=${radius}&type=score`
      )
      
      if (response.ok) {
        const data = await response.json()
        setLifestyleScore(data.lifestyleScore)
      }
    } catch (err) {
      console.error('Failed to fetch lifestyle score:', err)
    }
  }

  useEffect(() => {
    fetchAmenities()
    fetchLifestyleScore()
  }, [lat, lng, radius, amenityType])

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return '🍽️'
      case 'cafe': return '☕'
      case 'bar': return '🍺'
      case 'pub': return '🍻'
      case 'school': return '🏫'
      case 'university': return '🎓'
      case 'library': return '📚'
      case 'park': return '🌳'
      case 'garden': return '🌺'
      case 'playground': return '🎠'
      case 'hospital': return '🏥'
      case 'clinic': return '💊'
      case 'pharmacy': return '💊'
      case 'shop': return '🛍️'
      case 'supermarket': return '🛒'
      case 'market': return '🏪'
      case 'theatre': return '🎭'
      case 'museum': return '🏛️'
      case 'cinema': return '🎬'
      case 'gym': return '💪'
      case 'sports_centre': return '⚽'
      case 'swimming_pool': return '🏊'
      case 'bus_station': return '🚌'
      case 'train_station': return '🚂'
      case 'subway_station': return '🚇'
      default: return '📍'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🌍 LifeMap Lifestyle Explorer
        </h2>
        <p className="text-gray-600 mb-6">
          Discover real-world amenities and lifestyle data using OpenStreetMap via Overpass API
        </p>
        
        {/* Lifestyle Score Display */}
        {lifestyleScore !== null && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{lifestyleScore}/100</div>
              <div className="text-xl">Lifestyle Score</div>
              <div className="text-sm opacity-90">
                Based on nearby amenities within {radius}m
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude
          </label>
          <input
            type="number"
            step="0.0001"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude
          </label>
          <input
            type="number"
            step="0.0001"
            value={lng}
            onChange={(e) => setLng(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Radius (meters)
          </label>
          <input
            type="number"
            step="100"
            min="100"
            max="10000"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenity Type
          </label>
          <select
            value={amenityType}
            onChange={(e) => setAmenityType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Amenities</option>
            <option value="restaurants">Restaurants & Cafes</option>
            <option value="schools">Schools & Libraries</option>
            <option value="greenspaces">Parks & Gardens</option>
            <option value="transport">Transport</option>
          </select>
        </div>
      </div>

      {/* Quick Location Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setLat(51.5074); setLng(-0.1278) }}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
        >
          🏛️ London (Westminster)
        </button>
        <button
          onClick={() => { setLat(51.5010); setLng(-0.1246) }}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
        >
          🌳 Hyde Park
        </button>
        <button
          onClick={() => { setLat(51.4994); setLng(-0.1245) }}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
        >
          🎭 South Kensington
        </button>
      </div>

      {/* Interactive Map */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🗺️ Interactive Map View</h3>
        <LifestyleMap
          amenities={amenities}
          center={[lat, lng]}
          radius={radius}
          className="mb-4"
        />
        <p className="text-sm text-gray-600 text-center">
          💡 Click on any amenity pin to see details. The blue circle shows your search radius.
        </p>
      </div>

      {/* Results */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {loading ? 'Loading...' : `${amenities.length} Amenities Found`}
          </h3>
          <button
            onClick={fetchAmenities}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            🔄 Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Fetching real-world data...</p>
          </div>
        ) : amenities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{getAmenityIcon(amenity.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {amenity.name}
                    </h4>
                    <p className="text-sm text-gray-600 capitalize mb-2">
                      {amenity.type.replace('_', ' ')}
                    </p>
                    {amenity.distance && (
                      <p className="text-xs text-gray-500">
                        📍 {(amenity.distance / 1000).toFixed(1)}km away
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No amenities found in this area. Try adjusting the radius or location.
          </div>
        )}
      </div>

      {/* API Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">🔗 API Endpoint</h4>
        <p className="text-sm text-blue-800">
          <code className="bg-blue-100 px-2 py-1 rounded">
            GET /api/lifestyle?lat={lat}&lng={lng}&radius={radius}&type={amenityType}
          </code>
        </p>
        <p className="text-xs text-blue-700 mt-2">
          Powered by OpenStreetMap data via Overpass API - completely free and open source!
        </p>
      </div>
    </div>
  )
} 