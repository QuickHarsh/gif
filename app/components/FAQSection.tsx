'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    question: "How does Cheflinx delivery work?",
    answer: "We offer two delivery models: Next Day Wholesale Delivery for planned purchases and Express Delivery within 4-6 hours for urgent requirements. Our efficient logistics network ensures timely delivery of fresh supplies to your doorstep."
  },
  {
    question: "What quality standards do you maintain?",
    answer: "All our products undergo strict quality checks. We partner with certified suppliers, maintain proper storage conditions, and ensure compliance with food safety regulations. Our quality assurance team regularly inspects products at multiple stages."
  },
  {
    question: "How can I become a supplier?",
    answer: "To become a supplier, register through our 'Get Started' section. Our team will review your application, verify credentials, and guide you through the onboarding process. We look for suppliers who maintain high quality standards and reliable delivery capabilities."
  },
  {
    question: "What are your minimum order requirements?",
    answer: "Minimum order requirements vary based on your location and delivery model. For wholesale next-day delivery, the minimum order value is typically lower compared to express delivery. Exact requirements will be displayed during checkout."
  },
  {
    question: "How do you ensure product freshness?",
    answer: "We maintain temperature-controlled storage facilities and vehicles, implement strict inventory rotation policies, and work with local suppliers to minimize transit time. Our real-time tracking system ensures optimal handling throughout the supply chain."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, bank transfers, and digital wallets. For regular business customers, we also offer credit terms subject to approval. All payments are processed securely through our platform."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const expandVariants = {
  hidden: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  visible: { 
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our services and operations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-4"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-white rounded-xl border border-gray-100 transition-all"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  backgroundColor: "rgba(var(--color-primary-rgb), 0.02)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg font-semibold text-left text-gray-900">{faq.question}</span>
                <motion.span
                  className="text-primary-600 ml-4"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <FiMinus className="w-5 h-5" />
                  ) : (
                    <FiPlus className="w-5 h-5" />
                  )}
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="p-6 bg-white border border-gray-100 rounded-xl mt-2"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            <span>Contact our support team</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}