import { NextRequest, NextResponse } from 'next/server'
import { lifestyleAPI } from '@/lib/overpass'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const lat = parseFloat(url.searchParams.get('lat') || '51.5074') // Default to London
    const lng = parseFloat(url.searchParams.get('lng') || '-0.1278')
    const radius = parseInt(url.searchParams.get('radius') || '2000') // Default 2km
    const type = url.searchParams.get('type') || 'all'

    let amenities

    switch (type) {
      case 'restaurants':
        amenities = await lifestyleAPI.getRestaurants(lat, lng, radius)
        break
      case 'schools':
        amenities = await lifestyleAPI.getSchools(lat, lng, radius)
        break
      case 'greenspaces':
        amenities = await lifestyleAPI.getGreenSpaces(lat, lng, radius)
        break
      case 'transport':
        amenities = await lifestyleAPI.getTransport(lat, lng, radius)
        break
      case 'score':
        const score = await lifestyleAPI.getLifestyleScore({ latitude: lat, longitude: lng, radius })
        return NextResponse.json({ lifestyleScore: score })
      default:
        amenities = await lifestyleAPI.searchAmenities({ latitude: lat, longitude: lng, radius })
    }

    return NextResponse.json({
      amenities,
      total: amenities.length,
      location: { lat, lng },
      radius,
      type
    })

  } catch (error) {
    console.error('Lifestyle API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lifestyle data' },
      { status: 500 }
    )
  }
} 