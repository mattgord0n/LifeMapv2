import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

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
  imageUrl?: string
  detailsUrl?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

interface SearchParams {
  location?: string
  postcode?: string
  borough?: string
  minPrice?: string
  maxPrice?: string
  propertyType?: string
  minBedrooms?: string
  maxBedrooms?: string
  page?: string
  pageSize?: string
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const location = url.searchParams.get('location')
    const postcode = url.searchParams.get('postcode')
    const borough = url.searchParams.get('borough')
    const minPrice = url.searchParams.get('minPrice')
    const maxPrice = url.searchParams.get('maxPrice')
    const propertyType = url.searchParams.get('propertyType')
    const minBedrooms = url.searchParams.get('minBedrooms')
    const maxBedrooms = url.searchParams.get('maxBedrooms')
    const page = url.searchParams.get('page') || '1'
    const pageSize = url.searchParams.get('pageSize') || '20'

    // Get all properties and apply filters
    let allProperties = generateMockProperties()
    
    // Apply search filters
    let filteredProperties = allProperties.filter(property => {
      // Location filter
      if (location && !property.location.toLowerCase().includes(location.toLowerCase())) {
        return false
      }
      if (postcode && !property.location.toLowerCase().includes(postcode.toLowerCase())) {
        return false
      }
      if (borough && !property.location.toLowerCase().includes(borough.toLowerCase())) {
        return false
      }
      
      // Price filter
      if (minPrice) {
        const propertyPrice = parseInt(property.price.replace(/[£,]/g, ''))
        const minPriceNum = parseInt(minPrice)
        if (propertyPrice < minPriceNum) return false
      }
      if (maxPrice) {
        const propertyPrice = parseInt(property.price.replace(/[£,]/g, ''))
        const maxPriceNum = parseInt(maxPrice)
        if (propertyPrice > maxPriceNum) return false
      }
      
      // Property type filter
      if (propertyType && propertyType !== 'all' && property.type.toLowerCase() !== propertyType.toLowerCase()) {
        return false
      }
      
      // Bedroom filter
      if (minBedrooms) {
        const minBeds = parseInt(minBedrooms)
        if (property.bedrooms < minBeds) return false
      }
      if (maxBedrooms && maxBedrooms !== '5+') {
        const maxBeds = parseInt(maxBedrooms)
        if (property.bedrooms > maxBeds) return false
      }
      
      return true
    })

    // Apply pagination
    const pageNum = parseInt(page)
    const pageSizeNum = parseInt(pageSize)
    const startIndex = (pageNum - 1) * pageSizeNum
    const endIndex = startIndex + pageSizeNum
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex)

    return NextResponse.json({
      properties: paginatedProperties,
      totalResults: filteredProperties.length,
      page: pageNum,
      pageSize: pageSizeNum
    })

  } catch (error) {
    console.error('Property search error:', error)
    
    // Fallback to mock data if anything fails
    const mockProperties = generateMockProperties()
    
    return NextResponse.json({
      properties: mockProperties,
      totalResults: mockProperties.length,
      page: 1,
      pageSize: 20,
      fallback: true
    })
  }
}

function generateMockProperties(): Property[] {
  return [
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
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
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
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
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
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
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
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
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
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
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
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
      coordinates: { lat: 51.5175, lng: -0.1187 }
    },
    {
      id: 7,
      title: 'Marylebone Victorian House',
      price: '£3,800,000',
      location: 'Marylebone, London',
      bedrooms: 5,
      bathrooms: 3,
      type: 'House',
      lifestyleScore: 91,
      commuteTime: '28 min',
      nearbyAmenities: ['Boutique Shops', 'Fine Dining', 'Cultural Venues'],
      description: 'Beautiful Victorian house in Marylebone with period features and modern amenities.',
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
      coordinates: { lat: 51.5225, lng: -0.1537 }
    },
    {
      id: 8,
      title: 'Fitzrovia Modern Flat',
      price: '£1,200,000',
      location: 'Fitzrovia, London',
      bedrooms: 2,
      bathrooms: 2,
      type: 'Flat',
      lifestyleScore: 87,
      commuteTime: '18 min',
      nearbyAmenities: ['Creative Studios', 'Tech Companies', 'Trendy Cafes'],
      description: 'Contemporary flat in Fitzrovia perfect for young professionals in the creative and tech industries.',
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
      coordinates: { lat: 51.5175, lng: -0.1337 }
    },
    {
      id: 9,
      title: 'Soho Loft Apartment',
      price: '£2,100,000',
      location: 'Soho, London',
      bedrooms: 2,
      bathrooms: 2,
      type: 'Apartment',
      lifestyleScore: 93,
      commuteTime: '12 min',
      nearbyAmenities: ['Nightlife', 'Entertainment', 'Restaurants'],
      description: 'Stylish loft apartment in the heart of Soho with vibrant nightlife and entertainment options.',
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
      coordinates: { lat: 51.5125, lng: -0.1337 }
    },
    {
      id: 10,
      title: 'Covent Garden Penthouse',
      price: '£3,500,000',
      location: 'Covent Garden, London',
      bedrooms: 3,
      bathrooms: 3,
      type: 'Penthouse',
      lifestyleScore: 90,
      commuteTime: '16 min',
      nearbyAmenities: ['Theatre District', 'Shopping', 'Cultural Venues'],
      description: 'Luxurious penthouse in Covent Garden with access to London\'s premier theatre and shopping district.',
      imageUrl: '/api/placeholder/400/300',
      detailsUrl: '#',
      coordinates: { lat: 51.5125, lng: -0.1237 }
    }
  ]
} 