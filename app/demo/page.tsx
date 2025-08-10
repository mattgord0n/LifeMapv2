'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiSearch, HiLocationMarker, HiHome, HiStar, HiClock, HiFilter, HiMap, HiAcademicCap, HiShoppingBag, HiLocationMarker as HiLocation, HiHeart, HiUser, HiShieldCheck } from 'react-icons/hi'
import LifestyleDemo from '../../components/LifestyleDemo'
import dynamicImport from 'next/dynamic'
import Link from 'next/link'

// Dynamically import PropertyMap to prevent Leaflet SSR issues
const PropertyMap = dynamicImport(() => import('../../components/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-slate-100 rounded-lg flex items-center justify-center h-96">
      <div className="text-slate-500">Loading map...</div>
    </div>
  )
})

interface Property {
  id: number
  title: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  type: string
  lifestyleScore: number
  commuteTime: string
  nearbyAmenities: string[]
  description: string
  coordinates?: { lat: number; lng: number }
}

interface LifestylePreferences {
  commuteTime: string
  greenSpaces: boolean
  schools: boolean
  shopping: boolean
  restaurants: boolean
  transport: boolean
  nightlife: boolean
  familyFriendly: boolean
  professional: boolean
  creative: boolean
}

export default function DemoPage() {
  // Define properties array first
  const properties: Property[] = [
    {
      id: 1,
      title: '1 Surrey Street, Temple - Luxury Apartment',
      price: '£2,500,000',
      location: '1 Surrey St, Temple, London WC2R 2ND',
      bedrooms: 4,
      bathrooms: 3,
      type: 'Apartment',
      lifestyleScore: 95,
      commuteTime: '15 min',
      nearbyAmenities: ['Temple Station', 'Royal Courts of Justice', 'Fleet Street', 'Embankment Gardens'],
      description: 'Stunning luxury apartment in the prestigious Temple area, minutes from the Royal Courts of Justice and excellent transport links.',
      coordinates: { lat: 51.5136, lng: -0.1136 }
    },
    {
      id: 2,
      title: '111 Southwark Street - Modern Loft',
      price: '£1,800,000',
      location: '111 Southwark St, London SE1 0JF',
      bedrooms: 3,
      bathrooms: 2,
      type: 'Loft',
      lifestyleScore: 92,
      commuteTime: '12 min',
      nearbyAmenities: ['London Bridge Station', 'Borough Market', 'Tate Modern', 'Shard'],
      description: 'Contemporary loft conversion in vibrant Southwark, perfectly positioned near Borough Market and the cultural quarter.',
      coordinates: { lat: 51.5045, lng: -0.0865 }
    },
    {
      id: 3,
      title: '57 Clerkenwell Road - Farringdon Townhouse',
      price: '£4,200,000',
      location: '57 Clerkenwell Rd, Farringdon, London EC1M 5NG',
      bedrooms: 5,
      bathrooms: 4,
      type: 'Townhouse',
      lifestyleScore: 98,
      commuteTime: '8 min',
      nearbyAmenities: ['Farringdon Station', 'Clerkenwell Green', 'Exmouth Market', 'Barbican Centre'],
      description: 'Exclusive townhouse in the heart of Farringdon, offering the ultimate city lifestyle with access to the best of London.',
      coordinates: { lat: 51.5208, lng: -0.1053 }
    },
    {
      id: 4,
      title: '30 Millbank - Westminster Mansion',
      price: '£6,500,000',
      location: '30 Millbank, Westminster, London SW1P 4DU',
      bedrooms: 6,
      bathrooms: 4,
      type: 'Mansion',
      lifestyleScore: 96,
      commuteTime: '10 min',
      nearbyAmenities: ['Westminster Station', 'Houses of Parliament', 'Tate Britain', 'Thames Path'],
      description: 'Magnificent mansion on prestigious Millbank, overlooking the Thames with views of the Houses of Parliament.',
      coordinates: { lat: 51.4958, lng: -0.1247 }
    },
    {
      id: 5,
      title: '27 Broadley Terrace - Marylebone Victorian House',
      price: '£3,800,000',
      location: '27 Broadley Terrace, Marylebone, London NW1 6LG',
      bedrooms: 5,
      bathrooms: 3,
      type: 'House',
      lifestyleScore: 91,
      commuteTime: '18 min',
      nearbyAmenities: ['Baker Street Station', 'Regent\'s Park', 'Marylebone High Street', 'Madame Tussauds'],
      description: 'Beautiful Victorian house in Marylebone with period features, garden access and excellent family amenities.',
      coordinates: { lat: 51.5225, lng: -0.1537 }
    },
    {
      id: 6,
      title: '4 Northington Street - Holborn Modern Apartment',
      price: '£2,800,000',
      location: '4 Northington St, Holborn, London WC1N 2JG',
      bedrooms: 3,
      bathrooms: 3,
      type: 'Apartment',
      lifestyleScore: 94,
      commuteTime: '14 min',
      nearbyAmenities: ['Holborn Station', 'British Museum', 'Lincoln\'s Inn Fields', 'Covent Garden'],
      description: 'Elegant modern apartment in Holborn with access to world-class cultural institutions and excellent transport links.',
      coordinates: { lat: 51.5175, lng: -0.1187 }
    }
  ]

  // Now define state variables
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [propertyType, setPropertyType] = useState('all')
  const [bedrooms, setBedrooms] = useState('any')
  const [lifestylePreferences, setLifestylePreferences] = useState<LifestylePreferences>({
    commuteTime: '30',
    greenSpaces: false,
    schools: false,
    shopping: false,
    restaurants: false,
    transport: false,
    nightlife: false,
    familyFriendly: false,
    professional: false,
    creative: false
  })
  const [searchResults, setSearchResults] = useState<Property[]>(properties)
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [boroughs, setBoroughs] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(true)

  // Helper function to get home image based on property ID
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

  // Fetch boroughs data
  useEffect(() => {
    const fetchBoroughs = async () => {
      try {
        const response = await fetch('/api/boroughs')
        const data = await response.json()
        setBoroughs(data)
      } catch (error) {
        console.error('Failed to fetch boroughs:', error)
        setBoroughs([])
      }
    }
    
    fetchBoroughs()
  }, [])

  // Helper function to scroll to results section
  const scrollToResults = () => {
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section')
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }
  const [sortBy, setSortBy] = useState<'price' | 'lifestyleScore' | 'commuteTime'>('lifestyleScore')

  const locations = [
    'Temple',
    'Southwark',
    'Farringdon',
    'Westminster',
    'Marylebone',
    'Holborn',
    'Clerkenwell',
    'Fleet Street',
    'Millbank',
    'Covent Garden'
  ]

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'flat', label: 'Flat' },
    { value: 'mansion', label: 'Mansion' },
    { value: 'penthouse', label: 'Penthouse' }
  ]

  const bedroomOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4 Bedrooms' },
    { value: '5+', label: '5+ Bedrooms' }
  ]

  const handleSearch = () => {
    console.log('handleSearch called with:', {
      searchQuery,
      selectedLocation,
      propertyType,
      bedrooms,
      priceRange,
      lifestylePreferences
    })
    
    // If search query is empty and no other filters are applied, show all properties
    if (searchQuery.trim() === '' && 
        selectedLocation === '' && 
        propertyType === 'all' && 
        bedrooms === 'any' &&
        priceRange[0] === 0 && 
        priceRange[1] === 2000000 &&
        !Object.values(lifestylePreferences).some(val => val === true)) {
      console.log('Showing all properties (no filters applied)')
      setSearchResults(properties)
      setHasSearched(true)
      
      // Scroll to results section after showing all properties
      scrollToResults()
      return
    }

    if (searchQuery.trim().length < 2 && searchQuery.trim() !== '') {
      alert('Please enter at least 2 characters for your search')
      return
    }

    setIsSearching(true)
    setHasSearched(true)

    // Simulate API delay
    setTimeout(() => {
      try {
        const filtered = properties.filter(property => {
          const matchesQuery = searchQuery === '' || 
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description.toLowerCase().includes(searchQuery.toLowerCase())

          const matchesLocation = selectedLocation === '' || property.location.includes(selectedLocation)
          
          const priceValue = parseInt(property.price.replace(/[£,]/g, ''))
          const matchesPrice = !isNaN(priceValue) && priceValue >= priceRange[0] && priceValue <= priceRange[1]
          
          // Debug logging for price filtering
          if (isNaN(priceValue)) {
            console.warn(`Invalid price value for property ${property.id}: ${property.price}`)
          }
          
          const matchesType = propertyType === 'all' || property.type.toLowerCase() === propertyType
          const matchesBedrooms = bedrooms === 'any' || 
            (bedrooms === '5+' ? property.bedrooms >= 5 : property.bedrooms === parseInt(bedrooms))

          const matchesLifestyle = Object.entries(lifestylePreferences).every(([key, value]) => {
            if (key === 'commuteTime') {
              const commuteValue = parseInt(property.commuteTime.replace(/\D/g, ''))
              const maxCommute = parseInt(value)
              return !isNaN(commuteValue) && !isNaN(maxCommute) && commuteValue <= maxCommute
            }
            // For boolean preferences, only filter if they are true
            if (typeof value === 'boolean') {
              return !value || property.nearbyAmenities.some(amenity => 
                amenity.toLowerCase().includes(key.toLowerCase())
              )
            }
            return true
          })

          const matches = matchesQuery && matchesLocation && matchesPrice && matchesType && matchesBedrooms && matchesLifestyle
          
          // Debug logging for the first few properties
          if (property.id <= 3) {
            console.log(`Property ${property.id} (${property.title}):`, {
              matchesQuery,
              matchesLocation,
              matchesPrice,
              matchesType,
              matchesBedrooms,
              matchesLifestyle,
              final: matches
            })
          }
          
          return matches
        })

        setSearchResults(filtered)
        setIsSearching(false)
        
        // Scroll to results section after search completes
        scrollToResults()
      } catch (error) {
        console.error('Error during property filtering:', error)
        setSearchResults([])
        setIsSearching(false)
      }
    }, 1000)
  }

  const toggleLifestylePreference = (key: keyof LifestylePreferences) => {
    setLifestylePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const updatePriceRange = (index: number, value: number) => {
    // Ensure value is within valid range
    const validValue = Math.max(100000, Math.min(2000000, value))
    
    const newRange = [...priceRange]
    newRange[index] = validValue

    // Ensure min doesn't exceed max
    if (index === 0 && validValue > newRange[1]) {
      newRange[1] = validValue
    } else if (index === 1 && validValue < newRange[0]) {
      newRange[0] = validValue
    }

    setPriceRange(newRange)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-5xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Find A House That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Suits You
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Want to find a home? We are ready to help you find one that suits your lifestyle and needs
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 mb-16"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">1200+</div>
                <div className="text-slate-600 font-medium">Listed Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">4500+</div>
                <div className="text-slate-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">100+</div>
                <div className="text-slate-600 font-medium">Awards</div>
              </div>
            </motion.div>

            {/* Floating Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl max-w-6xl mx-auto border border-slate-100"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
                Search for available properties
              </h2>
              
              <div className="grid lg:grid-cols-4 gap-6 mb-8">
                {/* Search Input */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Search Properties
                  </label>
                  <div className="relative">
                    <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by area, postcode, or landmark..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white placeholder-slate-400 text-lg"
                    />
                  </div>
                </div>

                {/* Location Selector */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white text-lg"
                  >
                    <option value="">Any Location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white text-lg"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Advanced Filters Row */}
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Price Range: £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-2">Min: £{priceRange[0].toLocaleString()}</label>
                      <input
                        type="range"
                        min="100000"
                        max="2000000"
                        step="50000"
                        value={priceRange[0]}
                        onChange={(e) => updatePriceRange(0, parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-2">Max: £{priceRange[1].toLocaleString()}</label>
                      <input
                        type="range"
                        min="100000"
                        max="2000000"
                        step="50000"
                        value={priceRange[1]}
                        onChange={(e) => updatePriceRange(1, parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white text-lg"
                  >
                    {bedroomOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Lifestyle Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Lifestyle Filters
                  </label>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200 text-slate-700 font-medium flex items-center justify-center gap-2"
                  >
                    <HiFilter className="w-5 h-5" />
                    {showFilters ? 'Hide' : 'Show'} Advanced
                  </button>
                </div>
              </div>

              {/* Lifestyle Preferences */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-200 pt-6"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Lifestyle Preferences</h3>
                  
                  {/* Commute Time */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Max Commute Time: {lifestylePreferences.commuteTime} min
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={lifestylePreferences.commuteTime}
                      onChange={(e) => setLifestylePreferences(prev => ({ ...prev, commuteTime: e.target.value }))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Lifestyle Categories */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <button
                      onClick={() => toggleLifestylePreference('greenSpaces')}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        lifestylePreferences.greenSpaces 
                          ? 'bg-green-100 text-green-800 border-2 border-green-300 shadow-md' 
                          : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:bg-slate-200'
                      }`}
                    >
                      <HiMap className="w-5 h-5 mx-auto mb-2" />
                      Green Spaces
                    </button>
                    
                    <button
                      onClick={() => toggleLifestylePreference('schools')}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        lifestylePreferences.schools 
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300 shadow-md' 
                          : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:bg-slate-200'
                      }`}
                    >
                      <HiAcademicCap className="w-5 h-5 mx-auto mb-2" />
                      Schools
                    </button>
                    
                    <button
                      onClick={() => toggleLifestylePreference('shopping')}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        lifestylePreferences.shopping 
                          ? 'bg-purple-100 text-purple-800 border-2 border-purple-300 shadow-md' 
                          : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:bg-slate-200'
                      }`}
                    >
                      <HiShoppingBag className="w-5 h-5 mx-auto mb-2" />
                      Shopping
                    </button>
                    
                    <button
                      onClick={() => toggleLifestylePreference('transport')}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        lifestylePreferences.transport 
                          ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300 shadow-md' 
                          : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:bg-slate-200'
                      }`}
                    >
                      <HiLocation className="w-5 h-5 mx-auto mb-2" />
                      Transport
                    </button>
                    
                    <button
                      onClick={() => toggleLifestylePreference('restaurants')}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        lifestylePreferences.restaurants 
                          ? 'bg-red-100 text-red-800 border-2 border-red-300 shadow-md' 
                          : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:bg-slate-200'
                      }`}
                    >
                      <HiHeart className="w-5 h-5 mx-auto mb-2" />
                      Dining
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Search Button */}
              <div className="text-center pt-6">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-200 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isSearching ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <HiSearch className="w-6 h-6" />
                      Find My Perfect Home
                    </>
                  )}
                </button>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                  <button
                    onClick={() => {
                      console.log('Show All Properties clicked')
                      setSearchResults(properties)
                      setHasSearched(true)
                      
                      // Scroll to results section
                      scrollToResults()
                    }}
                    className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors duration-200"
                  >
                    Show All Properties
                  </button>
                  
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedLocation('')
                      setPriceRange([0, 2000000])
                      setPropertyType('all')
                      setBedrooms('any')
                      setLifestylePreferences({
                        commuteTime: '30',
                        greenSpaces: false,
                        schools: false,
                        shopping: false,
                        restaurants: false,
                        transport: false,
                        nightlife: false,
                        familyFriendly: false,
                        professional: false,
                        creative: false
                      })
                      setSearchResults([])
                      setHasSearched(false)
                    }}
                    className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Search Suggestions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Popular Searches
            </h2>
            <p className="text-slate-600 text-lg">
              Get started with these popular locations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {locations.slice(0, 5).map((location) => (
              <button
                key={location}
                onClick={() => {
                  setSearchQuery(location)
                  setSelectedLocation(location)
                  handleSearch()
                  
                  // Scroll to results section after search
                  setTimeout(() => {
                    scrollToResults()
                  }, 1100) // Slightly longer delay to account for search processing
                }}
                className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors duration-200 text-slate-700 font-medium hover:text-slate-900"
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section id="results-section" className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {searchResults.length} Properties Found
                  </h2>
                  <p className="text-slate-300">
                    Discover your perfect home from our curated selection
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-slate-300">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price' | 'lifestyleScore' | 'commuteTime')}
                    className="px-4 py-2 border border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-slate-800"
                  >
                    <option value="lifestyleScore">Lifestyle Score</option>
                    <option value="price">Price</option>
                    <option value="commuteTime">Commute Time</option>
                  </select>
                </div>
              </div>

              {/* Filter Summary */}
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Active Filters</h3>
                <div className="flex flex-wrap gap-3">
                  {searchQuery && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Search: {searchQuery}
                    </span>
                  )}
                  {selectedLocation && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Location: {selectedLocation}
                    </span>
                  )}
                  {propertyType !== 'all' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Type: {propertyTypes.find(t => t.value === propertyType)?.label}
                    </span>
                  )}
                  {bedrooms !== 'any' && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      Bedrooms: {bedroomOptions.find(b => b.value === bedrooms)?.label}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium">
                    Price: £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}
                  </span>
                  {Object.values(lifestylePreferences).some(Boolean) && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                      Lifestyle Filters Active
                    </span>
                  )}
                </div>
              </div>
              
              {/* Property Map */}
              <div className="bg-slate-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Property Map</h3>
                <PropertyMap
                  properties={searchResults}
                  boroughs={boroughs}
                  center={[51.5074, -0.1278]}
                  zoom={10}
                  onPropertyClick={(property) => {
                    // Scroll to the property in the grid
                    const propertyElement = document.getElementById(`property-${property.id}`)
                    if (propertyElement) {
                      propertyElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      propertyElement.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-50')
                      setTimeout(() => {
                        propertyElement.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50')
                      }, 2000)
                    }
                  }}
                  className="w-full"
                />
              </div>
              
              {/* Property Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...searchResults].sort((a, b) => {
                  switch (sortBy) {
                    case 'price':
                      const priceA = parseInt(a.price.replace(/[£,]/g, ''))
                      const priceB = parseInt(b.price.replace(/[£,]/g, ''))
                      return priceA - priceB
                    case 'lifestyleScore':
                      return b.lifestyleScore - a.lifestyleScore
                    case 'commuteTime':
                      const commuteA = parseInt(a.commuteTime.replace(/\D/g, ''))
                      const commuteB = parseInt(b.commuteTime.replace(/\D/g, ''))
                      return commuteA - commuteB
                    default:
                      return 0
                  }
                }).map((property) => (
                  <motion.div
                    key={property.id}
                    id={`property-${property.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={getHomeImage(property.id)}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/Homes/home1.jpg'; // Fallback to first image
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-slate-900">{property.lifestyleScore}%</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-slate-900 text-xl leading-tight">{property.title}</h4>
                        <span className="text-blue-600 font-bold text-2xl">{property.price}</span>
                      </div>
                      
                      <div className="flex items-center text-slate-600 mb-4">
                        <HiLocationMarker className="w-5 h-5 mr-2 text-slate-400" />
                        <span className="text-sm font-medium">{property.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                        <span className="flex items-center gap-1">
                          <HiHome className="w-4 h-4" />
                          {property.bedrooms} beds
                        </span>
                        <span className="flex items-center gap-1">
                          <HiUser className="w-4 h-4" />
                          {property.bathrooms} baths
                        </span>
                        <span className="flex items-center gap-1">
                          <HiStar className="w-4 h-4" />
                          {property.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <HiStar key={i} className={`w-4 h-4 ${i < Math.floor(property.lifestyleScore / 20) ? 'text-yellow-400' : 'text-slate-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{property.lifestyleScore}% Match</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <HiClock className="w-4 h-4 mr-1" />
                          {property.commuteTime}
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{property.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {property.nearbyAmenities.map((amenity, index) => (
                          <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={`/property/${property.id}`}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <HiSearch className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* No Results Message */}
      {hasSearched && searchResults.length === 0 && (
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiSearch className="w-12 h-12 text-slate-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">No Properties Found</h2>
              <p className="text-slate-300 text-lg mb-8">
                We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedLocation('')
                  setPriceRange([300000, 800000])
                  setPropertyType('all')
                  setBedrooms('any')
                  setLifestylePreferences({
                    commuteTime: '30',
                    greenSpaces: false,
                    schools: false,
                    shopping: false,
                    restaurants: false,
                    transport: false,
                    nightlife: false,
                    familyFriendly: false,
                    professional: false,
                    creative: false
                  })
                  setSearchResults([])
                  setHasSearched(false)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Lifestyle Demo Section */}
      {!hasSearched && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                🌍 Real-World Lifestyle Data
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Experience the power of OpenStreetMap data via Overpass API. Discover real amenities, calculate lifestyle scores, and explore what makes each location unique.
              </p>
            </motion.div>
            <LifestyleDemo />
          </div>
        </section>
      )}

      {/* CTA Section - Only show when no search has been performed */}
      {!hasSearched && (
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Use our advanced search to discover properties that match your lifestyle and preferences perfectly.
              </p>
              <button
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200"
              >
                Start Your Search
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Custom CSS for range sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </>
  )
} 