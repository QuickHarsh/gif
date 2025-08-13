'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiArrowLeft, FiHome, FiBriefcase } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RestaurantRegistrationPage = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    restaurantName: '',
    email: '',
    phone: '',
    address: '',
    gstNumber: '',
    fssaiLicense: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Registration successful! You can now log in.');
    // Redirect to home page or login page
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
                  <FiArrowLeft className="mr-2" />
                  Back to Home
                </Link>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
              >
                Register Your Restaurant
              </motion.h1>
              
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Owner Name */}
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  {/* Restaurant Name */}
                  <div>
                    <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiHome className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="restaurantName"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Tasty Delights"
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="restaurant@example.com"
                      />
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Business Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  
                  {/* Restaurant Address */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Restaurant Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-400" />
                      </div>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Complete restaurant address"
                      />
                    </div>
                  </div>
                  
                  {/* GST Number */}
                  <div>
                    <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiBriefcase className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="gstNumber"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="22AAAAA0000A1Z5"
                      />
                    </div>
                  </div>
                  
                  {/* FSSAI License */}
                  <div>
                    <label htmlFor="fssaiLicense" className="block text-sm font-medium text-gray-700 mb-1">FSSAI License Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiBriefcase className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="fssaiLicense"
                        name="fssaiLicense"
                        value={formData.fssaiLicense}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="10022012345678"
                      />
                    </div>
                  </div>
                  
                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
                  </label>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm transition-colors"
                >
                  Register Restaurant
                </motion.button>
              </motion.form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantRegistrationPage;