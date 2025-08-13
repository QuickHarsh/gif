'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiSearch, FiChevronDown, FiChevronUp, FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi';

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
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

  const helpCategories = [
    {
      title: "Ordering",
      icon: "🛒",
      link: "/help-center/ordering"
    },
    {
      title: "Delivery",
      icon: "🚚",
      link: "/help-center/delivery"
    },
    {
      title: "Payment",
      icon: "💳",
      link: "/help-center/payment"
    },
    {
      title: "Account",
      icon: "👤",
      link: "/help-center/account"
    },
    {
      title: "Products",
      icon: "🥕",
      link: "/help-center/products"
    },
    {
      title: "Returns & Refunds",
      icon: "↩️",
      link: "/help-center/returns-refunds"
    }
  ];

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "You can place an order through our website or mobile app. Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, select your delivery address, choose a delivery time, and complete the payment."
    },
    {
      question: "What areas do you deliver to?",
      answer: "We currently deliver to 14 locations across Jabalpur and Katni districts, including Jabalpur, Sihora, Khitola, Gosalpur, Panagar, Adhartal, Sleemdabad, Katni, Majholi, Katangi, Majagwan, Pan Umariya, Silondi, and Kundam."
    },
    {
      question: "What are your delivery hours?",
      answer: "We deliver from 8:00 AM to 8:00 PM, seven days a week. You can select your preferred delivery time slot during checkout."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you'll receive a tracking link via SMS and email. You can also track your order in real-time through our website or mobile app by logging into your account and navigating to 'My Orders'."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, UPI, net banking, mobile wallets, and cash on delivery. All online payments are secure and encrypted."
    },
    {
      question: "How do I cancel or modify my order?",
      answer: "You can cancel or modify your order within 30 minutes of placing it. Simply log into your account, go to 'My Orders', select the order you wish to modify, and follow the instructions. For assistance, you can also contact our customer support team."
    },
    {
      question: "What is your return policy?",
      answer: "If you're not satisfied with the quality of products received, you can request a return within 24 hours of delivery. Our delivery person will inspect the products and process the return if the products are in their original condition. Refunds will be processed within 5-7 business days."
    },
    {
      question: "How do I become a partner?",
      answer: "If you're interested in becoming a partner (farmer, restaurant, or delivery partner), please visit our 'Partner With Us' page and fill out the application form. Our team will review your application and contact you within 3-5 business days."
    }
  ];

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
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
                How Can We Help You?
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl opacity-90 mb-8 leading-relaxed"
              >
                Find answers to frequently asked questions or contact our support team
              </motion.p>
              
              {/* Search Bar */}
              <motion.div 
                variants={fadeIn}
                className="relative max-w-xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-4 pl-12 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Help Categories */}
        <section className="py-12 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Help Topics</h2>
              <p className="text-gray-700">Select a category to find the help you need</p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={container}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            >
              {helpCategories.map((category, index) => (
                <motion.a 
                  key={index}
                  href={category.link}
                  variants={fadeIn}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow flex flex-col items-center"
                >
                  <span className="text-4xl mb-4">{category.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-700">Find quick answers to common questions</p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              {searchTerm && filteredFaqs.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl text-gray-600 mb-4">No results found for "{searchTerm}"</h3>
                  <p className="text-gray-700 mb-4">Try a different search term or contact our support team for assistance.</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={container}
                  className="space-y-4"
                >
                  {(searchTerm ? filteredFaqs : faqs).map((faq, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeIn}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button 
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                        {expandedFaq === index ? (
                          <FiChevronUp className="text-gray-500" />
                        ) : (
                          <FiChevronDown className="text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>
        
        {/* Contact Options */}
        <section className="py-12 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-gray-700">Our support team is here to assist you</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-700 mb-4">Speak directly with our customer support team</p>
                <a 
                  href="tel:+918717986200" 
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  +91 8717986200
                </a>
                <p className="text-sm text-gray-500 mt-2">Available 8:00 AM - 8:00 PM</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-700 mb-4">Send us an email and we'll respond within 24 hours</p>
                <a 
                  href="mailto:support@company.com" 
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  support@company.com
                </a>
                <p className="text-sm text-gray-500 mt-2">We respond within 24 hours</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMessageSquare className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp Support</h3>
                <p className="text-gray-700 mb-4">Chat with us on WhatsApp for quick assistance</p>
                <a 
                  href="https://wa.me/918717986200" 
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  Message on WhatsApp
                </a>
                <p className="text-sm text-gray-500 mt-2">Typically replies within minutes</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenterPage;