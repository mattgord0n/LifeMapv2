'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HiMap, HiHeart, HiLightningBolt, HiShieldCheck } from 'react-icons/hi'

const Hero = () => {
  const features = [
    {
      icon: HiMap,
      text: 'Interactive lifestyle heatmaps',
      color: 'text-primary-600'
    },
    {
      icon: HiHeart,
      text: 'Personalized recommendations',
      color: 'text-secondary-600'
    },
    {
      icon: HiLightningBolt,
      text: 'AI-driven insights',
      color: 'text-yellow-600'
    },
    {
      icon: HiShieldCheck,
      text: 'Privacy-first approach',
      color: 'text-green-600'
    }
  ]

  return (
    <section className="gradient-bg section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent-900 leading-tight">
                Find Your Perfect Home,
                <span className="text-primary-600 block">Tailored to Your Lifestyle</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-accent-600 leading-relaxed">
                Personalized property search based on your commute, hobbies, green spaces, and air quality.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md"
                >
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  <span className="text-accent-700 font-medium text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/demo" className="btn-primary text-lg px-8 py-4">
                  Try Demo
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link href="/business" className="btn-secondary text-lg px-8 py-4">
                  For Agents & Developers
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-accent-200">
              {/* Mock Interactive Map */}
              <div className="w-full h-80 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 rounded-xl relative overflow-hidden">
                {/* Map Grid */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-4">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm transition-all duration-300 hover:scale-110 ${
                        i % 8 === 0 || i % 8 === 7 || i < 8 || i >= 56
                          ? 'bg-accent-200'
                          : i % 3 === 0
                          ? 'bg-primary-200'
                          : i % 5 === 0
                          ? 'bg-secondary-200'
                          : 'bg-white'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Lifestyle Markers */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-500 rounded-full animate-pulse-slow" />
                <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-secondary-500 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-yellow-500 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
                
                {/* Search Area */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-primary-500 border-dashed rounded-full animate-ping" />
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <HiMap className="w-4 h-4 text-accent-600" />
                </div>
                <div className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <HiHeart className="w-4 h-4 text-secondary-600" />
                </div>
              </div>
              
              {/* Map Legend */}
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary-200 rounded-full" />
                  <span className="text-accent-600">Commute</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary-200 rounded-full" />
                  <span className="text-accent-600">Green Space</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-200 rounded-full" />
                  <span className="text-accent-600">Air Quality</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 