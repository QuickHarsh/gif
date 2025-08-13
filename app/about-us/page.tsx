'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiTarget, FiEye, FiAward, FiUsers, FiCalendar } from 'react-icons/fi';

const AboutUsPage = () => {
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

  const values = [
    {
      title: "Quality",
      description: "We never compromise on the quality of our products, ensuring only the freshest and finest reach our customers.",
      icon: <FiAward className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Transparency",
      description: "We believe in complete transparency in our operations, pricing, and sourcing practices.",
      icon: <FiEye className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Community",
      description: "We're committed to supporting local communities and creating positive social impact through our business.",
      icon: <FiUsers className="text-4xl text-primary-600 mb-4" />
    },
    {
      title: "Innovation",
      description: "We continuously innovate to improve our services, operations, and customer experience.",
      icon: <FiTarget className="text-4xl text-primary-600 mb-4" />
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "Our Beginning",
      description: "Started as a small delivery service in Jabalpur with just 5 team members and 20 partner farmers."
    },
    {
      year: "2019",
      title: "Expansion",
      description: "Expanded our operations to cover more areas in Jabalpur and introduced our mobile app."
    },
    {
      year: "2020",
      title: "Pandemic Response",
      description: "Pivoted to contactless delivery and essential services during the pandemic, serving over 5,000 households."
    },
    {
      year: "2021",
      title: "New Markets",
      description: "Expanded to Katni district and launched our wholesale delivery service for restaurants and businesses."
    },
    {
      year: "2022",
      title: "Sustainability Focus",
      description: "Introduced eco-friendly packaging and launched our zero food waste initiative."
    },
    {
      year: "2023",
      title: "Today",
      description: "Serving 14 locations across Jabalpur and Katni districts with a team of 100+ employees and 500+ farmer partners."
    }
  ];

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
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h1 
                variants={fadeIn}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                About Us
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl opacity-90 mb-8 leading-relaxed"
              >
                We're on a mission to revolutionize food delivery in central India by connecting local farmers directly with consumers
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Founded in 2018, we started with a simple idea: to create a better way to connect local farmers with consumers. 
                  We noticed that farmers in the Jabalpur and Katni regions were not getting fair prices for their produce, 
                  while consumers were paying high prices for lower quality products that had traveled long distances.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  What began as a small operation with just a handful of farmers and customers has grown into a 
                  comprehensive food delivery platform serving thousands of households and businesses across 14 locations. 
                  Throughout our journey, our commitment to quality, fairness, and sustainability has remained unwavering.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-1/2 relative h-80 w-full rounded-lg overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/about/our-story.jpg"
                  alt="Our Story"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                These core principles guide everything we do
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={container}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow text-center"
                >
                  {value.icon}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Meet the people driving our mission forward
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src="/images/team/ceo.jpg"
                    alt="CEO"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Rajesh Kumar</h3>
                  <p className="text-primary-600 mb-4">Founder & CEO</p>
                  <p className="text-gray-700">With over 15 years of experience in agriculture and supply chain management, Rajesh founded the company with a vision to transform food delivery in central India.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src="/images/team/coo.jpg"
                    alt="COO"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Priya Sharma</h3>
                  <p className="text-primary-600 mb-4">Chief Operations Officer</p>
                  <p className="text-gray-700">Priya oversees our day-to-day operations, ensuring seamless delivery and exceptional customer service across all our locations.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src="/images/team/cto.jpg"
                    alt="CTO"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Amit Patel</h3>
                  <p className="text-primary-600 mb-4">Chief Technology Officer</p>
                  <p className="text-gray-700">Amit leads our technology team, developing innovative solutions that power our platform and enhance the customer experience.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Journey */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Key milestones in our growth story
              </p>
            </motion.div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              
              {/* Timeline Items */}
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:mr-[50%] md:pr-12' : 'md:mr-auto md:ml-[50%] md:pl-12'}`}
                >
                  <div className="bg-white rounded-lg shadow-md p-6 md:w-[90%] relative z-10">
                    <div className="absolute top-6 -left-3 md:top-1/2 md:transform md:-translate-y-1/2 md:left-auto md:right-auto md:-ml-[22px] md:-mr-[22px] bg-primary-600 rounded-full w-6 h-6 border-4 border-white z-20"></div>
                    <div className="flex items-center mb-3">
                      <FiCalendar className="text-primary-600 mr-2" />
                      <span className="text-primary-600 font-semibold">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                We're always looking for passionate individuals to join our growing team. Check out our current openings and become part of our journey.
              </p>
              <a 
                href="/careers" 
                className="py-3 px-8 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors inline-block"
              >
                View Careers
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUsPage;