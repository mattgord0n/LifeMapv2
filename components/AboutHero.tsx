'use client'

import { motion } from 'framer-motion'
import { HiLightBulb, HiHeart, HiGlobe } from 'react-icons/hi'

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-6">
            About LifeMap
          </h1>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto mb-8">
            We're on a mission to revolutionize property search by putting lifestyle first. 
            Because finding the perfect home isn't just about bricks and mortar – it's about finding your place in the world.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center space-x-3 text-accent-700">
              <HiLightBulb className="w-6 h-6 text-primary-500" />
              <span className="font-medium">Innovation</span>
            </div>
            <div className="flex items-center space-x-3 text-accent-700">
              <HiHeart className="w-6 h-6 text-primary-500" />
              <span className="font-medium">People-First</span>
            </div>
            <div className="flex items-center space-x-3 text-accent-700">
              <HiGlobe className="w-6 h-6 text-primary-500" />
              <span className="font-medium">Global Vision</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutHero 