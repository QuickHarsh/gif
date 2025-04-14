'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
    title: "Frozen & Instant Food",
    description: "Grade - A Frozen & Instant Food",
    image: "/images/categories/instant.webp",
    items: ["Fries","Burger Patty","Instant Mix","Cake & Brownies",""]
  },
].map(category => ({
  ...category,
  slug: category.title.toLowerCase().replace(/[&,\s]+/g, '-').replace(/[^a-z0-9-]/g, '')
}));

export default function CategorySection() {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">OUR CATEGORIES</h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          {categories.map((category, index) => (
            <Link href={`/category/${category.slug}`} key={category.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
              >
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 14vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 7}
                  />
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-xs font-medium text-gray-900 dark:text-white leading-tight">
                    {category.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 