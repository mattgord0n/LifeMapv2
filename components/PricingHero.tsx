'use client'

import { motion } from 'framer-motion'
import { HiStar, HiShieldCheck, HiSparkles } from 'react-icons/hi'

const PricingHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 text-accent-700">
              <HiStar className="w-5 h-5 text-primary-500" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center space-x-2 text-accent-700">
              <HiShieldCheck className="w-5 h-5 text-primary-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2 text-accent-700">
                              <HiSparkles className="w-5 h-5 text-primary-500" />
              <span>Instant access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingHero 