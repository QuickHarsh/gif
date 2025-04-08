'use client';

import { motion } from 'framer-motion';
import { FiUser, FiShoppingBag, FiTruck, FiBox, FiBarChart, FiCreditCard, FiSearch, FiHeart, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const homeDelivery = [
  {
    icon: <FiTruck className="w-5 h-5" />,
    text: "Fresh food, quick doorstep delivery"
  },
  {
    icon: <FiBarChart className="w-5 h-5" />,
    text: "Shop fast, skip the long lines"
  },
  {
    icon: <FiBox className="w-5 h-5" />,
    text: "Big savings with daily offers"
  },
  {
    icon: <FiCreditCard className="w-5 h-5" />,
    text: "Quality groceries you can trust"
  }
];

const resturentDelivery = [
  {
    icon: <FiSearch className="w-5 h-5" />,
    text: "Access to quality verified suppliers"
  },
  {
    icon: <FiHeart className="w-5 h-5" />,
    text: "Premium quality ingredients"
  },
  {
    icon: <FiBox className="w-5 h-5" />,
    text: "Bulk ordering with great prices"
  },
  {
    icon: <FiTruck className="w-5 h-5" />,
    text: "Next day delivery guaranteed"
  }
];

export default function RegistrationSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Get Instant Fresh Today</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your role and start your journey with us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Seller Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FiShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Login For Home Delivery</h3>
              <p className="text-gray-600 mb-6">
                Join our network of trusted products and regionable rates thousands of Coustumers looking for quality products.
              </p>
              <div className="space-y-4 mb-8">
                {homeDelivery.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <div className="text-primary">{benefit.icon}</div>
                    <span>{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full"
              >
                Create Account
              </motion.button>
            </div>
          </motion.div>

          {/* Customer Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FiUser className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Login For Resturent Delivery</h3>
              <p className="text-gray-600 mb-6">
                Get access to high-quality ingredients and supplies for your restaurant at competitive prices.
              </p>
              <div className="space-y-4 mb-8">
                {resturentDelivery.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <div className="text-primary">{benefit.icon}</div>
                    <span>{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full"
              >
                Create Account
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
} 