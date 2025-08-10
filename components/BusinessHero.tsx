'use client'

import { motion } from 'framer-motion'
import { HiSparkles, HiChartBar, HiUsers, HiGlobeAlt } from 'react-icons/hi'

const BusinessHero = () => {
  const benefits = [
    {
              icon: HiSparkles,
      title: 'Better Lead Quality',
      description: 'Attract buyers who are genuinely interested in your properties based on lifestyle compatibility.',
      color: 'text-primary-600'
    },
    {
      icon: HiChartBar,
      title: 'Competitive Differentiation',
      description: 'Stand out from competitors with unique lifestyle data that traditional platforms can\'t offer.',
      color: 'text-secondary-600'
    },
    {
      icon: HiUsers,
      title: 'Easy Integration',
      description: 'Seamless API and widget integrations that work with your existing systems and workflows.',
      color: 'text-yellow-600'
    },
    {
      icon: HiGlobeAlt,
      title: 'Global Reach',
      description: 'Access to our comprehensive lifestyle data covering major cities and regions worldwide.',
      color: 'text-purple-600'
    }
  ]

  return (
    <section className="gradient-bg section-padding">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent-900 mb-6">
              Transform Your Property Business with
              <span className="text-primary-600 block">Lifestyle Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl text-accent-600 leading-relaxed">
              Integrate LifeMap's lifestyle-first property search into your platform and give your clients the competitive edge they need.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-3">{benefit.title}</h3>
              <p className="text-accent-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BusinessHero 