'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

const categories = [
  {
    title: "Fruits & Vegetables",
    description: "Farm-fresh vegetables, fruits, and herbs",
    image: "/images/categories/fruits-vegetables.jpg",
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
    title: "Frozen & Instant Food",
    description: "Grade - A Frozen & Instant Food",
    image: "/images/categories/instant.webp",
    items: ["Fries","Burger Patty","Instant Mix","Cake & Brownies",""]
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Categories</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our wide range of high-quality products and supplies for your restaurant
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-800/50 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="relative bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                <div className="space-y-2 mb-6">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-2"></span>
                      {item}
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300"
                >
                  Explore Category
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <button className="btn-primary">
            View All Categories
          </button>
        </motion.div>
      </div>
    </section>
  );
} 