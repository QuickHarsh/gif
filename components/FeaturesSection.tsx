'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiPackage, FiShield, FiClock } from 'react-icons/fi';

const features = [
  {
    icon: <FiTruck className="w-6 h-6" />,
    title: "Next Day Delivery",
    description: "Get your supplies delivered the next day"
  },
  {
    icon: <FiPackage className="w-6 h-6" />,
    title: "Quality Products",
    description: "Sourced from trusted suppliers"
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: "Safety Assured",
    description: "All products meet safety standards"
  },
  {
    icon: <FiClock className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Round the clock customer service"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Get Instant Fresh?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We deliver quality ingredients and supplies to help your business thrive
          </p>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-800/50"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + index * 0.1 
                }}
                className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-400"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 