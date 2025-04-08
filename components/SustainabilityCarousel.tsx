import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

const initiatives = [
  {
    id: 1,
    title: "Zero Waste Packaging",
    description: "Our commitment to reducing packaging waste through eco-friendly alternatives and recycling programs.",
    image: "/images/categories/packaging.jpg",
  },
  {
    id: 2,
    title: "Local Sourcing",
    description: "Supporting local farmers and reducing carbon footprint by sourcing products from nearby communities.",
    image: "/images/categories/local-sourcing.jpg",
  },
  {
    id: 3,
    title: "Energy Efficiency",
    description: "Implementing renewable energy solutions and optimizing our operations for minimal environmental impact.",
    image: "/images/categories/kitchen-equipment.jpg",
  },
  {
    id: 4,
    title: "Food Waste Reduction",
    description: "Smart inventory management and partnerships with food banks to minimize waste and help communities.",
    image: "/images/categories/frozen-food.jpg",
  }
];

export default function SustainabilityCarousel() {
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
    setCurrentSlide((prev) => (prev + 1) % initiatives.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + initiatives.length) % initiatives.length);
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
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
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
              src={initiatives[currentSlide].image}
              alt={initiatives[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-20">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-4"
              >
                {initiatives[currentSlide].title}
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl max-w-2xl"
              >
                {initiatives[currentSlide].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

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
        {initiatives.map((_, index) => (
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
  );
} 