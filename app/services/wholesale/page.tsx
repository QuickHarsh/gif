'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { FiTruck, FiClock, FiPackage, FiUsers, FiCheckCircle, FiCalendar, FiPhoneCall } from 'react-icons/fi';

const WholesaleDeliveryPage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    address: '',
    requirements: '',
    hearAboutUs: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! Our team will contact you shortly.');
    // Reset form
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      businessType: '',
      address: '',
      requirements: '',
      hearAboutUs: ''
    });
  };

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

  const benefits = [
    {
      icon: <FiTruck className="text-3xl text-primary-600" />,
      title: "Bulk Delivery",
      description: "Get large quantities of fresh produce delivered directly to your business location."
    },
    {
      icon: <FiClock className="text-3xl text-primary-600" />,
      title: "Flexible Scheduling",
      description: "Choose delivery times that work best for your business operations."
    },
    {
      icon: <FiPackage className="text-3xl text-primary-600" />,
      title: "Customized Packaging",
      description: "Products packaged according to your specific requirements and standards."
    },
    {
      icon: <FiUsers className="text-3xl text-primary-600" />,
      title: "Dedicated Account Manager",
      description: "A single point of contact to handle all your wholesale needs and concerns."
    }
  ];

  const businessTypes = [
    "Restaurant",
    "Hotel",
    "Catering Service",
    "Grocery Store",
    "Supermarket",
    "Food Processing Unit",
    "Educational Institution",
    "Hospital/Healthcare Facility",
    "Corporate Office",
    "Other"
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
                  Wholesale Delivery Solutions for Your Business
                </motion.h1>
                <motion.p 
                  variants={fadeIn}
                  className="text-xl opacity-90 mb-8 leading-relaxed"
                >
                  Fresh produce and quality products delivered in bulk to meet your business needs. Save time, reduce costs, and ensure consistent supply.
                </motion.p>
                <motion.div variants={fadeIn}>
                  <a 
                    href="#inquiry-form" 
                    className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-full inline-block hover:bg-gray-100 transition-colors"
                  >
                    Get Started
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
                    src="/images/wholesale-delivery.jpg" 
                    alt="Wholesale Delivery Service"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Wholesale Service</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Designed specifically for businesses that require regular, large-volume deliveries of fresh produce and quality products.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Wholesale Delivery Works</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">A simple, efficient process designed to meet your business needs</p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary-200"></div>
                
                {/* Steps */}
                <div className="space-y-12">
                  {/* Step 1 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex flex-col md:flex-row items-center md:items-start"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white z-10 mb-4 md:mb-0">
                      <span className="font-bold">1</span>
                    </div>
                    <div className="md:ml-8 md:w-1/2 md:pr-8 text-center md:text-left">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Inquiry</h3>
                      <p className="text-gray-700">Fill out our wholesale inquiry form with your business details and requirements.</p>
                    </div>
                  </motion.div>
                  
                  {/* Step 2 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative flex flex-col md:flex-row-reverse items-center md:items-start"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white z-10 mb-4 md:mb-0">
                      <span className="font-bold">2</span>
                    </div>
                    <div className="md:mr-8 md:w-1/2 md:pl-8 text-center md:text-right">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation</h3>
                      <p className="text-gray-700">Our wholesale team will contact you to discuss your specific needs and create a customized plan.</p>
                    </div>
                  </motion.div>
                  
                  {/* Step 3 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative flex flex-col md:flex-row items-center md:items-start"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white z-10 mb-4 md:mb-0">
                      <span className="font-bold">3</span>
                    </div>
                    <div className="md:ml-8 md:w-1/2 md:pr-8 text-center md:text-left">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Agreement & Setup</h3>
                      <p className="text-gray-700">We'll finalize the terms, set up your account, and establish delivery schedules.</p>
                    </div>
                  </motion.div>
                  
                  {/* Step 4 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative flex flex-col md:flex-row-reverse items-center md:items-start"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white z-10 mb-4 md:mb-0">
                      <span className="font-bold">4</span>
                    </div>
                    <div className="md:mr-8 md:w-1/2 md:pl-8 text-center md:text-right">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Regular Deliveries</h3>
                      <p className="text-gray-700">Enjoy consistent, reliable deliveries of fresh produce and products according to your schedule.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Business Types We Serve */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Businesses We Serve</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Our wholesale delivery service caters to a wide range of businesses across various industries</p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {businessTypes.map((type, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="font-medium text-gray-900">{type}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Features That Make Us Different</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiCheckCircle className="text-primary-600 text-xl mt-1 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Quality Assurance</h3>
                      <p className="text-gray-700">Rigorous quality checks ensure you receive only the best products.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-primary-600 text-xl mt-1 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Competitive Pricing</h3>
                      <p className="text-gray-700">Wholesale rates that help you maximize your profit margins.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-primary-600 text-xl mt-1 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Flexible Payment Terms</h3>
                      <p className="text-gray-700">Options that align with your business cash flow requirements.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-primary-600 text-xl mt-1 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Seasonal Specials</h3>
                      <p className="text-gray-700">Access to seasonal produce at peak freshness and best prices.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2 md:pl-12"
              >
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <FiCalendar className="text-2xl text-primary-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Scheduled Deliveries</h3>
                      <p className="text-gray-700">Set up recurring deliveries on days that work best for your business.</p>
                    </div>
                  </div>
                  <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
                    <Image 
                      src="/images/scheduled-delivery.jpg" 
                      alt="Scheduled Deliveries"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex items-center">
                    <FiPhoneCall className="text-2xl text-primary-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">24/7 Support</h3>
                      <p className="text-gray-700">Dedicated support team available round the clock for any assistance.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Inquiry Form */}
        <section id="inquiry-form" className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started with Wholesale Delivery</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Fill out the form below and our team will contact you to discuss your wholesale needs</p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="businessName" className="block text-gray-700 font-medium mb-2">Business Name *</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">Contact Person *</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="businessType" className="block text-gray-700 font-medium mb-2">Business Type *</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                      <option value="">Select Business Type</option>
                      {businessTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="hearAboutUs" className="block text-gray-700 font-medium mb-2">How did you hear about us?</label>
                    <input
                      type="text"
                      id="hearAboutUs"
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Business Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="requirements" className="block text-gray-700 font-medium mb-2">Specific Requirements</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                    placeholder="Please describe your product needs, estimated quantities, and delivery frequency."
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-700 transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WholesaleDeliveryPage;