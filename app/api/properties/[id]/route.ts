import { NextRequest, NextResponse } from 'next/server'
import { Property } from '../../../lib/api'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  
  try {
    // Fetch property details from Zoopla API
    const response = await fetch(
      `${process.env.ZOOPLA_BASE_URL}/property_details.json?api_key=${process.env.ZOOPLA_API_KEY}&listing_id=${id}`
    )
    
    if (!response.ok) {
      throw new Error(`Zoopla API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Transform Zoopla data to match our Property interface
    const transformedProperty: Property = {
      id: parseInt(id),
      title: data.listing?.details?.display_address || data.listing?.details?.property_type || 'Property',
      price: data.listing?.price || 'Price on request',
      location: data.listing?.details?.display_address || 'Location TBC',
      bedrooms: data.listing?.details?.num_bedrooms || 0,
      bathrooms: data.listing?.details?.num_bathrooms || 0,
      type: data.listing?.details?.property_type || 'Property',
      lifestyleScore: calculateLifestyleScore(data.listing),
      commuteTime: calculateCommuteTime(data.listing),
      nearbyAmenities: extractNearbyAmenities(data.listing),
      description: data.listing?.details?.description || 'No description available',
      imageUrl: data.listing?.details?.image_url || `/api/placeholder/800/600`,
      detailsUrl: data.listing?.details_url || `#`,
      coordinates: data.listing?.details?.latitude && data.listing?.details?.longitude ? {
        lat: parseFloat(data.listing.details.latitude),
        lng: parseFloat(data.listing.details.longitude)
      } : undefined
    }
    
    return NextResponse.json({
      property: transformedProperty,
      success: true
    })
    
  } catch (error) {
    console.error('Property details error:', error)
    
    // Fallback to mock data
    const mockProperty = generateMockProperty(parseInt(id))
    
    return NextResponse.json({
      property: mockProperty,
      success: true,
      fallback: true
    })
  }
}

function calculateLifestyleScore(listing: any): number {
  if (!listing) return 75
  
  let score = 75 // Base score
  
  // Add points for property features
  if (listing.details?.num_bedrooms >= 3) score += 5
  if (listing.details?.num_bathrooms >= 2) score += 5
  if (listing.details?.garden) score += 5
  if (listing.details?.parking) score += 5
  
  // Add points for location (premium areas)
  const premiumAreas = ['kensington', 'chelsea', 'mayfair', 'belgravia', 'knightsbridge']
  const location = listing.details?.display_address?.toLowerCase() || ''
  if (premiumAreas.some(area => location.includes(area))) {
    score += 10
  }
  
  return Math.min(score, 100)
}

function calculateCommuteTime(listing: any): string {
  if (!listing) return '25 min'
  
  // Mock commute times based on location
  const location = listing.details?.display_address?.toLowerCase() || ''
  
  if (location.includes('mayfair') || location.includes('soho')) return '15 min'
  if (location.includes('kensington') || location.includes('chelsea')) return '20 min'
  if (location.includes('notting hill') || location.includes('hampstead')) return '30 min'
  if (location.includes('canary wharf')) return '35 min'
  
  return '25 min'
}

function extractNearbyAmenities(listing: any): string[] {
  if (!listing) return ['Transport Links', 'Local Amenities']
  
  const amenities = ['Transport Links']
  
  // Add amenities based on property type and location
  if (listing.details?.property_type === 'House' || listing.details?.property_type === 'Townhouse') {
    amenities.push('Family Parks', 'Good Schools')
  }
  
  if (listing.details?.property_type === 'Apartment' || listing.details?.property_type === 'Penthouse') {
    amenities.push('Shopping District', 'Restaurants')
  }
  
  // Add location-specific amenities
  const location = listing.details?.display_address?.toLowerCase() || ''
  if (location.includes('mayfair') || location.includes('knightsbridge')) {
    amenities.push('Luxury Retail', 'Fine Dining')
  }
  if (location.includes('chelsea') || location.includes('kensington')) {
    amenities.push('Boutique Shops', 'Cultural Venues')
  }
  
  return amenities
}

function generateMockProperty(id: number): Property {
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
      nearbyAmenities: ['Temple Station', 'Royal Courts of Justice', 'Fleet Street', 'Embankment Gardens', 'Transport'],
      description: 'Stunning luxury apartment in the prestigious Temple area, minutes from the Royal Courts of Justice and excellent transport links. This exceptional property offers the perfect blend of period charm and contemporary luxury, featuring high-end appliances, smart home technology, and beautiful city views.',
      imageUrl: 'https://source.unsplash.com/800x600/?luxury,apartment,temple',
      detailsUrl: '/property/1',
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
      nearbyAmenities: ['London Bridge Station', 'Borough Market', 'Tate Modern', 'Shard', 'Transport'],
      description: 'Contemporary loft conversion in vibrant Southwark, perfectly positioned near Borough Market and the cultural quarter. This stunning property features an open-plan living area, designer kitchen, and access to exclusive residents\' facilities including a gym and concierge service.',
      imageUrl: 'https://source.unsplash.com/800x600/?luxury,loft,southwark',
      detailsUrl: '/property/2',
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
      nearbyAmenities: ['Farringdon Station', 'Clerkenwell Green', 'Exmouth Market', 'Barbican Centre', 'Transport'],
      description: 'Exclusive townhouse in the heart of Farringdon, offering the ultimate city lifestyle with access to the best of London. This exceptional property features the finest materials, state-of-the-art technology, and access to world-class amenities and services.',
      imageUrl: 'https://source.unsplash.com/800x600/?luxury,townhouse,farringdon',
      detailsUrl: '/property/3',
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
      nearbyAmenities: ['Westminster Station', 'Houses of Parliament', 'Tate Britain', 'Thames Path', 'Transport'],
      description: 'Magnificent mansion on prestigious Millbank, overlooking the Thames with views of the Houses of Parliament. This exceptional property offers the ultimate in luxury living with staff quarters, wine cellar, private cinema, and extensive gardens.',
      imageUrl: 'https://source.unsplash.com/600x800/?luxury,mansion,westminster',
      detailsUrl: '/property/4',
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
      nearbyAmenities: ['Baker Street Station', 'Regent\'s Park', 'Marylebone High Street', 'Madame Tussauds', 'Transport'],
      description: 'Beautiful Victorian house in Marylebone with period features, garden access and excellent family amenities. This beautiful property offers multiple living areas, a large kitchen-diner, and a generous garden perfect for children and entertaining.',
      imageUrl: 'https://source.unsplash.com/800x600/?victorian,house,marylebone',
      detailsUrl: '/property/5',
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
      nearbyAmenities: ['Holborn Station', 'British Museum', 'Lincoln\'s Inn Fields', 'Covent Garden', 'Transport'],
      description: 'Elegant modern apartment in Holborn with access to world-class cultural institutions and excellent transport links. This stunning property features high ceilings, large windows, and access to exclusive residents\' facilities including a gym and spa.',
      imageUrl: 'https://source.unsplash.com/800x600/?luxury,apartment,holborn',
      detailsUrl: '/property/6',
      coordinates: { lat: 51.5175, lng: -0.1187 }
    }
  ]
  
  return properties.find(p => p.id === id) || properties[0]
} 