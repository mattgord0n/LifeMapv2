'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Property } from '../../../lib/api'
import PropertyDetails from '../../../components/PropertyDetails'
import { HiHome } from 'react-icons/hi'
import Link from 'next/link'

export default function PropertyPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id as string)
    }
  }, [params.id])

  const fetchProperty = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/properties/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Property not found')
        } else {
          throw new Error('Failed to fetch property')
        }
        return
      }
      
      const data = await response.json()
      setProperty(data.property)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load property')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiHome className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error || 'The property you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <div className="space-y-3">
            <Link
              href="/demo"
              className="block w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to Property Search
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <PropertyDetails property={property} />
} 