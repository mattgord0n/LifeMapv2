'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HiArrowRight, HiSparkles, HiUserGroup } from 'react-icons/hi'

const CTASection = () => {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              Join thousands of homebuyers who are already using LifeMap to discover properties that match their lifestyle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* Consumer CTA */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiSparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Try LifeMap Today</h3>
              <p className="text-primary-100 mb-6">
                Experience the future of property search with our interactive demo. No registration required.
              </p>
              <Link href="/demo" className="inline-flex items-center bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                Start Demo
                <HiArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Business CTA */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiUserGroup className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Partner With Us</h3>
              <p className="text-primary-100 mb-6">
                Integrate LifeMap into your platform and offer your clients a competitive advantage.
              </p>
              <Link href="/business" className="inline-flex items-center bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                Learn More
                <HiArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-4">Why Wait?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-200 mb-2">⚡</div>
                <p className="text-primary-100">Get started in minutes</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-200 mb-2">🔒</div>
                <p className="text-primary-100">100% free to try</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-200 mb-2">🚀</div>
                <p className="text-primary-100">No commitment required</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection 