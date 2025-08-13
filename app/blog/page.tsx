'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiUser, FiTag, FiSearch, FiFilter } from 'react-icons/fi';

const BlogPage = () => {
  const [category, setCategory] = useState<string>('all');
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

  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Farm-to-Table Food Delivery",
      excerpt: "Discover how farm-to-table delivery is revolutionizing the way we eat and supporting local farmers.",
      date: "June 15, 2023",
      author: "Rajesh Kumar",
      category: "Sustainability",
      image: "/images/blog/farm-to-table.jpg",
      slug: "benefits-of-farm-to-table-delivery"
    },
    {
      id: 2,
      title: "Seasonal Eating: Why It Matters",
      excerpt: "Learn about the environmental and health benefits of eating seasonally available produce.",
      date: "July 22, 2023",
      author: "Priya Sharma",
      category: "Nutrition",
      image: "/images/blog/seasonal-eating.jpg",
      slug: "seasonal-eating-why-it-matters"
    },
    {
      id: 3,
      title: "Supporting Local Farmers in Jabalpur",
      excerpt: "How our partnerships with local farmers are creating sustainable livelihoods and preserving agricultural traditions.",
      date: "August 10, 2023",
      author: "Amit Patel",
      category: "Community",
      image: "/images/blog/local-farmers.jpg",
      slug: "supporting-local-farmers-jabalpur"
    },
    {
      id: 4,
      title: "Reducing Food Waste: Our Approach",
      excerpt: "Explore the innovative ways we're working to minimize food waste in our supply chain.",
      date: "September 5, 2023",
      author: "Neha Singh",
      category: "Sustainability",
      image: "/images/blog/food-waste.jpg",
      slug: "reducing-food-waste-our-approach"
    },
    {
      id: 5,
      title: "Healthy Eating on a Budget",
      excerpt: "Tips and tricks for maintaining a nutritious diet without breaking the bank.",
      date: "October 12, 2023",
      author: "Vikram Rao",
      category: "Nutrition",
      image: "/images/blog/budget-eating.jpg",
      slug: "healthy-eating-on-budget"
    },
    {
      id: 6,
      title: "The Future of Food Delivery in Rural India",
      excerpt: "How technology is bridging the gap between urban conveniences and rural communities.",
      date: "November 8, 2023",
      author: "Rajesh Kumar",
      category: "Technology",
      image: "/images/blog/rural-delivery.jpg",
      slug: "future-food-delivery-rural-india"
    }
  ];

  // Filter blog posts based on selected category and search term
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = category === 'all' || post.category === category;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter options
  const uniqueCategories = new Set(blogPosts.map(post => post.category));
  const categories = ['all', ...Array.from(uniqueCategories)];

  // Featured post (most recent)
  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
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
                Our Blog
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl opacity-90 mb-8 leading-relaxed"
              >
                Insights, stories, and updates from our team
              </motion.p>
            </motion.div>
          </div>
        </section>
        
        {/* Featured Post */}
        <section className="py-12 bg-white">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-64 md:h-auto md:w-1/2">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6 md:w-1/2">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FiCalendar className="mr-2" />
                    <span>{featuredPost.date}</span>
                    <span className="mx-2">•</span>
                    <FiUser className="mr-2" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{featuredPost.title}</h3>
                  <p className="text-gray-700 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiTag className="mr-2 text-primary-600" />
                      <span className="text-primary-600">{featuredPost.category}</span>
                    </div>
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="py-2 px-6 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Blog Posts */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-auto flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <div className="w-full md:w-auto flex items-center gap-2">
                  <FiFilter className="text-gray-500" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="py-2 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.filter(c => c !== 'all').map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Blog Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h3 className="text-xl text-gray-600">No articles found matching your criteria</h3>
                <button 
                  onClick={() => {
                    setCategory('all');
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <motion.div 
                    key={post.id}
                    variants={fadeIn}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <FiCalendar className="mr-2" />
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                      <p className="text-gray-700 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FiTag className="mr-2 text-primary-600" />
                          <span className="text-primary-600">{post.category}</span>
                        </div>
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                Stay updated with our latest articles, news, and special offers.
              </p>
              <div className="max-w-md mx-auto">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow py-3 px-4 rounded-md focus:outline-none text-gray-800"
                    required
                  />
                  <button 
                    type="submit"
                    className="py-3 px-6 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-sm mt-4 opacity-80">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;