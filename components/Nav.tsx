"use client"

import React, { useState, useRef, useEffect } from "react"
import { Document } from "mongoose"
import Link from "next/link"
import { Search, ShoppingCart, User, Package2Icon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { signOut } from "next-auth/react"

interface UserI extends Document {
  name: string
  email: string
  password?: string
  mobile?: string
  role: "user" | "deliveryBoy" | "admin"
  image?: string
}

function Nav({ user }: { user: UserI }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const Avatar = ({ size = 44 }: { size?: number }) =>
    user.image ? (
      <Image
        src={user.image}
        alt={user.name}
        width={size}
        height={size}
        className="object-cover"
      />
    ) : (
      <User className="w-5 h-5 text-purple-600" />
    )

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl h-20 px-6 flex items-center justify-between bg-purple-400 rounded-2xl shadow-xl shadow-white/20">
      
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-purple-900">
        Zepto
      </Link>

      {/* Search */}
      <form className="flex items-center gap-3 w-full max-w-lg bg-white px-5 py-2 rounded-full shadow-md">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          className="w-full text-sm outline-none placeholder-gray-400"
          placeholder="Enter grocery"
        />
      </form>

      {/* Cart + Profile */}
      <div className="flex items-center gap-4">
        
        {/* Cart */}
        <Link
          href="/"
          className="relative w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-md hover:scale-105 transition"
        >
          <ShoppingCart className="w-5 h-5 text-purple-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center rounded-full bg-purple-600 text-white">
            0
          </span>
        </Link>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((p) => !p)}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden"
          >
            <Avatar />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-60 rounded-2xl bg-white shadow-xl p-3"
              >
                {/* User Info */}
                <div className="flex flex-col items-center gap-2 border-b pb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                    <Avatar size={48} />
                  </div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>

                {/* Actions */}
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 mt-2 rounded-lg hover:bg-purple-50 transition"
                >
                  <Package2Icon className="w-4 h-4" />
                  My Orders
                </Link>

                <button
                  onClick={() => {
                    setOpen(false)
                    signOut({ callbackUrl: "/login" })
                  }}
                  className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-50 text-red-600 transition cursor-pointer"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Nav
