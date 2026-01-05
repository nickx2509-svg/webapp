"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { IndianRupee, Plus } from "lucide-react"

interface ItemsI {
  name: string
  category: string
  price: number
  image: string
  unit: string
}

type GroceryCartProps = {
  items: ItemsI
}

function GroceryCart({ items }: GroceryCartProps) {
  return (
    <motion.div
      whileHover={{ y: -4, shadow: "0 12px 20px -5px rgba(0,0,0,0.08)" }}
      className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 w-[280px] sm:w-[320px] flex h-[160px] overflow-hidden p-2"
    >
      {/* Left Side: Square Product Image */}
      <div className="relative w-32 h-full bg-white rounded-xl flex-shrink-0 flex items-center justify-center border border-gray-50">
        <Image
          src={items.image}
          alt={items.name}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Subtle Timer Badge */}
        <div className="absolute top-1 left-1 bg-white/80 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-gray-100 shadow-xs">
          <p className="text-[9px] font-bold text-gray-700 flex items-center gap-0.5">
            <span className="text-purple-600">⚡</span> 10m
          </p>
        </div>
      </div>

      {/* Right Side: Content Area */}
      <div className="flex flex-col flex-grow pl-3 pr-1 py-1 justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[9px] font-extrabold text-purple-600 uppercase tracking-wider">
            {items.category || "Fresh"}
          </span>

          {/* Product Name */}
          <h3 className="text-[14px] font-bold text-gray-900 leading-tight line-clamp-2 mt-0.5">
            {items.name}
          </h3>

          {/* Unit */}
          <p className="text-[11px] text-gray-500 font-semibold mt-1">
            {items.unit}
          </p>
        </div>

        {/* Bottom Row: Price & Add Button */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center text-base font-black text-gray-900">
              <IndianRupee className="w-3.5 h-3.5 stroke-[3]" />
              <span>{items.price}</span>
            </div>
            {/* Discounted price */}
            <span className="text-[10px] text-gray-400 line-through">₹{items.price + 12}</span>
          </div>

          {/* Zepto-style Wide Add Button */}
          <button className="flex items-center justify-center gap-1 bg-white border border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white transition-all px-4 py-1.5 rounded-xl font-bold text-[12px] shadow-sm active:scale-95">
            ADD
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default GroceryCart