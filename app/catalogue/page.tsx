'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Import categories from CategorySection
import CategorySection from '../components/CategorySection';

// Get categories from the CategorySection component
const categories = [
  {
    title: "Fruits & Vegetables",
    description: "Farm-fresh vegetables, fruits, and herbs",
    image: "/images/categories/fruits-vegetables.jpg",
    slug: "fruits-vegetables",
    items: ["Vegetables", "Fruits", "Herbs", "Microgreens"]
  },
  {
    title: "Masala,Salt & Sugar",
    description: "Premium quality Masale",
    image: "/images/categories/spices.jpg",
    items: ["Chilli,Turmeric,Coriender Powder", "Grounded Spices", "Whole Spices", "Salt & Sugar","Mouth Freshner & Papad"]
  },
  {
    title: "Dairy",
    description: "Fresh dairy products ",
    image: "/images/categories/dairy.jpg",
    items: ["Milk & Milk Powder", "Cheese", "Butter", "Cream","Ghee","Curd","Paneer","Khoya"]
  },
  {
    title: "Packaging",
    description: "Food-grade packaging solutions",
    image: "/images/categories/packaging.jpg",
    items: ["Containers", "Bags", "Boxes", "Disposables"]
  },
  {
    title: "Kitchen Equipment",
    description: "Professional kitchen tools and equipment",
    image: "/images/categories/kitchen-equipment.jpg",
    items: ["Utensils", "Appliances", "Tools", "Storage"]
  },
  {
    title: "Cleaning Supplies",
    description: "Restaurant-grade cleaning products",
    image: "/images/categories/cleaning.jpg",
    items: ["Detergents", "Sanitizers", "Equipment", "Tools"]
  },
  {
    title: "Sauces & Seasoning",
    description: "Premium quality Sauces",
    image: "/images/categories/sauces.jpg",
    items: ["Mayonnaise,Dips & Dressing","Ketchup,Puree & Paste","Vineger,Soya & Chilli Sauces","MSG,Flavors & Essence","Oregeno,Chilli Flakes &Seasoning","Instant Noodles","Chutney & Pickles"]
  },
  {
    title: "Canned & Imported Items",
    description: "Grade-A canned and imported goods",
    image: "/images/categories/canned-imported.jpg",
    items: ["Olives,Jallepinos","Pasta & Noodles","Italian & European","Coconut Milk Powder & Cream","Imported Bakery & Chesse"]
  },
  {
    title: "Edible Oils",
    description: "Best quality Edible Oils",
    image: "/images/categories/oils.jpg",
    items: ["Sunflower Oil","Soyabean Oil","Mustard Oil","Vanaspati","Palm Oil","Cottonseed Oil"]
  },
  {
    title: "Frozen & Instant Food",
    description: "Grade - A Frozen & Instant Food",
    image: "/images/categories/frozen-food.jpg",
    items: ["Fries","Burger Patty","Instant Mix","Cake & Brownies",""]
  },
  {
    title: "Pulses",
    description: "Grade - A Pulses",
    image: "/images/categories/pulses.jpg",
    items: ["Dal","Rajma & Kabuli","Millets & Seeds"]
  },
  {
    title: "Bakery & Chocalates",
    description: "Best Bakery & Chocalates",
    image: "/images/categories/bakery.jpg",
    items: ["Honey,Spreads & Snacks","Chocalates & Compounds","Cake toppings & Decorations","Essence & Food color","Cake Premix","Bakery Ingredients","Bread & Buns"]
  },
  {
    title: "Beverages & Mixers",
    description: "All in One",
    image: "/images/categories/beverages.jpg",
    items: ["Juices & Bar Mix","Cold Drinks","Tea & Coffee","Syrups & Crushers","Energy & Flavoured Drinks"]
  },
  {
    title: "Flour",
    description: "Grade - A Flour",
    image: "/images/categories/flour.jpg",
    items: ["Atta,Maida & Sooji","Corn Flour & Besan & Others"]
  },
  {
    title: "Rice & Rice Products",
    description: "Grade - A Rice & Rice Products",  
    image: "/images/categories/rice.jpg",
    items: ["Basmati & Biryani Rice","Poha,Idli & Others","Staff Rice","Sona Masori & Kolam Rice","Indrayani Rice","Thali,Table Rice"]
  },
  {
    title: "Dry Fruits & Nuts",
    description: "Grade - A Dry Fruits & Nuts",
    image: "/images/categories/dry-fruits.webp",
    items: ["Cashews","Peanuts & Others","Almonds,Risens & Pista","Magaj"]
  },
  {
    title: "Bread & Buns Bases",
    description: "Grade - A Frozen & Instant Food",
    image: "/images/categories/instant.webp",
    items: ["Fries","Burger Patty","Instant Mix","Cake & Brownies",""]
  },
].map(category => ({
  ...category,
  slug: category.title.toLowerCase().replace(/[&,\s]+/g, '-').replace(/[^a-z0-9-]/g, '')
}));


const CataloguePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter categories based on search term and selected category
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || category.title === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-12 md:py-16">
          <div className="container-custom mx-auto px-4">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={container}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Product Catalogue
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-lg opacity-90 mb-8"
              >
                Browse our extensive range of high-quality products for your restaurant needs
              </motion.p>
              
              {/* Search Bar */}
              <motion.div 
                variants={fadeIn}
                className="relative max-w-xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-4 pl-12 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Filters and View Options */}
        <section className="py-6 border-b">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <FiFilter className="text-gray-500" />
                <span className="text-gray-700 font-medium">Filter by:</span>
                <select 
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="py-2 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* View Options */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">View:</span>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <FiGrid className="text-xl" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <FiList className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Grid/List */}
        <section className="py-12">
          <div className="container-custom mx-auto px-4">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">No products found matching your criteria</h3>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="mt-4 py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={container}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredCategories.map((category, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={category.image || '/images/categories/placeholder.jpg'}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/categories/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {category.items.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                        {category.items.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{category.items.length - 3} more
                          </span>
                        )}
                      </div>
                      <Link 
                        href={`/category/${category.slug || category.title.toLowerCase().replace(/[&,\s]+/g, '-')}`}
                        className="block text-center py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                      >
                        View Products
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={container}
                className="space-y-6"
              >
                {filteredCategories.map((category, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/4 overflow-hidden">
                        <Image
                          src={category.image || '/images/categories/placeholder.jpg'}
                          alt={category.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/categories/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="p-6 md:w-3/4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {category.items.map((item, idx) => (
                            <span key={idx} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                        <Link 
                          href={`/category/${category.slug || category.title.toLowerCase().replace(/[&,\s]+/g, '-')}`}
                          className="inline-block py-2 px-6 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                        >
                          View Products
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CataloguePage;