'use client'
// Force Vercel rebuild - updated import paths

import React, { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import KeyBenefits from '@/components/KeyBenefits'
import SocialProof from '@/components/SocialProof'
import CTASection from '@/components/CTASection'
import dynamicImport from 'next/dynamic'

// Dynamically import PropertyMap to prevent Leaflet SSR issues
const PropertyMap = dynamicImport(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-slate-100 rounded-lg flex items-center justify-center h-96">
      <div className="text-slate-500">Loading map...</div>
    </div>
  )
})

export const dynamic = 'force-dynamic'

export default function Home() {
  const [boroughs, setBoroughs] = useState<any[]>([])

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

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Simple Map Section - Just shows London boroughs */}
      <section className="py-20 bg-slate-900">
        <div className="container-custom">
          <div className="space-y-8">
            {/* Map Header */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explore London
              </h2>
              <p className="text-slate-300 text-lg">
                Discover different areas and boroughs across London
              </p>
            </div>

            {/* Property Map */}
            <div className="bg-slate-800 rounded-xl p-6">
              <PropertyMap
                properties={[]}
                boroughs={boroughs}
                center={[51.5074, -0.1278]}
                zoom={10}
                onPropertyClick={() => {}}
                className="w-full"
              />
              
              {/* CTA to Demo Page */}
              <div className="text-center mt-6">
                <p className="text-slate-300 mb-4">
                  Want to search for properties and see them on the map?
                </p>
                <a
                  href="/demo"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Try Our Property Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <HowItWorks />
      <KeyBenefits />
      <SocialProof />
      <CTASection />
    </div>
  )
} 