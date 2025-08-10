'use client'

import { motion } from 'framer-motion'
import { HiStar, HiChatAlt2 } from 'react-icons/hi'

const SocialProof = () => {
  const partners = [
    { name: 'Rightmove', logo: '🏠', type: 'Portal Partner' },
    { name: 'Zoopla', logo: '🏘️', type: 'Portal Partner' },
    { name: 'Foxtons', logo: '🏢', type: 'Estate Agent' },
    { name: 'Savills', logo: '🏛️', type: 'Estate Agent' },
    { name: 'Barratt Homes', logo: '🏗️', type: 'Developer' },
    { name: 'Taylor Wimpey', logo: '🏘️', type: 'Developer' },
  ]

  const testimonials = [
    {
      quote: "LifeMap has transformed how we present properties to our clients. The lifestyle data gives us a unique selling point that competitors can't match.",
      author: "Sarah Johnson",
      role: "Senior Estate Agent",
      company: "Foxtons",
      rating: 5
    },
    {
      quote: "As a developer, we love how LifeMap helps buyers understand the lifestyle benefits of our developments. It's become an essential part of our sales process.",
      author: "Michael Chen",
      role: "Sales Director",
      company: "Barratt Homes",
      rating: 5
    },
    {
      quote: "The AI recommendations are incredibly accurate. Our clients find properties that truly match their lifestyle, not just their budget.",
      author: "Emma Thompson",
      role: "Property Consultant",
      company: "Savills",
      rating: 5
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Properties Analyzed' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '50+', label: 'Partner Agencies' },
    { number: '3.2x', label: 'Faster Property Matching' }
  ]

  return (
    <section className="bg-white section-padding">
      <div className="container-custom">
        {/* Partners Section */}
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
          <p className="text-xl text-accent-600 max-w-3xl mx-auto mb-12">
            We're proud to partner with leading estate agents, property portals, and developers across the UK.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-accent-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-50 transition-colors duration-200">
                  <span className="text-3xl">{partner.logo}</span>
                </div>
                <h4 className="font-semibold text-accent-900 mb-1">{partner.name}</h4>
                <p className="text-sm text-accent-500">{partner.type}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-accent-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-accent-900 text-center mb-12">
            What Our Partners Say
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="mb-6">
                  <HiChatAlt2 className="w-8 h-8 text-primary-200 mb-3" />
                  <p className="text-accent-700 leading-relaxed italic">"{testimonial.quote}"</p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="font-semibold text-accent-900">{testimonial.author}</div>
                  <div className="text-sm text-accent-600">{testimonial.role}</div>
                  <div className="text-sm text-primary-600 font-medium">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Beta User Program */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-accent-50 rounded-2xl p-8 border border-accent-200">
            <h3 className="text-2xl font-bold text-accent-900 mb-4">
              Join Our Beta Program
            </h3>
            <p className="text-accent-600 mb-6 max-w-2xl mx-auto">
              Be among the first to experience the future of property search. Get early access to new features and help shape the platform.
            </p>
            <button className="btn-primary">
              Apply for Beta Access
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialProof 