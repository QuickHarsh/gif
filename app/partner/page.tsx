'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiCheck, FiUsers, FiTruck, FiShoppingBag, FiSend } from 'react-icons/fi';

const PartnerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    location: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    alert('Thank you for your interest in partnering with us! We will contact you shortly.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessName: '',
      businessType: '',
      location: '',
      message: ''
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

  const partnerTypes = [
    {
      title: "Farmers & Producers",
      description: "Join our network of local farmers and producers to sell your products directly to consumers and businesses.",
      benefits: [
        "Fair pricing and transparent payment terms",
        "Reduced wastage through demand forecasting",
        "Technical support and training",
        "Access to a wider customer base"
      ],
      icon: <FiUsers className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Restaurants & Cafes",
      description: "Partner with us for wholesale delivery of fresh, high-quality ingredients for your establishment.",
      benefits: [
        "Consistent supply of fresh ingredients",
        "Competitive wholesale pricing",
        "Scheduled deliveries to fit your needs",
        "Quality assurance and traceability"
      ],
      icon: <FiShoppingBag className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Delivery Partners",
      description: "Join our delivery network to help us reach more customers across Jabalpur and Katni districts.",
      benefits: [
        "Flexible working hours",
        "Competitive pay structure",
        "Training and support",
        "Growth opportunities"
      ],
      icon: <FiTruck className="text-4xl text-primary-600 mb-4" />
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
                Partner With Us
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl opacity-90 mb-8 leading-relaxed"
              >
                Join our ecosystem and grow your business while supporting sustainable food practices
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        {/* Why Partner With Us */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Partner With Us</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We believe in creating a sustainable food ecosystem that benefits everyone involved – from farmers 
                  and producers to delivery partners and end consumers. By partnering with us, you become part of 
                  this mission while growing your own business.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our partners enjoy fair pricing, transparent practices, technical support, and access to a growing 
                  customer base across Jabalpur and Katni districts. We're committed to long-term relationships 
                  built on trust and mutual growth.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-1/2 relative h-80 w-full rounded-lg overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/partner/partnership.jpg"
                  alt="Partnership"
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
        
        {/* Partner Types */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership Opportunities</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Explore the different ways you can partner with us
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={container}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {partnerTypes.map((type, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow h-full flex flex-col"
                >
                  <div className="text-center mb-6">
                    {type.icon}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-700 mb-6">{type.description}</p>
                  </div>
                  <div className="mt-auto">
                    <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <FiCheck className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Partner Form */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Partner</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Fill out the form below to express your interest in partnering with us
              </p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block text-gray-700 font-medium mb-2">Business Name *</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block text-gray-700 font-medium mb-2">Business Type *</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Business Type</option>
                      <option value="Farmer/Producer">Farmer/Producer</option>
                      <option value="Restaurant/Cafe">Restaurant/Cafe</option>
                      <option value="Delivery Partner">Delivery Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location *</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Tell us about your business and how you'd like to partner *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>
                <div className="text-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="py-3 px-8 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors inline-flex items-center"
                  >
                    <FiSend className="mr-2" />
                    Submit Application
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-primary-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Success Stories</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Hear from our partners about their experience working with us
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/testimonials/farmer.jpg"
                      alt="Farmer"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ramesh Patel</h3>
                    <p className="text-primary-600 text-sm">Organic Farmer, Jabalpur</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Partnering with this company has transformed my farming business. I now have a reliable buyer for my produce, 
                  fair prices, and technical support that has helped me improve my yields while maintaining organic practices."
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/testimonials/restaurant.jpg"
                      alt="Restaurant Owner"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Priya Sharma</h3>
                    <p className="text-primary-600 text-sm">Restaurant Owner, Katni</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The quality and consistency of ingredients we receive has significantly improved our menu offerings. 
                  The scheduled deliveries are always on time, and the wholesale pricing has helped us improve our margins."
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/images/testimonials/delivery.jpg"
                      alt="Delivery Partner"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Vikram Singh</h3>
                    <p className="text-primary-600 text-sm">Delivery Partner, Jabalpur</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The flexible hours allow me to manage my time effectively, and the pay structure is transparent and fair. 
                  I've been able to grow my income while being part of a company that values its delivery partners."
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ CTA */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Have More Questions?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Check out our frequently asked questions or contact us directly for more information about partnering with us.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/faqs" 
                  className="py-3 px-8 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  View FAQs
                </a>
                <a 
                  href="/contact" 
                  className="py-3 px-8 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Contact Us
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

export default PartnerPage;