'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiMenu, HiX, HiHome, HiInformationCircle, HiCurrencyDollar, HiUserGroup, HiPhone } from 'react-icons/hi'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: HiHome },
    { name: 'How It Works', href: '/how-it-works', icon: HiInformationCircle },
    { name: 'For Agents & Developers', href: '/business', icon: HiUserGroup },
    { name: 'Pricing', href: '/pricing', icon: HiCurrencyDollar },
    { name: 'About', href: '/about', icon: HiInformationCircle },
    { name: 'Contact', href: '/contact', icon: HiPhone },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LM</span>
            </div>
            <span className="text-2xl font-bold text-accent-800">LifeMap</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-accent-600 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/demo" className="btn-outline">
              Try Demo
            </Link>
            <Link href="/business" className="btn-primary">
              For Agents & Developers
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-accent-600 hover:text-accent-900 hover:bg-accent-100"
          >
            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-accent-600 hover:text-accent-900 hover:bg-accent-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  href="/demo"
                  className="block w-full text-center btn-outline"
                  onClick={() => setIsOpen(false)}
                >
                  Try Demo
                </Link>
                <Link
                  href="/business"
                  className="block w-full text-center btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  For Agents & Developers
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header 