'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiClock, FiPackage, FiCalendar, FiPercent, FiZap, FiCheckCircle, FiShield } from 'react-icons/fi';

const deliveryModels = [
  {
    title: "Wholesale Next Day",
    description: "Perfect for planned purchases and bulk orders",
    icon: <FiTruck className="w-8 h-8" />,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    features: [
      {
        icon: <FiCalendar className="w-5 h-5" />,
        text: "Next day delivery guaranteed"
      },
      {
        icon: <FiPackage className="w-5 h-5" />,
        text: "Bulk ordering available"
      },
      {
        icon: <FiPercent className="w-5 h-5" />,
        text: "Wholesale pricing"
      },
      {
        icon: <FiCheckCircle className="w-5 h-5" />,
        text: "Quality assurance"
      }
    ]
  },
  {
    title: "Express Delivery",
    description: "For urgent requirements and same-day needs",
    icon: <FiZap className="w-8 h-8" />,
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    features: [
      {
        icon: <FiClock className="w-5 h-5" />,
        text: "Delivery within 4-6 hours"
      },
      {
        icon: <FiShield className="w-5 h-5" />,
        text: "Priority handling"
      },
      {
        icon: <FiTruck className="w-5 h-5" />,
        text: "Live tracking"
      },
      {
        icon: <FiCheckCircle className="w-5 h-5" />,
        text: "Dedicated support"
      }
    ]
  }
];

export default function DeliveryModelsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Delivery Model</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the delivery option that best suits your business needs, from cost-effective bulk orders to urgent express delivery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {deliveryModels.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className={`p-8 ${model.color}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center ${model.iconColor}`}>
                    {model.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{model.title}</h3>
                    <p className="text-gray-600">{model.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-6">
                  {model.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`${model.iconColor}`}>
                        {feature.icon}
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold text-white 
                    ${index === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700'}
                    transition-colors duration-200`}
                >
                  Choose {model.title}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Need a custom delivery solution?{' '}
            <button className="text-primary-600 font-semibold hover:underline">
              Contact our team
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}