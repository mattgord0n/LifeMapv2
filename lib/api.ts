export interface Property {
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

export interface BoroughBoundary {
  id: string
  name: string
  coordinates: Array<[number, number]>
  center: [number, number]
  area: number
}

export interface SearchParams {
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

export interface SearchResponse {
  properties: Property[]
  totalResults: number
  page: number
  pageSize: number
  fallback?: boolean
}

class PropertyAPI {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
  }

  async searchProperties(params: SearchParams = {}): Promise<SearchResponse> {
    try {
      const searchParams = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value)
        }
      })

      const response = await fetch(`/api/properties?${searchParams.toString()}`)
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Property search error:', error)
      throw error
    }
  }

  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const response = await fetch(`/api/properties/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`API request failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Get property error:', error)
      throw error
    }
  }

  async getPopularLocations(): Promise<string[]> {
    try {
      // Return popular London locations
      return [
        'Kensington',
        'Chelsea', 
        'Mayfair',
        'Notting Hill',
        'Belgravia',
        'Knightsbridge',
        'Marylebone',
        'Fitzrovia',
        'Soho',
        'Covent Garden'
      ]
    } catch (error) {
      console.error('Get popular locations error:', error)
      // Fallback to default locations
      return [
        'Kensington',
        'Chelsea',
        'Mayfair',
        'Notting Hill',
        'Belgravia'
      ]
    }
  }

  async getBoroughBoundaries(): Promise<BoroughBoundary[]> {
    try {
      const response = await fetch('/api/boroughs')
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Get borough boundaries error:', error)
      // Return empty array if API fails
      return []
    }
  }

  async getBoroughByName(name: string): Promise<BoroughBoundary | null> {
    try {
      const boroughs = await this.getBoroughBoundaries()
      return boroughs.find(borough => 
        borough.name.toLowerCase().includes(name.toLowerCase())
      ) || null
    } catch (error) {
      console.error('Get borough by name error:', error)
      return null
    }
  }
}

export const propertyAPI = new PropertyAPI() 