'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiSearch, HiLocationMarker, HiHome, HiStar, HiClock, HiFilter, HiMap, HiAcademicCap, HiShoppingBag, HiLocationMarker as HiLocation, HiHeart, HiUser, HiShieldCheck } from 'react-icons/hi'
import { propertyAPI, Property, SearchParams, BoroughBoundary } from '../lib/api'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamically import PropertyMap to prevent SSR issues with Leaflet
const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-slate-100 rounded-lg flex items-center justify-center h-96">
      <div className="text-slate-500">Loading map...</div>
    </div>
  )
})

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

const PropertySearch = () => {
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
  const [searchResults, setSearchResults] = useState<Property[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [sortBy, setSortBy] = useState<'price' | 'lifestyleScore' | 'commuteTime'>('lifestyleScore')
  const [locations, setLocations] = useState<string[]>([])
  const [boroughs, setBoroughs] = useState<BoroughBoundary[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFallback, setIsFallback] = useState(false)

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

  // Load popular locations and boroughs on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load popular locations
        const popularLocations = await propertyAPI.getPopularLocations()
        setLocations(popularLocations)
        
        // Load borough boundaries
        const boroughData = await propertyAPI.getBoroughBoundaries()
        setBoroughs(Array.isArray(boroughData) ? boroughData : [])
      } catch (error) {
        console.error('Failed to load data:', error)
        // Fallback to default locations
        setLocations([
          'Kensington', 'Chelsea', 'Mayfair', 'Notting Hill', 'Belgravia',
          'Knightsbridge', 'Marylebone', 'Fitzrovia', 'Soho', 'Covent Garden'
        ])
      }
    }
    
    loadData()
  }, [])

  const handleSearch = async () => {
    if (searchQuery.trim().length < 2 && searchQuery.trim() !== '') {
      alert('Please enter at least 2 characters for your search')
      return
    }

    setIsSearching(true)
    setHasSearched(true)
    setCurrentPage(1)

    try {
      const searchParams: SearchParams = {
        location: searchQuery || selectedLocation,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
        propertyType: propertyType !== 'all' ? propertyType : undefined,
        minBedrooms: bedrooms !== 'any' ? bedrooms : undefined,
        maxBedrooms: bedrooms === '5+' ? '10' : bedrooms !== 'any' ? bedrooms : undefined,
        page: '1',
        pageSize: '20'
      }

      const response = await propertyAPI.searchProperties(searchParams)
      
      setSearchResults(response.properties)
      setTotalResults(response.totalResults)
      setIsFallback(response.fallback || false)
      
      // Scroll to results section
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section')
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
      setTotalResults(0)
      setIsFallback(true)
    } finally {
      setIsSearching(false)
    }
  }

  const toggleLifestylePreference = (key: keyof LifestylePreferences) => {
    setLifestylePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const updatePriceRange = (index: number, value: number) => {
    const newRange = [...priceRange]
    newRange[index] = value

    // Ensure min doesn't exceed max
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value
    }

    setPriceRange(newRange)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container-custom relative z-10">
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
                  className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors duration-200 mt-4"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Search Suggestions */}
      <section className="py-16 bg-white">
        <div className="container-custom">
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
                }}
                className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors duration-200 text-slate-700 font-medium hover:text-slate-900"
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Property Map Section - Always Visible */}
      <section className="py-20 bg-slate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Map Header */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explore London Properties
              </h2>
              <p className="text-slate-300 text-lg">
                {hasSearched && searchResults.length > 0 
                  ? `Found ${searchResults.length} properties matching your criteria`
                  : 'Use the search above to find your perfect home or explore the map to discover different areas'
                }
              </p>
            </div>
            
            {/* Property Map */}
            <div className="bg-slate-800 rounded-xl p-6">
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
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-20 bg-slate-900">
          <div className="container-custom">
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
                    id={`property-${property.id}`}
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="h-56 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20"></div>
                      <HiHome className="w-20 h-20 text-blue-600 relative z-10" />
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
                          <HiHome className="w-4 h-4" />
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
                        {property.nearbyAmenities.map((amenity: string, index: number) => (
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
          <div className="container-custom">
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

      {/* CTA Section - Only show when no search has been performed */}
      {!hasSearched && (
        <section className="py-20 bg-slate-900">
          <div className="container-custom">
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

export default PropertySearch 