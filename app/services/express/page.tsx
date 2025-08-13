'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { FiClock, FiMapPin, FiShoppingBag, FiSmartphone, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const ExpressDeliveryPage = () => {
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('express');
  
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

  const features = [
    {
      icon: <FiClock className="text-3xl text-primary-600" />,
      title: "90-Minute Delivery",
      description: "Get your essentials delivered within 90 minutes of placing your order."
    },
    {
      icon: <FiMapPin className="text-3xl text-primary-600" />,
      title: "Real-Time Tracking",
      description: "Track your delivery in real-time from our store to your doorstep."
    },
    {
      icon: <FiShoppingBag className="text-3xl text-primary-600" />,
      title: "No Minimum Order",
      description: "Order as little or as much as you need with our express delivery service."
    },
    {
      icon: <FiSmartphone className="text-3xl text-primary-600" />,
      title: "Instant Notifications",
      description: "Receive updates at every stage of your delivery process."
    }
  ];

  const deliveryComparison = [
    {
      feature: "Delivery Time",
      standard: "Same-day (4-8 hours)",
      express: "Within 90 minutes"
    },
    {
      feature: "Delivery Fee",
      standard: "₹30 (Free for orders above ₹299)",
      express: "₹99 (Fixed rate)"
    },
    {
      feature: "Order Tracking",
      standard: "Basic tracking",
      express: "Real-time GPS tracking"
    },
    {
      feature: "Delivery Hours",
      standard: "8:00 AM - 8:00 PM",
      express: "8:00 AM - 10:00 PM"
    },
    {
      feature: "Minimum Order Value",
      standard: "₹199",
      express: "No minimum"
    },
    {
      feature: "Delivery Areas",
      standard: "All service areas",
      express: "Selected areas only"
    }
  ];

  const faqs = [
    {
      question: "How does Express Delivery work?",
      answer: "Our Express Delivery service guarantees delivery within 90 minutes of placing your order. Once you place an order and select Express Delivery at checkout, our team prioritizes your order for immediate processing, packing, and dispatch. You'll receive real-time updates throughout the delivery process."
    },
    {
      question: "Is Express Delivery available in all areas?",
      answer: "Express Delivery is currently available in select areas within Jabalpur and Katni districts. During checkout, you'll be able to see if your delivery address is eligible for Express Delivery. We're continuously expanding our Express Delivery coverage."
    },
    {
      question: "What if my Express Delivery takes longer than 90 minutes?",
      answer: "We strive to meet our 90-minute delivery promise. However, in rare cases where delivery might be delayed due to unforeseen circumstances (extreme weather, traffic conditions, etc.), we'll keep you updated. If delivery exceeds 90 minutes, you'll receive a discount coupon for your next Express Delivery order."
    },
    {
      question: "Can I schedule an Express Delivery for a later time?",
      answer: "Currently, Express Delivery is designed for immediate delivery needs and cannot be scheduled for later times. If you need to schedule a delivery for a specific time, please use our Standard Delivery option which allows you to select preferred delivery slots."
    },
    {
      question: "Are there any product restrictions for Express Delivery?",
      answer: "Most products available on our platform are eligible for Express Delivery. However, some bulky items, large quantities, or special items may not be available for Express Delivery due to handling requirements. Product eligibility will be clearly indicated during checkout."
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
                  Express Delivery in 90 Minutes
                </motion.h1>
                <motion.p 
                  variants={fadeIn}
                  className="text-xl opacity-90 mb-8 leading-relaxed"
                >
                  Need groceries in a hurry? Our Express Delivery service brings fresh produce and essentials to your doorstep within 90 minutes.
                </motion.p>
                <motion.div variants={fadeIn}>
                  <a 
                    href="/" 
                    className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-full inline-block hover:bg-gray-100 transition-colors mr-4"
                  >
                    Order Now
                  </a>
                  <a 
                    href="#how-it-works" 
                    className="text-white border border-white font-semibold py-3 px-6 rounded-full inline-block hover:bg-primary-700 transition-colors"
                  >
                    Learn More
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
                    src="/images/express-delivery.jpg" 
                    alt="Express Delivery Service"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Express Delivery Features</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Our Express Delivery service is designed for those moments when you need groceries right away.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Express Delivery Works</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Getting your groceries delivered in 90 minutes is as easy as 1-2-3</p>
            </motion.div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Place Your Order</h3>
                  <p className="text-gray-700">Browse our products, add items to your cart, and select "Express Delivery" at checkout.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-lg p-6 shadow-md text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">We Prepare Your Order</h3>
                  <p className="text-gray-700">Our team immediately picks and packs your items with priority handling.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-lg p-6 shadow-md text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Your Delivery</h3>
                  <p className="text-gray-700">Track your order in real-time and receive your groceries within 90 minutes.</p>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-start">
                  <FiAlertCircle className="text-yellow-500 text-xl mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Note</h3>
                    <p className="text-gray-700">
                      Express Delivery is currently available in select areas within Jabalpur and Katni districts. Availability is subject to your delivery address and store proximity. The 90-minute delivery time may vary slightly based on order volume, weather conditions, and traffic. Maximum order value for Express Delivery is ₹5,000.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Delivery Comparison */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Express vs. Standard Delivery</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Compare our delivery options to choose what works best for you</p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-3 bg-gray-100 border-b border-gray-200">
                  <div className="p-4 font-semibold text-gray-900">Feature</div>
                  <div 
                    className={`p-4 font-semibold text-center cursor-pointer transition-colors ${deliveryType === 'standard' ? 'bg-primary-600 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setDeliveryType('standard')}
                  >
                    Standard Delivery
                  </div>
                  <div 
                    className={`p-4 font-semibold text-center cursor-pointer transition-colors ${deliveryType === 'express' ? 'bg-primary-600 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setDeliveryType('express')}
                  >
                    Express Delivery
                  </div>
                </div>
                
                {deliveryComparison.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 border-b border-gray-200">
                    <div className="p-4 font-medium text-gray-900">{item.feature}</div>
                    <div className={`p-4 text-center ${deliveryType === 'standard' ? 'bg-primary-50' : ''}`}>
                      {item.standard}
                    </div>
                    <div className={`p-4 text-center ${deliveryType === 'express' ? 'bg-primary-50' : ''}`}>
                      {item.express}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <a 
                  href="/" 
                  className="bg-primary-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-700 transition-colors inline-block"
                >
                  Start Shopping
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Find answers to common questions about our Express Delivery service</p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 bg-white rounded-lg p-6 shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
                <p className="text-gray-700 mb-6">Our customer support team is here to help you with any questions about our Express Delivery service.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/help-center" 
                    className="bg-primary-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-700 transition-colors"
                  >
                    Visit Help Center
                  </a>
                  <a 
                    href="https://wa.me/918717986200" 
                    className="bg-white border border-primary-600 text-primary-600 font-semibold py-3 px-6 rounded-full hover:bg-primary-50 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </motion.div>
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
              <h2 className="text-3xl font-bold mb-6">Ready to experience Express Delivery?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">Get your groceries delivered within 90 minutes. Try our Express Delivery service today!</p>
              <a 
                href="/" 
                className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors inline-block"
              >
                Order Now
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpressDeliveryPage;