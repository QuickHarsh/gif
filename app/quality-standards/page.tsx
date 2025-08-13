'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiCheck } from 'react-icons/fi';

const QualityStandardsPage = () => {
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
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1 
                variants={fadeIn}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                Our Quality Standards
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-lg md:text-xl opacity-90 mb-8"
              >
                At Cheflinx, we are committed to providing the highest quality products through our "Shoshobazi" approach - ensuring freshness, safety, and sustainability at every step.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Standards Section */}
        <section className="py-16">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={container}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <motion.h2 
                  variants={fadeIn}
                  className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                >
                  The Shoshobazi Approach
                </motion.h2>
                <motion.p 
                  variants={fadeIn}
                  className="text-gray-700 mb-6"
                >
                  "Shoshobazi" is our unique approach to quality that combines traditional Indian values with modern food safety standards. This philosophy guides everything we do, from sourcing to delivery.
                </motion.p>
                <motion.div 
                  variants={container}
                  className="space-y-4"
                >
                  {[
                    "Direct farm relationships for maximum freshness",
                    "Rigorous quality checks at every stage",
                    "Cold chain maintained throughout the journey",
                    "Sustainable packaging and minimal waste",
                    "Traceability from farm to kitchen"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeIn}
                      className="flex items-start space-x-3"
                    >
                      <FiCheck className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <motion.div 
                variants={fadeIn}
                className="rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src="/images/quality-standards.jpg" 
                  alt="Quality inspection process" 
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Certification Section */}
        <section className="py-16 bg-gray-100">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={container}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h2 
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
              >
                Our Certifications
              </motion.h2>
              <motion.p 
                variants={fadeIn}
                className="text-gray-700 mb-12"
              >
                We adhere to the highest industry standards and have received multiple certifications that validate our commitment to quality.
              </motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={container}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { name: "FSSAI Certified", icon: "🏅" },
                { name: "ISO 22000:2018", icon: "🏅" },
                { name: "HACCP Compliant", icon: "🏅" },
                { name: "Organic Certified", icon: "🏅" }
              ].map((cert, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <div className="text-4xl mb-4">{cert.icon}</div>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quality Process Section */}
        <section className="py-16">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={container}
              className="max-w-3xl mx-auto mb-12 text-center"
            >
              <motion.h2 
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
              >
                Our Quality Process
              </motion.h2>
              <motion.p 
                variants={fadeIn}
                className="text-gray-700"
              >
                Every product goes through our rigorous 5-step quality assurance process before reaching your kitchen.
              </motion.p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={container}
              className="grid md:grid-cols-5 gap-4 md:gap-8"
            >
              {[
                { step: "1", title: "Sourcing", desc: "Direct relationships with farmers and producers" },
                { step: "2", title: "Inspection", desc: "Multi-point quality checks on arrival" },
                { step: "3", title: "Processing", desc: "Hygienic handling in temperature-controlled facilities" },
                { step: "4", title: "Packaging", desc: "Sustainable materials that maintain freshness" },
                { step: "5", title: "Delivery", desc: "Temperature-controlled vehicles for maximum freshness" }
              ].map((process, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white p-6 rounded-lg shadow-md text-center relative"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {process.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-4 mb-2">{process.title}</h3>
                  <p className="text-gray-600 text-sm">{process.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QualityStandardsPage;