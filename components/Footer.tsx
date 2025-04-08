'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { staggerContainer, fadeInUp } from '../utils/animations';

const footerLinks = {
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Partner with Us', href: '#' },
    { name: 'Blog', href: '#' }
  ],
  services: [
    { name: 'Wholesale Delivery', href: '#' },
    { name: 'Express Delivery', href: '#' },
    { name: 'Quality Standards', href: '#' },
    { name: 'Sustainability', href: '#' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' }
  ],
  contact: [
    { icon: <FiPhone />, text: '+91 8717986200' },
    { icon: <FiMail />, text: 'support@getinstantfresh.com' },
    { icon: <FiMapPin />, text: 'Ward No. 13 , Near Jai Bhawani Colony , Railway Station Road Khitola,Sihora-483225 ' }
  ],
  social: [
    { icon: <FiFacebook />, name: 'Facebook', href: '#' },
    { icon: <FiTwitter />, name: 'Twitter', href: '#' },
    { icon: <FiInstagram />, name: 'Instagram', href: 'https://www.instagram.com/get_insta_fresh/' },
    { icon: <FiLinkedin />, name: 'LinkedIn', href: '#' }
  ],
  appStores: [
    {
      name: 'App Store',
      image: '/app-store-badge.svg',
      href: '#',
      alt: 'Download on the App Store'
    },
    {
      name: 'Play Store',
      image: '/play-store-badge.svg',
      href: '#',
      alt: 'Get it on Google Play'
    }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container-custom"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-6 block">
              Get Instant Fresh
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted partner in restaurant supplies. We deliver quality ingredients and 
              sustainable solutions to help your business thrive.
            </p>
            {/* App Store Downloads */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Download Our App</h3>
              <div className="flex flex-wrap gap-4">
                {footerLinks.appStores.map((store, index) => (
                  <motion.a
                    key={index}
                    href={store.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-[40px] w-[135px] hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={store.image}
                      alt={store.alt}
                      fill
                      className="object-contain"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4">
              {footerLinks.social.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  whileHover={{ scale: 1.1, color: '#fff' }}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          variants={fadeInUp}
          className="border-t border-gray-800 pt-8 mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.contact.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ color: '#fff' }}
              >
                <span className="text-primary text-xl">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Get Instant Fresh. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Cookies
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
} 