'use client'

import { motion } from 'framer-motion'
import { HiDatabase, HiChartBar, HiLocationMarker, HiLightBulb, HiShieldCheck, HiEye } from 'react-icons/hi'

const HowItWorks = () => {
  const steps = [
    {
      icon: HiDatabase,
      title: 'Data Fusion',
      description: 'We combine property listings with lifestyle data from multiple sources including transport, environment, and local amenities.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      icon: HiChartBar,
      title: 'Lifestyle Scoring',
      description: 'Our AI algorithm creates personalized lifestyle scores based on your preferences and daily routines.',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50'
    },
    {
      icon: HiLocationMarker,
      title: 'Commute & Hobby Filters',
      description: 'Filter properties by commute time, nearby green spaces, and proximity to your favorite activities.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: HiLightBulb,
      title: 'AI-Driven Recommendations',
      description: 'Get intelligent property suggestions that match your lifestyle, not just your budget and location.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const features = [
    {
      icon: HiShieldCheck,
      title: 'Privacy Built-In',
      description: 'Your personal data never leaves your device. We use local processing for sensitive information.',
      color: 'text-green-600'
    },
    {
      icon: HiEye,
      title: 'Explainable AI',
      description: 'Understand exactly why each property is recommended with transparent scoring and reasoning.',
      color: 'text-blue-600'
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
            How LifeMap Works
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI with comprehensive lifestyle data to revolutionize how you find your perfect home.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-3">{step.title}</h3>
              <p className="text-accent-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-accent-900">
              Built for Trust and Transparency
            </h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className={`w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-accent-900 mb-2">{feature.title}</h4>
                    <p className="text-accent-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Representation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-accent-50 to-white rounded-2xl p-8 border border-accent-200">
              {/* AI Process Visualization */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse" />
                  <div className="flex-1 h-2 bg-gradient-to-r from-primary-200 to-primary-400 rounded-full" />
                  <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse" />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-secondary-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="flex-1 h-2 bg-gradient-to-r from-secondary-200 to-secondary-400 rounded-full" />
                  <div className="w-4 h-4 bg-secondary-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="flex-1 h-2 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full" />
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
              
              {/* Data Flow Diagram */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <HiDatabase className="w-6 h-6 text-primary-600" />
                  </div>
                  <p className="text-sm text-accent-600">Data Sources</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <HiChartBar className="w-6 h-6 text-secondary-600" />
                  </div>
                  <p className="text-sm text-accent-600">AI Processing</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <HiLightBulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-sm text-accent-600">Smart Results</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks 