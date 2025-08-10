'use client'

import { motion } from 'framer-motion'
import { HiCheck, HiStar, HiSparkles, HiCog } from 'react-icons/hi'

const BusinessPricing = () => {
  const businessPlans = [
    {
      name: 'Starter',
      icon: HiStar,
      price: '£299',
      period: 'per month',
      description: 'Perfect for small estate agencies',
      features: [
        'Up to 1,000 API calls/month',
        'Basic lifestyle scoring',
        'Standard data layers',
        'Email support',
        'Basic analytics dashboard',
        'Widget integration',
        'REST API access'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
              icon: HiSparkles,
      price: '£799',
      period: 'per month',
      description: 'Ideal for growing agencies',
      features: [
        'Up to 10,000 API calls/month',
        'Advanced AI recommendations',
        'All data layers & filters',
        'Priority support',
        'Advanced analytics',
        'Custom widget branding',
        'Webhook integrations',
        'Lead scoring insights',
        'Dedicated account manager'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: HiCog,
      price: 'Custom',
      period: 'contact us',
      description: 'For large agencies & portals',
      features: [
        'Unlimited API calls',
        'Custom AI models',
        'White-label solutions',
        '24/7 phone support',
        'Custom integrations',
        'Advanced reporting',
        'SLA guarantees',
        'On-premise options',
        'Custom training'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const addOns = [
    {
      name: 'Lead Referral',
      price: '£15',
      period: 'per qualified lead',
      description: 'Get high-quality leads from our consumer platform',
      features: ['Pre-screened buyers', 'Lifestyle preferences', 'Budget verification', 'Contact details']
    },
    {
      name: 'Sponsored Listings',
      price: '£50',
      period: 'per listing per month',
      description: 'Boost visibility of premium properties',
      features: ['Featured placement', 'Enhanced photos', 'Virtual tours', 'Priority in search results']
    }
  ]

  return (
    <section className="bg-accent-50 section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-6">
            Business & API Plans
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            Scale your property business with our powerful API and integration solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {businessPlans.map((plan, index) => (
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
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-accent-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-accent-900">{plan.price}</span>
                  <span className="text-accent-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-accent-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-accent-700">{feature}</span>
                  </div>
                ))}
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

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-accent-900 mb-6">
            Additional Services
          </h3>
          <p className="text-accent-600 max-w-2xl mx-auto">
            Enhance your LifeMap integration with these powerful add-ons.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {addOns.map((addon, index) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 border border-accent-200"
            >
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-accent-900 mb-2">{addon.name}</h4>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-primary-600">{addon.price}</span>
                  <span className="text-accent-600 ml-2">{addon.period}</span>
                </div>
                <p className="text-accent-600 text-sm">{addon.description}</p>
              </div>

              <div className="space-y-3">
                {addon.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <HiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-accent-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 btn-outline py-2">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BusinessPricing 