'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiMapPin, FiChevronDown, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const locationModalRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleLocationModal = useCallback(() => {
    setIsLocationModalOpen((prev) => !prev);
  }, []);

  const selectLocation = useCallback((location: string) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(false);
  }, []);

  // Close location modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationModalRef.current && !locationModalRef.current.contains(event.target as Node)) {
        setIsLocationModalOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-primary-600">
              Cheflinx        
            </Link>
            
            {/* Location Selector */}
            <div 
              className="hidden md:flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-primary-600"
              onClick={toggleLocationModal}
            >
              <FiMapPin className="w-5 h-5" />
              <span className="text-sm font-medium">{selectedLocation}</span>
              <FiChevronDown className="w-4 h-4" />
            </div>
            
            {/* Location Modal */}
            {isLocationModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div ref={locationModalRef} className="bg-white rounded-lg shadow-xl w-full max-w-md">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Select Your Location</h3>
                    <button 
                      onClick={toggleLocationModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        'Jabalpur', 'Sihora', 'Khitola', 'Gosalpur', 'Panagar', 
                        'Adhartal', 'Sleemdabad', 'Katni', 'Majholi', 'Katangi', 
                        'Majagwan', 'Pan Umariya', 'Silondi', 'Kundam'
                      ].map((city) => (
                        <button
                          key={city}
                          onClick={() => selectLocation(city)}
                          className="p-3 text-left hover:bg-gray-100 rounded-md transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-gray-600 hover:text-primary-600 flex items-center space-x-1">
                <span>Browse Catalogue</span>
                <FiChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50 hidden group-hover:block">
                <div className="grid grid-cols-1 gap-1">
                  {[
                    'Fruits & Vegetables',
                    'Dairy',
                    'Packaging',
                    'Kitchen Equipment',
                    'Cleaning Supplies',
                    'Sauces & Seasoning',
                    'Edible Oils'
                  ].map((category) => (
                    <Link 
                      key={category} 
                      href={`/category/${category.toLowerCase().replace(/[&,\s]+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                      className="px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('quality')}
              className="text-gray-600 hover:text-primary-600"
            >
              Quality
            </button>
            <button 
              onClick={() => scrollToSection('sustainability')}
              className="text-gray-600 hover:text-primary-600"
            >
              Sustainability
            </button>
            <Link 
              href="/register"
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleMobileMenu}
            type="button"
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} border-t border-gray-200`}
          aria-hidden={!isMobileMenuOpen}
      >
        <div className="container-custom py-4 space-y-4">
          <div 
            className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-primary-600"
            onClick={toggleLocationModal}
          >
            <FiMapPin className="w-5 h-5" />
            <span className="text-sm font-medium">{selectedLocation}</span>
            <FiChevronDown className="w-4 h-4" />
          </div>
          <div className="py-2">
            <button 
              className="flex items-center justify-between w-full text-gray-600 hover:text-primary-600 py-2"
              onClick={() => {
                const catalogueMenu = document.getElementById('mobile-catalogue-menu');
                if (catalogueMenu) {
                  catalogueMenu.classList.toggle('hidden');
                }
              }}
            >
              <span>Browse Catalogue</span>
              <FiChevronDown className="w-4 h-4" />
            </button>
            <div id="mobile-catalogue-menu" className="hidden pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
              {[
                'Fruits & Vegetables',
                'Dairy',
                'Packaging',
                'Kitchen Equipment',
                'Cleaning Supplies',
                'Sauces & Seasoning',
                'Edible Oils'
              ].map((category) => (
                <Link 
                  key={category} 
                  href={`/category/${category.toLowerCase().replace(/[&,\s]+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                  className="block py-1 text-gray-600 hover:text-primary-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <button 
            onClick={() => scrollToSection('quality')}
            className="block text-gray-600 hover:text-primary-600 py-2 w-full text-left"
          >
            Quality
          </button>
          <button 
            onClick={() => scrollToSection('sustainability')}
            className="block text-gray-600 hover:text-primary-600 py-2 w-full text-left"
          >
            Sustainability
          </button>
          <Link 
            href="/register"
            className="btn-primary w-full block text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;