'use client'

import { motion } from 'framer-motion'
import { HiCheck, HiStar, HiSparkles } from 'react-icons/hi'

const PartnershipOptions = () => {
  const tiers = [
    {
      name: 'Starter',
              icon: HiSparkles,
      price: 'Free',
      description: 'Perfect for small agencies getting started with lifestyle data',
      features: [
        'Up to 1,000 API calls/month',
        'Basic lifestyle data access',
        'Standard widget integration',
        'Email support',
        'Basic analytics dashboard'
      ],
      color: 'border-accent-200',
      bgColor: 'bg-white',
      buttonColor: 'btn-outline'
    },
    {
      name: 'Professional',
      icon: HiStar,
      price: '£299',
      period: '/month',
      description: 'Ideal for growing agencies and property portals',
      features: [
        'Up to 50,000 API calls/month',
        'Full lifestyle data access',
        'Advanced widget customization',
        'Priority support',
        'Advanced analytics & reporting',
        'White-label options',
        'Custom integrations'
      ],
      color: 'border-primary-300',
      bgColor: 'bg-primary-50',
      buttonColor: 'btn-primary',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: HiStar,
      price: 'Custom',
      description: 'For large organizations with custom requirements',
      features: [
        'Unlimited API calls',
        'Custom data integrations',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom AI model training',
        'On-premise deployment options',
        'SLA guarantees',
        'Custom feature development'
      ],
      color: 'border-secondary-300',
      bgColor: 'bg-secondary-50',
      buttonColor: 'btn-secondary'
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
            Choose Your Partnership Level
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            We offer flexible partnership options to suit businesses of all sizes. Start small and scale as you grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${tier.bgColor} rounded-2xl p-8 border-2 ${tier.color} shadow-lg`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <tier.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-accent-900 mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-accent-900">{tier.price}</span>
                  {tier.period && (
                    <span className="text-accent-600 text-lg">{tier.period}</span>
                  )}
                </div>
                <p className="text-accent-600">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <HiCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-accent-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full ${tier.buttonColor}`}>
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-accent-200">
            <h3 className="text-2xl font-bold text-accent-900 text-center mb-8">
              Additional Services
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-accent-50 rounded-xl">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-2xl">💰</span>
                </div>
                <h4 className="text-xl font-semibold text-accent-900 mb-3">Lead Referral Program</h4>
                <p className="text-accent-600 mb-4">
                  Earn commission for every successful property transaction from LifeMap-generated leads.
                </p>
                <div className="text-2xl font-bold text-primary-600">Up to 15%</div>
                <div className="text-sm text-accent-500">commission per lead</div>
              </div>
              
              <div className="text-center p-6 bg-accent-50 rounded-xl">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary-600 font-bold text-2xl">⭐</span>
                </div>
                <h4 className="text-xl font-semibold text-accent-900 mb-3">Sponsored Listings</h4>
                <p className="text-accent-600 mb-4">
                  Boost your property visibility with premium placement in search results and lifestyle recommendations.
                </p>
                <div className="text-2xl font-bold text-secondary-600">From £50</div>
                <div className="text-sm text-accent-500">per listing/month</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnershipOptions 