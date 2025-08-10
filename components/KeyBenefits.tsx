'use client'

import { motion } from 'framer-motion'
import { HiSparkles, HiChartPie, HiGlobeAlt, HiCog } from 'react-icons/hi'

const KeyBenefits = () => {
  const benefits = [
    {
      icon: HiSparkles,
      title: 'Personalization',
      description: 'AI-powered recommendations that learn your preferences and lifestyle patterns to find properties that truly match your needs.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      icon: HiChartPie,
      title: 'AI Explainability',
      description: 'Understand exactly why each property is recommended with transparent scoring and detailed reasoning behind every suggestion.',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50'
    },
    {
      icon: HiGlobeAlt,
      title: 'Rich Data Layers',
      description: 'Access comprehensive data on transport, environment, amenities, and local lifestyle factors that traditional property sites miss.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: HiCog,
      title: 'B2B Integrations',
      description: 'Seamless API and widget integrations for estate agents and developers to enhance their existing platforms.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <section className="gradient-bg section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
            Why Choose LifeMap?
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            We're not just another property search engine. We're a lifestyle-first platform that puts your daily life at the center of your home search.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className={`w-16 h-16 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-accent-900 mb-4">{benefit.title}</h3>
              <p className="text-accent-600 leading-relaxed text-lg">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-accent-200">
            <h3 className="text-2xl font-bold text-accent-900 text-center mb-8">
              Advanced Features for Power Users
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-accent-50 rounded-xl">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-xl">🚇</span>
                </div>
                <h4 className="font-semibold text-accent-900 mb-2">Commute Analysis</h4>
                <p className="text-sm text-accent-600">Real-time transport data and journey planning</p>
              </div>
              
              <div className="text-center p-6 bg-accent-50 rounded-xl">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary-600 font-bold text-xl">🌳</span>
                </div>
                <h4 className="font-semibold text-accent-900 mb-2">Green Space Mapping</h4>
                <p className="text-sm text-accent-600">Parks, walking trails, and outdoor amenities</p>
              </div>
              
              <div className="text-center p-6 bg-accent-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-600 font-bold text-xl">🏃</span>
                </div>
                <h4 className="font-semibold text-accent-900 mb-2">Lifestyle Scoring</h4>
                <p className="text-sm text-accent-600">Personalized ratings for every neighborhood</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default KeyBenefits 