'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiDroplet, FiSun, FiPackage, FiTruck, FiUsers, FiHeart } from 'react-icons/fi';

const SustainabilityPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const initiatives = [
    {
      icon: <FiDroplet className="text-3xl text-primary-600" />,
      title: "Water Conservation",
      description: "We work with farmers who implement water-efficient irrigation systems and rainwater harvesting techniques to reduce water usage in agriculture."
    },
    {
      icon: <FiSun className="text-3xl text-primary-600" />,
      title: "Renewable Energy",
      description: "Our warehouses and offices are increasingly powered by solar energy, reducing our carbon footprint and dependence on fossil fuels."
    },
    {
      icon: <FiPackage className="text-3xl text-primary-600" />,
      title: "Sustainable Packaging",
      description: "We've reduced plastic usage by 60% through biodegradable packaging, reusable bags, and minimal packaging designs."
    },
    {
      icon: <FiTruck className="text-3xl text-primary-600" />,
      title: "Eco-Friendly Logistics",
      description: "Our delivery routes are optimized to reduce fuel consumption, and we're transitioning to electric vehicles for last-mile delivery."
    },
    {
      icon: <FiUsers className="text-3xl text-primary-600" />,
      title: "Farmer Education",
      description: "We provide training and resources to help farmers adopt sustainable farming practices that protect soil health and biodiversity."
    },
    {
      icon: <FiHeart className="text-3xl text-primary-600" />,
      title: "Food Waste Reduction",
      description: "Through inventory management, food donation programs, and composting initiatives, we've reduced food waste by 40% in our operations."
    }
  ];

  const impactMetrics = [
    {
      metric: "60%",
      description: "Reduction in plastic packaging"
    },
    {
      metric: "40%",
      description: "Decrease in food waste"
    },
    {
      metric: "500+",
      description: "Farmers trained in sustainable practices"
    },
    {
      metric: "30%",
      description: "Energy from renewable sources"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16 md:py-24">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={container}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <motion.h1 
                  variants={fadeIn}
                  className="text-3xl md:text-5xl font-bold mb-6"
                >
                  Our Commitment to Sustainability
                </motion.h1>
                <motion.p 
                  variants={fadeIn}
                  className="text-xl opacity-90 mb-8 leading-relaxed"
                >
                  We're dedicated to creating a more sustainable food system through responsible sourcing, eco-friendly operations, and community engagement.
                </motion.p>
                <motion.div variants={fadeIn}>
                  <a 
                    href="#initiatives" 
                    className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-full inline-block hover:bg-gray-100 transition-colors"
                  >
                    Explore Our Initiatives
                  </a>
                </motion.div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:w-5/12"
              >
                <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/sustainability-hero.jpg" 
                    alt="Sustainability Initiatives"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Approach */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach to Sustainability</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">We believe that sustainable practices are not just good for the planet, but also for our business, customers, and communities.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-50 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Environmental Stewardship</h3>
                <p className="text-gray-700 mb-4">We're committed to reducing our environmental footprint through sustainable sourcing, waste reduction, and energy efficiency.</p>
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image 
                    src="/images/environmental-stewardship.jpg" 
                    alt="Environmental Stewardship"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Responsibility</h3>
                <p className="text-gray-700 mb-4">We support fair labor practices, farmer livelihoods, and community development in the regions where we operate.</p>
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image 
                    src="/images/social-responsibility.jpg" 
                    alt="Social Responsibility"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-50 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Economic Viability</h3>
                <p className="text-gray-700 mb-4">We believe that sustainable practices should also be economically viable, creating long-term value for all stakeholders.</p>
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image 
                    src="/images/economic-viability.jpg" 
                    alt="Economic Viability"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Key Initiatives */}
        <section id="initiatives" className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Sustainability Initiatives</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">We're taking concrete actions to create a more sustainable food system</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initiatives.map((initiative, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{initiative.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{initiative.title}</h3>
                  <p className="text-gray-700">{initiative.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Impact Metrics */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">Measuring our progress towards a more sustainable future</p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {impactMetrics.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white bg-opacity-10 rounded-lg p-6 text-center"
                >
                  <h3 className="text-4xl font-bold text-white mb-2">{item.metric}</h3>
                  <p className="text-white opacity-90">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Sustainable Products */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 mb-8 md:mb-0 md:pr-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Sustainable Product Choices</h2>
                <p className="text-lg text-gray-700 mb-6">We make it easy for you to make sustainable choices when shopping with us:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-primary-100 text-primary-600 rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700"><strong>Organic Products:</strong> Grown without synthetic pesticides or fertilizers, better for the environment and your health.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-100 text-primary-600 rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700"><strong>Locally Sourced:</strong> Products from nearby farms reduce transportation emissions and support local economies.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-100 text-primary-600 rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700"><strong>Fair Trade:</strong> Products that ensure fair compensation and working conditions for farmers and workers.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-100 text-primary-600 rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700"><strong>Minimal Packaging:</strong> Products with reduced or eco-friendly packaging to minimize waste.</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a 
                    href="/catalogue" 
                    className="bg-primary-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-700 transition-colors inline-block"
                  >
                    Shop Sustainable Products
                  </a>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2"
              >
                <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/sustainable-products.jpg" 
                    alt="Sustainable Products"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Partnerships */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Sustainability Partners</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">We collaborate with organizations that share our commitment to sustainability</p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((partner) => (
                <motion.div 
                  key={partner}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: partner * 0.1 }}
                  className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center"
                >
                  <div className="relative h-16 w-full">
                    <Image 
                      src={`/images/partner-logo-${partner}.png`} 
                      alt={`Partner ${partner}`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Join Us in Creating a Sustainable Future</h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">Together, we can make a difference through the choices we make every day.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/catalogue" 
                  className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Shop Sustainable Products
                </a>
                <a 
                  href="/initiative" 
                  className="border border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-700 transition-colors"
                >
                  Learn About Our Initiatives
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SustainabilityPage;