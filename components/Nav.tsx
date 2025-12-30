import React from "react"
import mongoose, { Document } from "mongoose"
import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"
import Image from "next/image"

interface UserI extends Document {
  name: string
  email: string
  password?: string
  mobile?: string
  role: "user" | "deliveryBoy" | "admin"
  image?: string
}

function Nav({ user }: { user: UserI }) {
  console.log("Naman Jain", user)

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-purple-400 rounded-2xl shadow-xl shadow-white/20 h-20 px-6 flex items-center justify-between">
      
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-purple-900 tracking-wide"
      >
        Zepto
      </Link>

      {/* Search */}
      <form className="flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-md w-full max-w-lg">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          className="w-full outline-none text-sm placeholder-gray-400"
          placeholder="Enter grocery"
        />
      </form>

      {/* Cart + Profile */}
      <div className="flex items-center gap-4">
        
        {/* Cart */}
        <Link
          href="/"
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-md hover:scale-105 transition"
        >
          <ShoppingCart className="w-5 h-5 text-purple-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
            0
          </span>
        </Link>

        {/* Profile */}
        <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={44}
              height={44}
              className="object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-purple-600" />
          )}
        </div>

      </div>
    </div>
  )
}

export default Nav
