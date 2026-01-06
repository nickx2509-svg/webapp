"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { IndianRupee, Minus, PlusIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { addToCart, increaseQty, decreaseQty } from "@/redux/cartSlice"
import mongoose from "mongoose"

interface ItemsI {
  _id?: mongoose.Types.ObjectId
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
  const dispatch = useDispatch<AppDispatch>()
  const { cartData } = useSelector((state: RootState) => state.cart)

  const cartItem = cartData.find(i => i._id == items._id)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition w-[260px] p-2 flex gap-2"
    >
      {/* Image */}
      <div className="relative w-24 h-24 rounded-lg flex items-center justify-center shrink-0">
        <Image
          src={items.image}
          alt={items.name}
          fill
          className="object-contain p-2"
        />
        <span className="absolute top-1 left-1 text-[9px] font-bold bg-white/90 px-1 rounded text-purple-600">
          ⚡ 10m
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <p className="text-[9px] font-bold text-purple-600 uppercase">
            {items.category || "Fresh"}
          </p>

          <h3 className="text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2">
            {items.name}
          </h3>

          <p className="text-[11px] text-gray-500">{items.unit}</p>
        </div>

        {/* Price + Action */}
        <div className="flex items-center justify-between mt-1">
          <div>
            <div className="flex items-center text-sm font-extrabold text-gray-900">
              <IndianRupee className="w-3 h-3 stroke-[3]" />
              {items.price}
            </div>
            <span className="text-[10px] text-gray-400 line-through">
              ₹{items.price + 12}
            </span>
          </div>

          {/* Cart Actions */}
          {!cartItem ? (
            <button
              className="border border-purple-300 text-purple-600 text-[11px] font-bold px-3 py-1 rounded-lg hover:bg-purple-600 hover:text-white transition active:scale-95"
              onClick={() =>
                dispatch(addToCart({ ...items, quantity: 1 }))
              }
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-purple-600 text-white rounded-lg px-2 py-1 gap-2">
              <button
                onClick={() => dispatch(decreaseQty(String(cartItem._id)))}
                className="active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className="text-xs font-bold">
                {cartItem.quantity}
              </span>

              <button
                onClick={() => dispatch(increaseQty(String(cartItem._id)))}
                className="active:scale-90"
              >
                <PlusIcon className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default GroceryCart
