"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  ShoppingBasket,
  Carrot,
  Milk,
  Cookie,
  Coffee,
  IceCream,
  Pizza,
} from "lucide-react"

const categories = [
  {
    name: "Vegetables & Fruits",
    icon: Carrot,
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Dairy, Bread & Eggs",
    icon: Milk,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Cold Drinks & Juices",
    icon: IceCream,
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Snacks & Munchies",
    icon: Cookie,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Bakery & Biscuits",
    icon: Pizza,
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Tea, Coffee & More",
    icon: Coffee,
    color: "bg-purple-100 text-purple-700",
  },
]

function SliderCategory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Centered Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3 mb-12">
          <span className="bg-purple-600 p-3 rounded-xl shadow-md">
            <ShoppingBasket className="text-white w-6 h-6" />
          </span>
          Shop By Category
        </h2>

        {/* Centered Grid / Slider */}
        <motion.div
          className="flex justify-center"
          drag="x"
          dragConstraints={{ left: -300, right: 0 }}
        >
          <div className="flex gap-6">
            {categories.map((cat, index) => {
              const Icon = cat.icon

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="cursor-pointer"
                >
                  <div
                    className={`w-36 h-36 md:w-40 md:h-40 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-sm transition-all ${cat.color}`}
                  >
                    <Icon className="w-10 h-10" />
                    <p className="text-sm font-semibold text-center px-2">
                      {cat.name}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default SliderCategory
