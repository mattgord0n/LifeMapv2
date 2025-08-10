// Mock Overpass API service for demonstration
// In production, this would integrate with the real Overpass API

export interface LifestyleAmenity {
  id: string
  name: string
  type: string
  coordinates: [number, number]
  tags: Record<string, string>
  distance?: number
}

export interface LifestyleSearchParams {
  latitude: number
  longitude: number
  radius: number // in meters
  amenityTypes?: string[]
}

export class LifestyleAPI {
  /**
   * Search for lifestyle amenities near a specific location
   */
  async searchAmenities(params: LifestyleSearchParams): Promise<LifestyleAmenity[]> {
    const { latitude, longitude, radius, amenityTypes = [] } = params
    
    // Default amenity types if none specified
    const types = amenityTypes.length > 0 ? amenityTypes : [
      'restaurant', 'cafe', 'bar', 'pub',
      'school', 'university', 'library',
      'park', 'garden', 'playground',
      'hospital', 'clinic', 'pharmacy',
      'shop', 'supermarket', 'market',
      'theatre', 'museum', 'cinema',
      'gym', 'sports_centre', 'swimming_pool',
      'bus_station', 'train_station', 'subway_station'
    ]

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Generate mock amenities based on location
    const amenities: LifestyleAmenity[] = []
    const baseAmenities = this.getBaseAmenities(latitude, longitude)
    
    baseAmenities.forEach((amenity, index) => {
      if (types.includes('all') || types.includes(amenity.type)) {
        const distance = this.calculateDistance(latitude, longitude, amenity.coordinates[0], amenity.coordinates[1])
        
        // Only include amenities within the specified radius
        if (distance <= radius) {
          amenities.push({
            ...amenity,
            id: `${amenity.type}-${index}`,
            distance
          })
        }
      }
    })

    // Sort by distance
    return amenities.sort((a, b) => (a.distance || 0) - (b.distance || 0))
  }

  /**
   * Get lifestyle score for a location based on nearby amenities
   */
  async getLifestyleScore(params: LifestyleSearchParams): Promise<number> {
    const amenities = await this.searchAmenities(params)
    
    // Calculate score based on amenity diversity and proximity
    let score = 0
    const amenityTypes = new Set()
    
    amenities.forEach(amenity => {
      // Base points for each amenity type
      if (!amenityTypes.has(amenity.type)) {
        amenityTypes.add(amenity.type)
        score += 10
      }
      
      // Bonus points for proximity (closer = more points)
      if (amenity.distance) {
        if (amenity.distance < 500) score += 5      // Within 500m
        else if (amenity.distance < 1000) score += 3 // Within 1km
        else if (amenity.distance < 2000) score += 1 // Within 2km
      }
    })
    
    // Cap score at 100
    return Math.min(score, 100)
  }

  /**
   * Get specific types of amenities
   */
  async getRestaurants(lat: number, lng: number, radius: number = 2000): Promise<LifestyleAmenity[]> {
    return this.searchAmenities({
      latitude: lat,
      longitude: lng,
      radius,
      amenityTypes: ['restaurant', 'cafe', 'bar', 'pub']
    })
  }

  async getSchools(lat: number, lng: number, radius: number = 2000): Promise<LifestyleAmenity[]> {
    return this.searchAmenities({
      latitude: lat,
      longitude: lng,
      radius,
      amenityTypes: ['school', 'university', 'library']
    })
  }

  async getGreenSpaces(lat: number, lng: number, radius: number = 2000): Promise<LifestyleAmenity[]> {
    return this.searchAmenities({
      latitude: lat,
      longitude: lng,
      radius,
      amenityTypes: ['park', 'garden', 'playground']
    })
  }

  async getTransport(lat: number, lng: number, radius: number = 2000): Promise<LifestyleAmenity[]> {
    return this.searchAmenities({
      latitude: lat,
      longitude: lng,
      radius,
      amenityTypes: ['bus_station', 'train_station', 'subway_station']
    })
  }

  /**
   * Generate base amenities for a location
   */
  private getBaseAmenities(lat: number, lng: number): Omit<LifestyleAmenity, 'id' | 'distance'>[] {
    // London-specific amenities
    const amenities: Omit<LifestyleAmenity, 'id' | 'distance'>[] = [
      // Restaurants & Cafes
      { name: 'The Ivy', type: 'restaurant', coordinates: [lat + 0.001, lng + 0.001] as [number, number], tags: { cuisine: 'British', category: 'restaurant' } },
      { name: 'Starbucks', type: 'cafe', coordinates: [lat - 0.001, lng + 0.002] as [number, number], tags: { brand: 'Starbucks', category: 'cafe' } },
      { name: 'The Red Lion', type: 'pub', coordinates: [lat + 0.002, lng - 0.001] as [number, number], tags: { food: 'yes', category: 'pub' } },
      
      // Schools & Libraries
      { name: 'Westminster School', type: 'school', coordinates: [lat + 0.003, lng + 0.003] as [number, number], tags: { level: 'secondary', category: 'school' } },
      { name: 'British Library', type: 'library', coordinates: [lat - 0.002, lng + 0.004] as [number, number], tags: { access: 'public', category: 'library' } },
      
      // Parks & Gardens
      { name: 'Hyde Park', type: 'park', coordinates: [lat + 0.005, lng + 0.001] as [number, number], tags: { leisure: 'park', category: 'park' } },
      { name: 'Kensington Gardens', type: 'garden', coordinates: [lat + 0.004, lng - 0.002] as [number, number], tags: { historic: 'yes', category: 'garden' } },
      
      // Transport
      { name: 'Westminster Tube Station', type: 'subway_station', coordinates: [lat + 0.001, lng - 0.003] as [number, number], tags: { network: 'London Underground', category: 'transport' } },
      { name: 'Victoria Bus Station', type: 'bus_station', coordinates: [lat - 0.003, lng + 0.005] as [number, number], tags: { operator: 'TfL', category: 'transport' } },
      
      // Shopping
      { name: 'Harrods', type: 'shop', coordinates: [lat + 0.006, lng + 0.004] as [number, number], tags: { shop: 'department_store', category: 'shopping' } },
      { name: 'Tesco Express', type: 'supermarket', coordinates: [lat - 0.001, lng - 0.004] as [number, number], tags: { brand: 'Tesco', category: 'shopping' } },
      
      // Culture
      { name: 'Royal Opera House', type: 'theatre', coordinates: [lat + 0.007, lng + 0.006] as [number, number], tags: { art: 'opera', category: 'culture' } },
      { name: 'National Gallery', type: 'museum', coordinates: [lat + 0.008, lng + 0.007] as [number, number], tags: { art: 'fine_art', category: 'culture' } },
      
      // Health
      { name: 'St Thomas Hospital', type: 'hospital', coordinates: [lat - 0.004, lng + 0.008] as [number, number], tags: { emergency: 'yes', category: 'health' } },
      { name: 'Boots Pharmacy', type: 'pharmacy', coordinates: [lat + 0.002, lng - 0.005] as [number, number], tags: { brand: 'Boots', category: 'health' } },
      
      // Fitness
      { name: 'PureGym', type: 'gym', coordinates: [lat + 0.003, lng - 0.006] as [number, number], tags: { brand: 'PureGym', category: 'fitness' } },
      { name: 'Virgin Active', type: 'sports_centre', coordinates: [lat - 0.005, lng - 0.003] as [number, number], tags: { brand: 'Virgin Active', category: 'fitness' } }
    ]

    return amenities
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }
}

// Export singleton instance
export const lifestyleAPI = new LifestyleAPI() 