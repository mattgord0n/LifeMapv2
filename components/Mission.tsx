'use client'

import { motion } from 'framer-motion'
import { HiMap, HiEye, HiTrendingUp } from 'react-icons/hi'

const Mission = () => {
  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-accent-600 mb-6 leading-relaxed">
              We believe that finding the perfect home should be about more than just square footage and price. 
              It should be about finding a place where you can truly thrive – where your lifestyle, interests, 
              and future aspirations align with your surroundings.
            </p>
            <p className="text-lg text-accent-600 mb-8 leading-relaxed">
              LifeMap combines cutting-edge AI with rich lifestyle data to help people discover properties 
              that match not just their budget, but their dreams and daily life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <HiMap className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-accent-900 mb-2">Our Vision</h3>
                <p className="text-accent-600">
                  To become the world's leading lifestyle-first property platform, making home-finding 
                  intuitive, enjoyable, and truly personalized.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <HiEye className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-accent-900 mb-2">What We See</h3>
                <p className="text-accent-600">
                  A future where property search is as much about lifestyle compatibility as it is about 
                  location and price – where AI understands your needs better than you do.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <HiTrendingUp className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-accent-900 mb-2">Our Growth</h3>
                <p className="text-accent-600">
                  From a London startup to a global platform, we're expanding our reach and capabilities 
                  to serve property seekers worldwide.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Mission 