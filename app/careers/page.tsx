'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiMapPin, FiClock, FiBriefcase, FiFilter, FiSearch } from 'react-icons/fi';

const CareersPage = () => {
  const [department, setDepartment] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const jobOpenings = [
    {
      title: "Delivery Operations Manager",
      department: "Operations",
      location: "Jabalpur",
      type: "Full-time",
      description: "Lead and optimize our delivery operations in Jabalpur region, ensuring timely deliveries and customer satisfaction."
    },
    {
      title: "Senior Software Engineer",
      department: "Technology",
      location: "Jabalpur",
      type: "Full-time",
      description: "Develop and maintain our web and mobile applications, implementing new features and ensuring optimal performance."
    },
    {
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Katni",
      type: "Full-time",
      description: "Handle customer inquiries, resolve issues, and ensure exceptional customer experience across all touchpoints."
    },
    {
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Jabalpur",
      type: "Full-time",
      description: "Plan and execute marketing campaigns, manage social media presence, and drive customer acquisition initiatives."
    },
    {
      title: "Warehouse Associate",
      department: "Operations",
      location: "Katni",
      type: "Full-time",
      description: "Manage inventory, prepare orders for delivery, and maintain warehouse organization and cleanliness."
    },
    {
      title: "Delivery Partner",
      department: "Operations",
      location: "Jabalpur",
      type: "Part-time",
      description: "Deliver orders to customers in a timely and professional manner, ensuring a positive delivery experience."
    },
    {
      title: "UI/UX Designer",
      department: "Technology",
      location: "Jabalpur",
      type: "Full-time",
      description: "Design intuitive and engaging user interfaces for our web and mobile applications, enhancing user experience."
    },
    {
      title: "Finance Analyst",
      department: "Finance",
      location: "Jabalpur",
      type: "Full-time",
      description: "Analyze financial data, prepare reports, and provide insights to support business decision-making."
    }
  ];

  // Filter job openings based on selected filters and search term
  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = department === 'all' || job.department === department;
    const matchesLocation = location === 'all' || job.location === location;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesLocation && matchesSearch;
  });

  // Get unique departments and locations for filter options
  const uniqueDepartments = new Set(jobOpenings.map(job => job.department));
  const uniqueLocations = new Set(jobOpenings.map(job => job.location));
  const departments = ['all', ...Array.from(uniqueDepartments)];
  const locations = ['all', ...Array.from(uniqueLocations)];

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
                Join Our Team
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl opacity-90 mb-8 leading-relaxed"
              >
                Be part of our mission to revolutionize food delivery in central India
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        {/* Why Join Us */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Join Us</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  At our company, we're not just delivering food – we're creating a sustainable ecosystem that benefits 
                  farmers, consumers, and the environment. When you join our team, you become part of this mission.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We offer competitive compensation, opportunities for growth and development, a collaborative and 
                  inclusive work environment, and the chance to make a real difference in local communities.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Growth Opportunities</h3>
                      <p className="text-gray-700 text-sm">Career advancement and skill development</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Competitive Benefits</h3>
                      <p className="text-gray-700 text-sm">Health insurance and retirement plans</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Work-Life Balance</h3>
                      <p className="text-gray-700 text-sm">Flexible schedules and time off</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Inclusive Culture</h3>
                      <p className="text-gray-700 text-sm">Diverse and supportive workplace</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-1/2 relative h-80 w-full rounded-lg overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/careers/team.jpg"
                  alt="Our Team"
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
        
        {/* Current Openings */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Openings</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Explore our current job opportunities and find your perfect role
              </p>
            </motion.div>
            
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-auto flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <FiFilter className="text-gray-500" />
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="py-2 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="all">All Departments</option>
                      {departments.filter(d => d !== 'all').map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-gray-500" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="py-2 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="all">All Locations</option>
                      {locations.filter(l => l !== 'all').map((loc, index) => (
                        <option key={index} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job Listings */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h3 className="text-xl text-gray-600">No job openings match your criteria</h3>
                <button 
                  onClick={() => {
                    setDepartment('all');
                    setLocation('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={container}
                className="space-y-6"
              >
                {filteredJobs.map((job, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center text-gray-600">
                              <FiBriefcase className="mr-1" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FiMapPin className="mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FiClock className="mr-1" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <a 
                          href={`/careers/${job.title.toLowerCase().replace(/[&,\s]+/g, '-')}`}
                          className="mt-4 md:mt-0 inline-block py-2 px-6 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                        >
                          Apply Now
                        </a>
                      </div>
                      <p className="text-gray-700">{job.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Application Process */}
        <section className="py-16 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Application Process</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Here's what to expect when you apply to join our team
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Application</h3>
                <p className="text-gray-700">Submit your application through our careers page with your resume and cover letter.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Screening</h3>
                <p className="text-gray-700">Our HR team will review your application and contact you for an initial phone interview.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview</h3>
                <p className="text-gray-700">Selected candidates will be invited for in-person or virtual interviews with the hiring team.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Offer</h3>
                <p className="text-gray-700">Successful candidates will receive a job offer and welcome to our team!</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Don't See the Right Role?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <a 
                href="mailto:careers@company.com" 
                className="py-3 px-8 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors inline-block"
              >
                Contact Our Recruitment Team
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareersPage;