'use client'

import { motion } from 'framer-motion'
import { HiUser, HiGlobe } from 'react-icons/hi'
import Image from 'next/image'

const Team = () => {
  const team = [
    {
      name: 'Eddy Lanaghan',
      role: 'Co-Founder',
      photo: '/eddy.jpeg',
      bio: 'Eddy brings a wealth of experience from his time in debt advisory at KPMG and investment banking at Noble & Co. His vision and leadership drive Life Map\'s mission to empower people in their property journey.',
      expertise: ['Debt Advisory', 'Investment Banking', 'Leadership'],
      linkedin: 'https://www.linkedin.com/in/eddy-lanaghan-05063414a/',
      website: '#'
    },
    {
      name: 'Matt Gordon',
      role: 'Co-Founder',
      photo: '/matt.jpeg',
      bio: 'Matt has a background in Venture Capital, having worked at Exor Ventures and Entrepreneurs First (EF), as well as Noble & Co. He leads the technology and product vision at Life Map.',
      expertise: ['Venture Capital', 'Technology', 'Product Strategy'],
      linkedin: 'https://www.linkedin.com/in/matthew-gordon-7a7953157/',
      website: '#'
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
            Meet Our Founders
          </h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            We're a team of PropTech veterans, AI experts, and property enthusiasts 
            united by a shared vision of revolutionizing how people find their perfect home.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-accent-200 rounded-full overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-accent-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-accent-600 mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-accent-900 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-accent-600 hover:text-primary-600 transition-colors"
                    >
                      <HiUser className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={member.website}
                      className="flex items-center space-x-2 text-accent-600 hover:text-primary-600 transition-colors"
                    >
                      <HiGlobe className="w-5 h-5" />
                      <span>Website</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team 