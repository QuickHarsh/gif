'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiDroplet, FiTruck, FiPackage, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

const initiatives = [
  {
    icon: <FiDroplet className="w-6 h-6" />,
    title: "Environmental Impact",
    description: "Reducing our carbon footprint through sustainable practices."
  },
  {
    icon: <FiTruck className="w-6 h-6" />,
    title: "Sustainable Logistics",
    description: "Electric vehicles and optimized delivery routes."
  },
  {
    icon: <FiPackage className="w-6 h-6" />,
    title: "Waste Management",
    description: "Comprehensive recycling and waste reduction programs."
  },
  {
    icon: <FiUsers className="w-6 h-6" />,
    title: "Community Engagement",
    description: "Partnering with communities for sustainable initiatives."
  }
];

const carouselSlides = [
  {
    id: 1,
    title: "Zero Waste Packaging",
    description: "Our commitment to reducing packaging waste through eco-friendly alternatives and recycling programs.",
    image: "/images/categories/zero-waste-packaging.jpg",
  },
  {
    id: 2,
    title: "Local Sourcing",
    description: "Supporting local farmers and reducing carbon footprint by sourcing products from nearby communities.",
    image: "/images/categories/fruits-vegetables.jpg",
  },
  {
    id: 3,
    title: "Energy Efficiency",
    description: "Implementing renewable energy solutions and optimizing our operations for minimal environmental impact.",
    image: "/images/categories/energy.jpg",
  },
  {
    id: 4,
    title: "Food Waste Reduction",
    description: "Smart inventory management and partnerships with food banks to minimize waste and help communities.",
    image: "/images/categories/food-waste.jpg",
  }
];

export default function SustainabilitySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section id="sustainability" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Committed to Sustainability</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building a sustainable future through responsible business practices and environmental stewardship.
          </p>
        </motion.div>

        <div className="mb-20">
          <div className="relative w-full h-[600px] overflow-hidden bg-gray-900 rounded-2xl">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full h-full"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img
                  src={carouselSlides[currentSlide].image}
                  alt={carouselSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-20">
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-4"
                  >
                    {carouselSlides[currentSlide].title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl max-w-2xl"
                  >
                    {carouselSlides[currentSlide].description}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-colors"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-colors"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-primary-600 mb-4">
                {initiative.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{initiative.title}</h3>
              <p className="text-gray-600 text-sm">{initiative.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link 
            href="/sustainability"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Learn More About Our Initiatives
          </Link>
        </motion.div>
      </div>
    </section>
  );
}