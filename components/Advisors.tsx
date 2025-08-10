'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const Advisors = () => {
  const partners = [
    {
      name: 'Rightmove',
      logo: '/logos/rightmove.png',
      alt: 'Rightmove Logo'
    },
    {
      name: 'Zoopla',
      logo: '/logos/zoopla.webp',
      alt: 'Zoopla Logo'
    },
    {
      name: 'Purplebricks',
      logo: '/logos/Purplebricks.png',
      alt: 'Purplebricks Logo'
    },
    {
      name: 'Foxtons',
      logo: '/logos/foxton.jpg',
      alt: 'Foxtons Logo'
    },
    {
      name: 'Savills',
      logo: '/logos/savills.png',
      alt: 'Savills Logo'
    },
    {
      name: 'Knight Frank',
      logo: '/logos/knightfrank.png',
      alt: 'Knight Frank Logo'
    }
  ]

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            We're fortunate to have the trust and partnership of leading property companies across the UK.
          </p>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <div className="w-32 h-16 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    width={120}
                    height={48}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Advisors 