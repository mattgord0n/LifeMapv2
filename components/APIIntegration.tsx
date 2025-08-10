'use client'

import { motion } from 'framer-motion'
import { HiCode, HiCog, HiChartBar, HiShieldCheck } from 'react-icons/hi'

const APIIntegration = () => {
  const features = [
    {
      icon: HiCode,
      title: 'RESTful API',
      description: 'Modern, well-documented REST API with comprehensive endpoints for property search and lifestyle data.',
      color: 'text-primary-600'
    },
    {
      icon: HiCog,
      title: 'Widget Integration',
      description: 'Easy-to-embed widgets that can be integrated into any website with just a few lines of code.',
      color: 'text-secondary-600'
    },
    {
      icon: HiChartBar,
      title: 'Real-time Data',
      description: 'Access to live property listings and lifestyle data that updates in real-time.',
      color: 'text-yellow-600'
    },
    {
      icon: HiShieldCheck,
      title: 'Enterprise Security',
      description: 'Bank-level security with API key management, rate limiting, and comprehensive audit logs.',
      color: 'text-green-600'
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
            Powerful API & Integration Solutions
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            Whether you need a full API integration or a simple widget embed, we have the tools to transform your property platform.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-accent-900">
              Everything You Need to Get Started
            </h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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

          {/* Sample Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-accent-50 to-white rounded-2xl p-6 border border-accent-200 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-accent-900">API Dashboard</h4>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-accent-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-accent-700">API Calls Today</span>
                    <span className="text-sm text-accent-500">1,247 / 10,000</span>
                  </div>
                  <div className="w-full bg-accent-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '12.47%' }}></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-accent-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-accent-700">Response Time</span>
                    <span className="text-sm text-accent-500">45ms avg</span>
                  </div>
                  <div className="w-full bg-accent-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-accent-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-accent-700">Success Rate</span>
                    <span className="text-sm text-accent-500">99.8%</span>
                  </div>
                  <div className="w-full bg-accent-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="bg-primary-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                  View Docs
                </button>
                <button className="bg-accent-100 text-accent-700 text-sm py-2 px-4 rounded-lg hover:bg-accent-200 transition-colors">
                  Test API
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-accent-900 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Simple Integration Example</h3>
          <div className="bg-accent-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-green-400">
{`// Embed LifeMap widget in your website
<script src="https://api.lifemap.com/widget.js"></script>
<div id="lifemap-widget" 
     data-api-key="your-api-key"
     data-location="london"
     data-style="modern">
</div>

// Or use our REST API
const response = await fetch('https://api.lifemap.com/v1/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    location: 'London',
    lifestyle_preferences: {
      commute_time: 30,
      green_spaces: true,
      air_quality: 'good'
    }
  })
});

const properties = await response.json();`}
            </pre>
          </div>
          <div className="text-center mt-6">
            <button className="btn-primary">
              View Full API Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default APIIntegration 