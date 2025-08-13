'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiCheckCircle, FiUsers, FiHeart, FiGlobe, FiTruck, FiHome } from 'react-icons/fi';

const InitiativePage = () => {
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
      title: "Farm to Table",
      description: "We connect local farmers directly with consumers, eliminating middlemen and ensuring farmers receive fair compensation while customers get fresh produce at reasonable prices.",
      icon: <FiTruck className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Zero Food Waste",
      description: "Our innovative inventory management and distribution system helps reduce food waste by efficiently matching supply with demand and donating excess food to local charities.",
      icon: <FiCheckCircle className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Community Support",
      description: "We actively engage with local communities through educational programs, workshops, and events that promote sustainable food practices and healthy eating habits.",
      icon: <FiUsers className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Rural Development",
      description: "By sourcing directly from rural areas in Jabalpur and Katni districts, we help develop local economies and create sustainable livelihoods for farming communities.",
      icon: <FiHome className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Health & Nutrition",
      description: "We're committed to improving access to nutritious food options and educating consumers about the importance of balanced diets and healthy food choices.",
      icon: <FiHeart className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Environmental Sustainability",
      description: "From eco-friendly packaging to reduced carbon footprint in our delivery network, we're constantly working to minimize our environmental impact.",
      icon: <FiGlobe className="text-4xl text-primary-600 mb-4" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16 md:py-24">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={container}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h1 
                variants={fadeIn}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                Our Initiative
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl opacity-90 mb-8 leading-relaxed"
              >
                Transforming food delivery while supporting local communities and sustainable practices
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  At our core, we believe that everyone deserves access to fresh, high-quality food at fair prices. 
                  Our mission is to revolutionize the food supply chain by creating a sustainable ecosystem that 
                  benefits farmers, consumers, and the environment.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We're committed to supporting local farmers in Jabalpur and Katni districts, reducing food waste, 
                  and making nutritious food accessible to all while minimizing our environmental footprint.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-1/2 relative h-80 w-full rounded-lg overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/initiative/mission.jpg"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Key Initiatives */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Key Initiatives</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                We're driving positive change through these core initiatives that form the foundation of our business model
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={container}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {initiatives.map((initiative, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="text-center">
                    {initiative.icon}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{initiative.title}</h3>
                    <p className="text-gray-700">{initiative.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-16 bg-primary-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                The positive change we've created in our communities
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-4xl font-bold text-primary-600 mb-2">500+</h3>
                <p className="text-gray-700">Local Farmers Supported</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-4xl font-bold text-primary-600 mb-2">30%</h3>
                <p className="text-gray-700">Reduction in Food Waste</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-4xl font-bold text-primary-600 mb-2">15+</h3>
                <p className="text-gray-700">Community Programs</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-4xl font-bold text-primary-600 mb-2">20K+</h3>
                <p className="text-gray-700">Happy Customers</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Join Our Initiative</h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Whether you're a farmer looking to partner with us, a business interested in our wholesale services, 
                or a customer who wants to support sustainable food practices, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/contact" 
                  className="py-3 px-8 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </a>
                <a 
                  href="/partner" 
                  className="py-3 px-8 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Become a Partner
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

export default InitiativePage;