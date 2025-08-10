'use client'

import { motion } from 'framer-motion'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { useState } from 'react'

const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges accordingly."
    },
    {
      question: "Is there a setup fee for business plans?",
      answer: "No setup fees for Starter and Professional plans. Enterprise plans may have custom setup requirements depending on your specific needs."
    },
    {
      question: "What happens if I exceed my API call limit?",
      answer: "We'll notify you when you're approaching your limit. You can either upgrade your plan or purchase additional API calls as needed."
    },
    {
      question: "Do you offer discounts for annual payments?",
      answer: "Yes! Annual plans come with a 20% discount compared to monthly billing. Contact our sales team for custom enterprise pricing."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no penalties. Your access will continue until the end of your current billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual enterprise plans. All payments are processed securely."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            Got questions about our pricing? We've got answers.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-accent-200 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 text-left flex items-center justify-between hover:bg-accent-50 transition-colors px-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-accent-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <HiChevronUp className="w-5 h-5 text-accent-500 flex-shrink-0" />
                ) : (
                  <HiChevronDown className="w-5 h-5 text-accent-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-6"
                >
                  <p className="text-accent-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-accent-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-accent-600 mb-6">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contact Sales
              </button>
              <button className="btn-outline">
                Schedule a Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingFAQ 