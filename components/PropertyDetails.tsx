'use client'

import { useState, useEffect } from 'react'
import { Property } from '../lib/api'
import { LifestyleAmenity } from '../lib/overpass'
import dynamic from 'next/dynamic'
import { HiHome, HiStar, HiHeart, HiShare, HiPhone, HiMail, HiCalendar, HiClock, HiLocationMarker, HiArrowRight, HiCheck } from 'react-icons/hi'
import { HiMapPin } from 'react-icons/hi2'

// Dynamically import the map component to prevent SSR issues
const LifestyleMap = dynamic(() => import('./LifestyleMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-slate-100 rounded-lg flex items-center justify-center h-96">
      <div className="text-slate-500">Loading map...</div>
    </div>
  )
})

interface PropertyDetailsProps {
  property: Property
}

interface PropertyNarrative {
  story: string
  highlights: string[]
  neighborhood: string
  lifestyle: string
  investment: string
}

// Fake property narratives for demo purposes
const propertyNarratives: Record<number, PropertyNarrative> = {
  1: {
    story: "This stunning Victorian townhouse in the heart of Chelsea represents the perfect blend of period charm and modern luxury. Originally built in 1887, the property has been meticulously restored and enhanced with contemporary amenities while preserving its architectural heritage.",
    highlights: [
      "Grade II listed building with original period features",
      "Recently renovated kitchen with premium appliances",
      "Private garden with mature landscaping",
      "Excellent transport links to Central London"
    ],
    neighborhood: "Chelsea is one of London's most prestigious neighborhoods, known for its elegant architecture, boutique shopping on King's Road, and proximity to the Thames. The area offers a sophisticated lifestyle with world-class restaurants, art galleries, and cultural venues.",
    lifestyle: "Perfect for professionals who appreciate the finer things in life. The area offers excellent schools, beautiful parks, and a vibrant social scene. Commuting to the City or Canary Wharf is straightforward with nearby tube stations.",
    investment: "Chelsea has consistently shown strong property value appreciation. This property offers excellent rental potential and is in high demand from both domestic and international buyers."
  },
  2: {
    story: "A contemporary masterpiece in the heart of Shoreditch, this loft-style apartment showcases cutting-edge design and urban sophistication. The open-plan living space features exposed brick walls, high ceilings, and floor-to-ceiling windows that flood the space with natural light.",
    highlights: [
      "Industrial-chic design with exposed brick and steel beams",
      "Smart home technology throughout",
      "Rooftop terrace with city views",
      "24/7 concierge and secure parking"
    ],
    neighborhood: "Shoreditch is London's creative and tech hub, home to innovative startups, trendy cafes, and some of the city's best street art. The area buzzes with energy and offers an eclectic mix of traditional markets and modern amenities.",
    lifestyle: "Ideal for young professionals and creatives who want to be at the center of London's innovation scene. The area offers excellent networking opportunities, creative spaces, and a dynamic nightlife.",
    investment: "Shoreditch continues to attract significant investment and development. Properties in this area have shown strong growth potential, especially for tech professionals and creative industries."
  },
  3: {
    story: "This elegant Georgian townhouse in Mayfair represents the pinnacle of London luxury living. Built in 1760, the property has been home to several notable figures throughout history and has been carefully maintained to preserve its grandeur and historical significance.",
    highlights: [
      "Original Georgian architecture with period details",
      "Private courtyard garden",
      "Staff quarters and wine cellar",
      "Walking distance to Hyde Park and luxury shopping"
    ],
    neighborhood: "Mayfair is London's most exclusive neighborhood, home to luxury hotels, fine dining establishments, and high-end retail. The area offers privacy, security, and access to the city's finest cultural institutions.",
    lifestyle: "Perfect for high-net-worth individuals who demand the very best. The area offers unparalleled luxury shopping, fine dining, and cultural experiences. Privacy and discretion are guaranteed in this prestigious enclave.",
    investment: "Mayfair properties are considered among the most valuable real estate in the world. This property offers exceptional long-term investment potential and is highly sought after by international buyers."
  },
  4: {
    story: "A modern family home in the heart of Hampstead, this property offers the perfect balance of suburban tranquility and city convenience. The spacious interior is designed for family living, with large rooms, plenty of storage, and a beautiful garden that's perfect for children and entertaining.",
    highlights: [
      "Family-friendly layout with multiple living areas",
      "Large kitchen-diner perfect for family meals",
      "Generous garden with play area",
      "Excellent schools within walking distance"
    ],
    neighborhood: "Hampstead is one of London's most desirable family neighborhoods, known for its village atmosphere, beautiful parks, and excellent schools. The area offers a peaceful retreat from the city while maintaining easy access to central London.",
    lifestyle: "Perfect for families who want the best of both worlds - a peaceful, green environment with excellent amenities and easy access to the city. The area offers excellent schools, beautiful parks, and a strong community feel.",
    investment: "Hampstead is consistently one of London's most stable property markets. Family homes in this area are always in high demand and offer excellent long-term investment potential."
  },
  5: {
    story: "This contemporary riverside apartment in Canary Wharf offers spectacular views of the Thames and the city skyline. The sleek, modern design emphasizes space and light, with floor-to-ceiling windows that showcase the stunning waterfront location.",
    highlights: [
      "Panoramic river and city views",
      "Modern open-plan design",
      "Balcony overlooking the Thames",
      "Access to exclusive residents' facilities"
    ],
    neighborhood: "Canary Wharf is London's modern financial district, offering a sophisticated urban lifestyle with world-class shopping, dining, and entertainment. The area is well-connected with excellent transport links and modern infrastructure.",
    lifestyle: "Perfect for professionals who work in the financial district and want a modern, convenient lifestyle. The area offers excellent shopping, dining, and entertainment options, all within walking distance.",
    investment: "Canary Wharf continues to grow and develop, making it an attractive investment location. The area offers modern amenities and excellent transport links, appealing to both domestic and international buyers."
  }
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  // Safety check to ensure property has all required fields
  if (!property || !property.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiHome className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Property Data</h1>
          <p className="text-gray-600">The property information is incomplete or invalid.</p>
        </div>
      </div>
    )
  }

  const [amenities, setAmenities] = useState<LifestyleAmenity[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite] = useState(false)

  const narrative = propertyNarratives[property.id] || propertyNarratives[1]

  useEffect(() => {
    if (property.coordinates?.lat && property.coordinates?.lng) {
      fetchNearbyAmenities()
    }
  }, [property.coordinates])

  const fetchNearbyAmenities = async () => {
    if (!property.coordinates?.lat || !property.coordinates?.lng) return
    
    setLoading(true)
    try {
      const response = await fetch(
        `/api/lifestyle?lat=${property.coordinates.lat}&lng=${property.coordinates.lng}&radius=1000&type=all`
      )
      
      if (response.ok) {
        const data = await response.json()
        setAmenities(data.amenities || [])
      }
    } catch (err) {
      console.error('Failed to fetch amenities:', err)
    } finally {
      setLoading(false)
    }
  }

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

  const getHomeImage = (id: number) => {
    const homeImages = [
      '/Homes/home1.jpg',
      '/Homes/home2.jpg',
      '/Homes/home3.jpg',
      '/Homes/home4.jpg',
      '/Homes/home5.jpeg',
      '/Homes/home7.webp'
    ]
    return homeImages[(id - 1) % homeImages.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section with Premium Design */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src={getHomeImage(property.id)}
          alt={property.title || 'Property'}
          className="w-full h-full object-cover"
        />
        
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        
        {/* Floating Info Card */}
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
              <div className="text-2xl">✦</div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {property.title || 'Property'}
            </h1>
            
            <div className="space-y-2 mb-6">
              <p className="text-gray-600 text-sm">{property.location || 'Location TBC'}</p>
              <p className="text-gray-600 text-sm">{property.bedrooms || 0} beds • {property.bathrooms || 0} baths • {property.type || 'Property'}</p>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">{property.price || 'Price on request'}</span>
            </div>
            
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Schedule Viewing
            </button>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">Lifestyle Score</div>
              <div className="text-2xl font-bold text-slate-900">{property.lifestyleScore || 0}</div>
            </div>
          </div>
        </div>

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6 text-white/90">
              <a href="/demo" className="text-sm font-medium hover:text-white transition-colors">← Back to Search</a>
              <span className="text-sm font-medium">Properties</span>
              <span className="text-sm font-medium">About</span>
              <span className="text-sm font-medium">Contact</span>
            </div>
            <div className="text-2xl text-white/90">✦</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative -mt-20 bg-white rounded-t-3xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Tab Navigation */}
          <div className="flex space-x-8 mb-12 border-b border-gray-200">
            {['overview', 'lifestyle', 'location'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-slate-900 border-b-2 border-slate-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {activeTab === 'overview' && (
                <div className="space-y-12">
                  {/* Property Highlights */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Property Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {narrative.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <HiCheck className="w-4 h-4 text-slate-900" />
                          </div>
                          <p className="text-gray-700 leading-relaxed">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Property Story */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Story</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{narrative.story}</p>
                  </div>

                  {/* Property Stats */}
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <HiHome className="w-8 h-8 text-slate-900" />
                        </div>
                        <span className="text-sm text-gray-600">Property Type</span>
                        <p className="font-semibold text-gray-900">{property.type || 'Property'}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">🛏️</span>
                        </div>
                        <span className="text-sm text-gray-600">Bedrooms</span>
                        <p className="font-semibold text-gray-900">{property.bedrooms || 0}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">🚿</span>
                        </div>
                        <span className="text-sm text-gray-600">Bathrooms</span>
                        <p className="font-semibold text-gray-900">{property.bathrooms || 0}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <HiStar className="w-8 h-8 text-slate-900" />
                        </div>
                        <span className="text-sm text-gray-600">Lifestyle Score</span>
                        <p className="font-semibold text-gray-900">{property.lifestyleScore || 0}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{property.description || 'No description available'}</p>
                  </div>

                  {/* Nearby Amenities */}
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Nearby Amenities</h3>
                    <div className="flex flex-wrap gap-3">
                      {(property.nearbyAmenities || []).map((amenity, index) => (
                        <span key={index} className="px-4 py-2 bg-slate-100 text-slate-800 rounded-full text-sm font-medium border border-slate-200">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'lifestyle' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Lifestyle & Investment</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifestyle</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{narrative.lifestyle}</p>
                      </div>
                      
                      <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Potential</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{narrative.investment}</p>
                      </div>

                      {/* Nearby Amenities List */}
                      <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Nearby Amenities</h3>
                        {loading ? (
                          <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading nearby amenities...</p>
                          </div>
                        ) : amenities.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {amenities.slice(0, 12).map((amenity) => (
                              <div key={amenity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <span className="text-2xl">{getAmenityIcon(amenity.type)}</span>
                                <div>
                                  <p className="font-medium text-gray-900">{amenity.name}</p>
                                  <p className="text-sm text-gray-600 capitalize">
                                    {amenity.type.replace('_', ' ')}
                                    {amenity.distance && ` • ${(amenity.distance / 1000).toFixed(1)}km`}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-12">No nearby amenities found</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Location & Neighborhood</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Neighborhood</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{narrative.neighborhood}</p>
                      </div>
                      
                      <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Commute Information</h3>
                        <div className="flex items-center gap-3 text-gray-600">
                          <HiClock className="w-6 h-6 text-slate-900" />
                          <span className="text-lg">Average commute time: {property.commuteTime || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Interactive Map */}
                      <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Local Area Map</h3>
                        {property.coordinates?.lat && property.coordinates?.lng ? (
                          <LifestyleMap
                            amenities={amenities}
                            center={[property.coordinates.lat, property.coordinates.lng]}
                            radius={1000}
                            className="h-96 rounded-xl"
                          />
                        ) : (
                          <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-gray-500">Map not available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Contact Agent */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Agent</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://source.unsplash.com/100x100/?portrait,professional"
                      alt="Agent"
                      className="w-16 h-16 rounded-full object-cover border-4 border-slate-100"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Sarah Johnson</p>
                      <p className="text-gray-600">Senior Property Consultant</p>
                    </div>
                  </div>
                  
                  <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <HiPhone className="w-5 h-5 inline mr-2" />
                    Call Agent
                  </button>
                  
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                    <HiMail className="w-5 h-5 inline mr-2" />
                    Send Message
                  </button>
                </div>
              </div>

              {/* Schedule Viewing */}
              <div className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Schedule Viewing</h3>
                <div className="space-y-4">
                  <button className="w-full bg-white text-slate-900 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <HiCalendar className="w-5 h-5 inline mr-2" />
                    Book Viewing
                  </button>
                  <p className="text-slate-200 text-center text-sm">
                    Available for viewings 7 days a week
                  </p>
                </div>
              </div>

              {/* Property Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Lifestyle Score</span>
                    <span className="font-bold text-2xl text-slate-900">{property.lifestyleScore || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Commute Time</span>
                    <span className="font-bold text-xl text-gray-900">{property.commuteTime || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Nearby Amenities</span>
                    <span className="font-bold text-xl text-gray-900">{property.nearbyAmenities?.length || 0}</span>
                  </div>
                </div>
              </div>

              {/* Share Property */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Property</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-colors">
                    Facebook
                  </button>
                  <button className="bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-xl text-sm font-medium transition-colors">
                    Twitter
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-medium transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 