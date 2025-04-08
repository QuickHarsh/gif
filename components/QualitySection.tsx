'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiShield } from 'react-icons/fi';

const qualityFeatures = [
  {
    title: "Quality Assurance",
    description: "Rigorous quality checks at every stage of procurement and delivery"
  },
  {
    title: "Fresh Produce",
    description: "Direct from verified farms and suppliers for maximum freshness"
  },
  {
    title: "Safety Standards",
    description: "Adherence to international food safety and handling standards"
  },
  {
    title: "Temperature Control",
    description: "End-to-end cold chain maintenance for perishable items"
  }
];

export default function QualitySection() {
  return (
    <section id="quality" className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Our Quality Promise</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We maintain the highest standards of quality in our supply chain, ensuring that your restaurant receives only the best ingredients and supplies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Quality Features */}
          <div className="space-y-8">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2 + index * 0.1 
                  }}
                  className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center"
                >
                  <FiCheck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quality Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-800/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-100 dark:from-primary-900 to-primary-200 dark:to-primary-800" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/categories/fruits-vegetables.jpg"
                alt="Quality Products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3
                    }}
                    className="w-24 h-24 mx-auto mb-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center"
                  >
                    <FiShield className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                  </motion.div>
                  <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-2xl font-bold mb-4 text-white"
                  >
                    Quality Certified
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-white"
                  >
                    Our quality management system is certified by international standards, ensuring consistent quality in every delivery.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Learn More About Our Quality Standards
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 