'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    partnershipType: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - integrate with your backend/CRM
    console.log('Form submitted:', formData)
    alert('Thank you for your interest! We\'ll be in touch soon.')
  }

  const contactInfo = [
    {
      icon: HiMail,
      title: 'Email Us',
      detail: 'hello@lifemap.com',
      description: 'We typically respond within 24 hours'
    },
    {
      icon: HiPhone,
      title: 'Call Us',
      detail: '+44 (0) 20 1234 5678',
      description: 'Mon-Fri 9AM-6PM GMT'
    },
    {
      icon: HiLocationMarker,
      title: 'Visit Us',
      detail: 'London, UK',
      description: 'Schedule an in-person meeting'
    },
    {
      icon: HiClock,
      title: 'Response Time',
      detail: '< 24 hours',
      description: 'For business inquiries'
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            Let's discuss how LifeMap can transform your property business. Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-accent-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-accent-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-accent-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-accent-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="+44 20 1234 5678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-accent-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Your Company Ltd"
                />
              </div>

              <div>
                <label htmlFor="partnershipType" className="block text-sm font-medium text-accent-700 mb-2">
                  Partnership Type *
                </label>
                <select
                  id="partnershipType"
                  name="partnershipType"
                  required
                  value={formData.partnershipType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select partnership type</option>
                  <option value="estate-agent">Estate Agent</option>
                  <option value="property-portal">Property Portal</option>
                  <option value="developer">Property Developer</option>
                  <option value="technology-partner">Technology Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-accent-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your business and how you'd like to partner with LifeMap..."
                />
              </div>

              <button type="submit" className="w-full btn-primary text-lg py-4">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-accent-900 mb-6">
                Get in Touch
              </h3>
              <p className="text-accent-600 leading-relaxed mb-8">
                Our business development team is ready to help you understand how LifeMap can enhance your property platform and attract more qualified buyers.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-900 mb-1">{info.title}</h4>
                    <p className="text-accent-700 font-medium">{info.detail}</p>
                    <p className="text-sm text-accent-500">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-accent-50 rounded-xl p-6 border border-accent-200">
              <h4 className="font-semibold text-accent-900 mb-3">What Happens Next?</h4>
              <ol className="space-y-2 text-sm text-accent-600">
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>We'll review your requirements and business model</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>Schedule a personalized demo of our platform</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>Discuss integration options and partnership terms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <span>Get started with your LifeMap integration</span>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm 