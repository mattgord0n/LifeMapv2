'use client'

import { motion } from 'framer-motion'
import { HiCheck, HiX } from 'react-icons/hi'

const ConsumerPricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '£0',
      period: 'forever',
      description: 'Perfect for getting started with property search',
      features: [
        '5 property searches per month',
        'Basic lifestyle scoring',
        'Standard commute times',
        'Email alerts for new listings',
        'Basic filters (price, location)'
      ],
      notIncluded: [
        'Advanced AI recommendations',
        'Premium data layers',
        'Priority customer support',
        'Export search results',
        'Saved searches'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Premium',
      price: '£9.99',
      period: 'per month',
      description: 'Best for serious property hunters',
      features: [
        'Unlimited property searches',
        'Advanced AI recommendations',
        'Premium lifestyle scoring',
        'All data layers & filters',
        'Priority customer support',
        'Export & save searches',
        'Market insights & trends',
        'Early access to new features'
      ],
      notIncluded: [],
      cta: 'Start Premium Trial',
      popular: true
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
            Consumer Plans
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            Start exploring properties with our free tier, or unlock the full potential with Premium.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular ? 'border-primary-500 ring-4 ring-primary-100' : 'border-accent-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-accent-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-accent-900">{plan.price}</span>
                  <span className="text-accent-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-accent-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-accent-900">What's included:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-accent-700">{feature}</span>
                  </div>
                ))}
                
                {plan.notIncluded.length > 0 && (
                  <>
                    <h4 className="font-semibold text-accent-900 mt-6">Not included:</h4>
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <HiX className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-accent-500 line-through">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                plan.popular 
                  ? 'btn-primary' 
                  : 'btn-outline hover:bg-accent-50'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConsumerPricing 