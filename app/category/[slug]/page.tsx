'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const categories = [
  "Fruits & Vegetables",
  "Masala, Salt & Sugar",
  "Dairy",
  "Packaging",
  "Kitchen Equipment",
  "Cleaning Supplies",
  "Sauces & Seasoning",
  "Canned & Imported Items",
  "Edible Oils",
  "Frozen & Instant Food",
  "Pulses",
  "Bakery & Chocolates",
  "Beverages & Mixers",
  "Flour",
  "Rice & Rice Products",
  "Dry Fruits & Nuts"
];

const categoryProducts = {
  'fruits-vegetables': {
    name: 'Fruits & Vegetables',
    quickFilters: ['Brand', 'Mint Leaves', 'Carrots', 'Spring Onion', 'Frozen Corn', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Indian Vegetables', icon: '🥬' },
      { name: 'Tomato, Onion, Potato', icon: '🧅' },
      { name: 'Exotic Vegetables', icon: '🥦' },
      { name: 'Leafy Vegetables', icon: '🌿' },
      { name: 'Fruits', icon: '🍎' },
      { name: 'Frozen Vegetables', icon: '❄️' },
    ],
    products: [
      {
        id: 1,
        name: 'Mint Leaves (Pudina)',
        image: '/images/categories/mint.jpg',
        weight: '250 gm',
        baseWeight: '0.25 kg',
        pricingTiers: [
          { quantity: '1.75 kgs+', price: '₹46/kg', addQuantity: 7 },
          { quantity: '1 kg+', price: '₹48/kg', addQuantity: 4 }
        ],
        basePrice: '12.5'
      },
      {
        id: 2,
        name: 'Carrots (Big)',
        image: '/images/categories/carrot.jpg',
        weight: '1 Kg',
        baseWeight: '1 kg',
        pricingTiers: [
          { quantity: '7 kgs+', price: '₹24.1/kg', addQuantity: 7 },
          { quantity: '3 kgs+', price: '₹25.4/kg', addQuantity: 3 }
        ],
        basePrice: '27'
      },
      {
        id: 3,
        name: 'Spring Onion',
        image: '/images/categories/spring-onion.jpg',
        weight: '250 gm',
        baseWeight: '0.25 kg',
        pricingTiers: [
          { quantity: '1.25 kgs+', price: '₹40/kg', addQuantity: 5 },
          { quantity: '0.75 kg+', price: '₹41.2/kg', addQuantity: 3 }
        ],
        basePrice: '10.5'
      }
    ]
  },
  'masala-salt-sugar': {
    name: 'Masala, Salt & Sugar',
    quickFilters: ['Brand', 'Spices', 'Salt', 'Sugar', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Ground Spices', icon: '🌶️' },
      { name: 'Whole Spices', icon: '✨' },
      { name: 'Salt', icon: '🧂' },
      { name: 'Sugar', icon: '🍯' },
      { name: 'Mouth Freshener & Papad', icon: '🍘' },
    ],
    products: [
      {
        id: 1,
        name: 'Table Salt',
        image: '/images/categories/spices.jpg',
        weight: '1 kg',
        baseWeight: '1 kg',
        pricingTiers: [
          { quantity: '10 kgs+', price: '₹18/kg', addQuantity: 10 },
          { quantity: '5 kgs+', price: '₹20/kg', addQuantity: 5 }
        ],
        basePrice: '22'
      },
    ]
  },
  'dairy': {
    name: 'Dairy',
    quickFilters: ['Brand', 'Milk', 'Cheese', 'Butter', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Milk & Milk Powder', icon: '🥛' },
      { name: 'Cheese', icon: '🧀' },
      { name: 'Butter & Cream', icon: '🧈' },
      { name: 'Curd & Yogurt', icon: '🥄' },
      { name: 'Paneer', icon: '🧊' },
      { name: 'Ghee', icon: '🫕' },
      { name: 'Khoya', icon: '🥛' },
    ],
    products: [
      {
        id: 1,
        name: 'Fresh Milk',
        image: '/images/categories/dairy.jpg',
        weight: '1 L',
        baseWeight: '1 L',
        pricingTiers: [
          { quantity: '10 L+', price: '₹58/L', addQuantity: 10 },
          { quantity: '5 L+', price: '₹60/L', addQuantity: 5 }
        ],
        basePrice: '62'
      },
    ]
  },
  'cleaning-supplies': {
    name: 'Cleaning Supplies',
    quickFilters: ['Brand', 'Category', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Detergents', icon: '🧼' },
      { name: 'Sanitizers', icon: '🧴' },
      { name: 'Equipment', icon: '🧹' },
      { name: 'Tools', icon: '🧽' },
    ],
    products: [
      {
        id: 1,
        name: 'Surface Sanitizer',
        image: '/images/categories/cleaning.jpg',
        weight: '5 L',
        baseWeight: '5 L',
        pricingTiers: [
          { quantity: '20 L+', price: '₹180/L', addQuantity: 4 },
          { quantity: '10 L+', price: '₹190/L', addQuantity: 2 }
        ],
        basePrice: '1000'
      }
    ]
  },
  'edible-oils': {
    name: 'Edible Oils',
    quickFilters: ['Brand', 'Oil Type', 'Size', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Sunflower Oil', icon: '🌻' },
      { name: 'Soyabean Oil', icon: '🫘' },
      { name: 'Mustard Oil', icon: '🌱' },
      { name: 'Vanaspati', icon: '🥄' },
      { name: 'Palm Oil', icon: '🌴' },
      { name: 'Cottonseed Oil', icon: '🌿' },
    ],
    products: [
      {
        id: 1,
        name: 'Refined Sunflower Oil',
        image: '/images/categories/oils.jpg',
        weight: '15 L',
        baseWeight: '15 L',
        pricingTiers: [
          { quantity: '45 L+', price: '₹150/L', addQuantity: 3 },
          { quantity: '30 L+', price: '₹155/L', addQuantity: 2 }
        ],
        basePrice: '2400'
      }
    ]
  },
  'bakery-chocolates': {
    name: 'Bakery & Chocolates',
    quickFilters: ['Brand', 'Category', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Honey & Spreads', icon: '🍯' },
      { name: 'Chocolates', icon: '🍫' },
      { name: 'Cake Decorations', icon: '🎂' },
      { name: 'Food Colors', icon: '🎨' },
      { name: 'Bakery Ingredients', icon: '🥖' },
      { name: 'Bread & Buns', icon: '🍞' },
    ],
    products: [
      {
        id: 1,
        name: 'Dark Compound Chocolate',
        image: '/images/categories/bakery.jpg',
        weight: '1 kg',
        baseWeight: '1 kg',
        pricingTiers: [
          { quantity: '5 kg+', price: '₹280/kg', addQuantity: 5 },
          { quantity: '3 kg+', price: '₹290/kg', addQuantity: 3 }
        ],
        basePrice: '300'
      }
    ]
  },
  'sauces-seasoning': {
    name: 'Sauces & Seasoning',
    quickFilters: ['Brand', 'Sauces', 'Seasonings', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Cooking Sauces', icon: '🥫' },
      { name: 'Dips & Spreads', icon: '🥗' },
      { name: 'Seasonings', icon: '🧂' },
      { name: 'Vinegar', icon: '🍶' },
      { name: 'Chinese Sauces', icon: '🥢' },
    ],
    products: [
      {
        id: 1,
        name: 'Soy Sauce',
        image: '/images/categories/sauces.jpg',
        weight: '750 ml',
        baseWeight: '750 ml',
        pricingTiers: [
          { quantity: '5 L+', price: '₹180/L', addQuantity: 7 },
          { quantity: '3 L+', price: '₹190/L', addQuantity: 4 }
        ],
        basePrice: '150'
      },
    ]
  },
  'canned-imported-items': {
    name: 'Canned & Imported Items',
    quickFilters: ['Brand', 'Origin', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Canned Foods', icon: '🥫' },
      { name: 'Pasta & Noodles', icon: '🍝' },
      { name: 'Olives & Pickles', icon: '🫒' },
      { name: 'International Foods', icon: '🌎' },
    ],
    products: [
      {
        id: 1,
        name: 'Green Olives',
        image: '/images/categories/canned-imported.jpg',
        weight: '500 g',
        baseWeight: '500 g',
        pricingTiers: [
          { quantity: '2 kg+', price: '₹450/kg', addQuantity: 4 },
          { quantity: '1 kg+', price: '₹480/kg', addQuantity: 2 }
        ],
        basePrice: '250'
      },
    ]
  },
  'packaging': {
    name: 'Packaging',
    quickFilters: ['Brand', 'Material', 'Size', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Containers', icon: '📦' },
      { name: 'Bags', icon: '🛍️' },
      { name: 'Disposables', icon: '🥡' },
      { name: 'Food Wraps', icon: '🗞️' },
    ],
    products: [
      {
        id: 1,
        name: 'Food Containers',
        image: '/images/categories/packaging.jpg',
        weight: '50 pcs',
        baseWeight: '50 pcs',
        pricingTiers: [
          { quantity: '200 pcs+', price: '₹8/pc', addQuantity: 200 },
          { quantity: '100 pcs+', price: '₹9/pc', addQuantity: 100 }
        ],
        basePrice: '500'
      },
    ]
  },
  'kitchen-equipment': {
    name: 'Kitchen Equipment',
    quickFilters: ['Brand', 'Category', 'Price Range', 'Type'],
    subcategories: [
      { name: 'All', icon: '🔍' },
      { name: 'Utensils', icon: '🍳' },
      { name: 'Appliances', icon: '⚡' },
      { name: 'Tools', icon: '🔧' },
      { name: 'Storage', icon: '🗄️' },
    ],
    products: [
      {
        id: 1,
        name: 'Steel Utensils Set',
        image: '/images/categories/kitchen-equipment.jpg',
        weight: '5 pcs',
        baseWeight: '5 pcs',
        pricingTiers: [
          { quantity: '3 sets+', price: '₹1800/set', addQuantity: 3 },
          { quantity: '2 sets+', price: '₹1900/set', addQuantity: 2 }
        ],
        basePrice: '2000'
      },
    ]
  }
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categoryProducts[slug as keyof typeof categoryProducts];
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Navigation */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container-custom relative py-4">
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            <button className="flex-none">
              <ChevronLeftIcon className="w-6 h-6 text-gray-400" />
            </button>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(/[&,\s]+/g, '-')}`}
                className={`flex-none text-sm ${
                  cat === category.name ? 'text-primary-600 font-medium' : 'text-gray-600'
                }`}
              >
                {cat}
              </Link>
            ))}
            <button className="flex-none">
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="bg-white border-b">
        <div className="container-custom py-3">
          <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
            {category.quickFilters.map((filter) => (
              <button
                key={filter}
                className="flex items-center px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-primary-50"
              >
                {filter}
                {filter === 'Brand' || filter === 'Type' ? (
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        {/* Subcategories */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 mb-8">
          {category.subcategories.map((subcat) => (
            <button
              key={subcat.name}
              onClick={() => setSelectedSubcategory(subcat.name)}
              className={`flex flex-col items-center p-3 rounded-lg ${
                selectedSubcategory === subcat.name
                  ? 'bg-primary-50 text-primary-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mb-2">{subcat.icon}</span>
              <span className="text-xs text-center">{subcat.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-4 border border-gray-100 hover:border-primary-100">
              <div className="flex">
                <div className="relative w-24 h-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.weight}</p>
                  {product.pricingTiers.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center mt-2">
                      <div className="text-sm">
                        <span className="text-primary-600">{tier.price}</span>
                        <span className="text-gray-500 ml-1">for {tier.quantity}</span>
                      </div>
                      <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                        Add {tier.addQuantity}
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-medium">₹{product.basePrice}</span>
                    <button className="px-6 py-1.5 bg-white border border-primary-600 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors">
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}