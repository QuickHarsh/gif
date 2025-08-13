'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

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

  const categories = [
    { id: 'all', name: 'All FAQs' },
    { id: 'ordering', name: 'Ordering' },
    { id: 'delivery', name: 'Delivery' },
    { id: 'payment', name: 'Payment' },
    { id: 'account', name: 'Account' },
    { id: 'products', name: 'Products' },
    { id: 'returns', name: 'Returns & Refunds' }
  ];

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "You can place an order through our website or mobile app. Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, select your delivery address, choose a delivery time, and complete the payment.",
      category: "ordering"
    },
    {
      question: "Can I modify my order after placing it?",
      answer: "Yes, you can modify your order within 30 minutes of placing it. Go to 'My Orders' in your account, select the order you wish to modify, and follow the instructions to add or remove items. If you need further assistance, please contact our customer support.",
      category: "ordering"
    },
    {
      question: "What areas do you deliver to?",
      answer: "We currently deliver to 14 locations across Jabalpur and Katni districts, including Jabalpur, Sihora, Khitola, Gosalpur, Panagar, Adhartal, Sleemdabad, Katni, Majholi, Katangi, Majagwan, Pan Umariya, Silondi, and Kundam.",
      category: "delivery"
    },
    {
      question: "What are your delivery hours?",
      answer: "We deliver from 8:00 AM to 8:00 PM, seven days a week. You can select your preferred delivery time slot during checkout.",
      category: "delivery"
    },
    {
      question: "Is there a minimum order value for delivery?",
      answer: "Yes, the minimum order value for free delivery is ₹299. Orders below this amount will incur a delivery fee of ₹30. However, we frequently offer free delivery promotions, so keep an eye out for those!",
      category: "delivery"
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you'll receive a tracking link via SMS and email. You can also track your order in real-time through our website or mobile app by logging into your account and navigating to 'My Orders'.",
      category: "delivery"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, UPI, net banking, mobile wallets, and cash on delivery. All online payments are secure and encrypted.",
      category: "payment"
    },
    {
      question: "Is it safe to save my card details on your platform?",
      answer: "Yes, it's completely safe. We don't store your card details on our servers. When you save your card, the information is securely stored with our payment gateway partners who comply with PCI DSS standards.",
      category: "payment"
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Sign Up' button on our website or app. You'll need to provide your name, email address, phone number, and create a password. Alternatively, you can sign up using your Google or Facebook account for a quicker process.",
      category: "account"
    },
    {
      question: "How can I reset my password?",
      answer: "To reset your password, click on the 'Login' button, then select 'Forgot Password'. Enter your registered email address or phone number, and we'll send you a link to reset your password. Follow the instructions in the email/SMS to create a new password.",
      category: "account"
    },
    {
      question: "How do I update my delivery address?",
      answer: "You can update your delivery address by logging into your account, navigating to 'My Profile' or 'Addresses', and selecting 'Edit' or 'Add New Address'. Fill in the required details and save the changes. You can save multiple addresses and select the preferred one during checkout.",
      category: "account"
    },
    {
      question: "How do you ensure the quality of your products?",
      answer: "We have a rigorous quality control process. Our products are sourced directly from verified farmers and suppliers. Each item undergoes multiple quality checks before being delivered to you. We also have a dedicated quality assurance team that regularly inspects our inventory to ensure freshness and quality.",
      category: "products"
    },
    {
      question: "Are your fruits and vegetables organic?",
      answer: "We offer both organic and conventionally grown produce. Our organic products are clearly labeled and certified by recognized organic certification bodies. We work directly with organic farmers to ensure the authenticity of these products.",
      category: "products"
    },
    {
      question: "What is your return policy?",
      answer: "If you're not satisfied with the quality of products received, you can request a return within 24 hours of delivery. Our delivery person will inspect the products and process the return if the products are in their original condition. Refunds will be processed within 5-7 business days.",
      category: "returns"
    },
    {
      question: "How do I request a refund?",
      answer: "To request a refund, log into your account, go to 'My Orders', select the order for which you want a refund, and click on 'Request Refund'. Select the items you want to return, provide a reason, and submit the request. Our team will review your request and process it accordingly.",
      category: "returns"
    },
    {
      question: "What if I receive damaged or incorrect items?",
      answer: "If you receive damaged or incorrect items, please contact our customer support immediately or use the 'Report Issue' option in the 'My Orders' section. Take a photo of the damaged/incorrect item if possible. We'll arrange for a replacement or refund as per your preference.",
      category: "returns"
    }
  ];

  // Filter FAQs based on search term and active category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Reset expanded FAQ when filter changes
  useEffect(() => {
    setExpandedFaq(null);
  }, [searchTerm, activeCategory]);

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
                Frequently Asked Questions
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl opacity-90 mb-8 leading-relaxed"
              >
                Find answers to common questions about our services
              </motion.p>
              
              {/* Search Bar */}
              <motion.div 
                variants={fadeIn}
                className="relative max-w-xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-4 pl-12 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* FAQ Categories */}
        <section className="py-8 bg-white border-b">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${activeCategory === category.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-12">
          <div className="container-custom mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl text-gray-600 mb-4">No results found</h3>
                  <p className="text-gray-700 mb-6">Try a different search term or category, or contact our support team for assistance.</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Clear Search
                    </button>
                    <button 
                      onClick={() => setActiveCategory('all')}
                      className="py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      View All FAQs
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={container}
                  className="space-y-4"
                >
                  {filteredFaqs.map((faq, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeIn}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                    >
                      <button 
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-6 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
                        {expandedFaq === index ? (
                          <FiChevronUp className="text-gray-500 flex-shrink-0" />
                        ) : (
                          <FiChevronDown className="text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* Contact Support */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
                <p className="text-gray-700 mb-6">If you couldn't find the answer you were looking for, our support team is here to help.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/help-center" 
                    className="py-3 px-6 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Visit Help Center
                  </a>
                  <a 
                    href="https://wa.me/918717986200" 
                    className="py-3 px-6 bg-white border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQsPage;