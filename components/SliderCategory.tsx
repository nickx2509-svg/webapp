"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ShoppingBasket,
  Carrot,
  Milk,
  Cookie,
  Coffee,
  IceCream,
  Pizza,
  Shirt,
  Smartphone,
  ChevronLeft,
  ChevronRight,
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
    name: "Bakery & Biscuits",
    icon: Pizza,
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Tea, Coffee & More",
    icon: Coffee,
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Fashion & Clothing",
    icon: Shirt,
    color: "bg-pink-100 text-pink-700",
  },
  {
    name: "Electronics & Gadgets",
    icon: Smartphone,
    color: "bg-slate-100 text-slate-700",
  },
]

function SliderCategory() {
  const sliderRef = useRef<HTMLDivElement | null>(null)

  // manual scroll
  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -200, behavior: "smooth" })
  }

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 200, behavior: "smooth" })
  }

  // auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!sliderRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        // go back to start
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        sliderRef.current.scrollBy({ left: 200, behavior: "smooth" })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3 mb-10">
          <span className="bg-purple-600 p-3 rounded-xl shadow-md">
            <ShoppingBasket className="text-white w-6 h-6" />
          </span>
          Shop By Category
        </h2>

        {/* Mobile buttons */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <button onClick={scrollLeft} className="p-2 rounded-full bg-gray-100">
            <ChevronLeft />
          </button>
          <button onClick={scrollRight} className="p-2 rounded-full bg-gray-100">
            <ChevronRight />
          </button>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="
            flex gap-6
            overflow-x-auto
            scroll-smooth
            md:justify-center
            md:overflow-visible
            scrollbar-hide
          "
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="flex-shrink-0 cursor-pointer"
              >
                <div
                  className={`w-36 h-36 md:w-40 md:h-40 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-sm ${cat.color}`}
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
      </div>
    </motion.section>
  )
}

export default SliderCategory
