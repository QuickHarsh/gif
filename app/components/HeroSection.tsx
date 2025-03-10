'use client';

import { motion } from 'framer-motion';
import { FiShoppingCart, FiTruck, FiPackage } from 'react-icons/fi';

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      <div className="container-custom py-20 relative">
        {/* Floating elements animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-20 right-20 w-12 h-12 text-primary opacity-20"
          >
            <FiShoppingCart className="w-full h-full" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute bottom-40 left-20 w-12 h-12 text-primary opacity-20"
          >
            <FiTruck className="w-full h-full" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-40 left-1/3 w-12 h-12 text-primary opacity-20"
          >
            <FiPackage className="w-full h-full" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl font-bold leading-tight mb-6"
            >
              Transform Your Restaurant Supply Chain
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8"
            >
              Get high-quality ingredients and supplies delivered to your restaurant. Save time, reduce costs, and ensure quality.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="space-x-4"
            >
              <button className="btn-primary">Explore Products</button>
              <button className="btn-secondary">Learn More</button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-10"></div>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="grid grid-cols-2 gap-4 p-6">
                {[
                  "Fresh Produce",
                  "Kitchen Equipment",
                  "Packaging",
                  "Cleaning Supplies"
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="h-32 bg-gray-100 rounded-md mb-2"
                    />
                    <p className="text-sm font-medium">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 