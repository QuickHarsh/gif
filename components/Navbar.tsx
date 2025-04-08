'use client';

import React, { useState, useCallback } from 'react';
import { FiMapPin, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/50 sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
              Get Instant Fresh        
            </Link>
            
            {/* Location Selector */}
            <div className="hidden md:flex items-center space-x-2 text-gray-700 dark:text-gray-300 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400">
              <FiMapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Select Location</span>
              <FiChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center space-x-1">
              <span>Browse Catalogue</span>
              <FiChevronDown className="w-4 h-4" />
            </a>
            <button 
              onClick={() => scrollToSection('quality')}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Quality
            </button>
            <button 
              onClick={() => scrollToSection('sustainability')}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleMobileMenu}
            type="button"
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="w-6 h-6 text-gray-600 dark:text-gray-300" 
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
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} border-t border-gray-200 dark:border-gray-700`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="container-custom py-4 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <FiMapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Select Location</span>
            <FiChevronDown className="w-4 h-4" />
          </div>
          <a href="#" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2">Browse Catalogue</a>
          <button 
            onClick={() => scrollToSection('quality')}
            className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 w-full text-left"
          >
            Quality
          </button>
          <button 
            onClick={() => scrollToSection('sustainability')}
            className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 w-full text-left"
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