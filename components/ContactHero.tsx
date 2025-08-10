'use client'

import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto mb-8">
            Have questions about LifeMap? Want to partner with us? Or just want to say hello? 
            We'd love to hear from you.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center space-x-3 text-accent-700">
              <HiMail className="w-6 h-6 text-primary-500" />
              <span className="font-medium">hello@lifemap.com</span>
            </div>
            <div className="flex items-center space-x-3 text-accent-700">
              <HiPhone className="w-6 h-6 text-primary-500" />
              <span className="font-medium">+44 (0) 20 1234 5678</span>
            </div>
            <div className="flex items-center space-x-3 text-accent-700">
              <HiLocationMarker className="w-6 h-6 text-primary-500" />
              <span className="font-medium">London, UK</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactHero 