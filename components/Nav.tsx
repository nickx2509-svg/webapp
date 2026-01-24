"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Document } from "mongoose";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Package2Icon,
  LogOutIcon,
  PlusCircle,
  LayoutDashboard,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion"; // Note: Changed to framer-motion as it's the standard package name
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface UserI extends Document {
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}

function Nav({ user }: { user: UserI }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { cartData } = useSelector((state: RootState) => state.cart);

  // Ensure portal only renders on the client
  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Optimized Logout Handler to solve the JSON error
  const handleLogout = async () => {
    setOpen(false);
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };

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
    );

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl h-16 md:h-20 px-4 md:px-6 flex items-center justify-between bg-purple-400 rounded-2xl shadow-xl shadow-white/20">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl md:text-2xl font-bold text-purple-900 shrink-0"
      >
        Zepto
      </Link>

      {/* Search (user only) */}
      {user.role === "user" && (
        <div className="flex-1 px-2 md:px-6">
          <form className="flex items-center gap-2 md:gap-3 w-full max-w-lg mx-auto bg-white px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow-md">
            <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
            <input
              className="w-full text-xs md:text-sm outline-none placeholder-gray-400"
              placeholder="Search..."
            />
          </form>
        </div>
      )}

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* User Cart */}
        {user.role === "user" && (
          <Link
            href="/cart"
            className="relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-white rounded-full shadow-md hover:scale-105 transition"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 text-[10px] md:text-xs flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
              {cartData.length}
            </span>
          </Link>
        )}

        {/* ADMIN ACTIONS (Desktop Only) */}
        {user.role === "admin" && (
          <div className="hidden lg:flex items-center gap-2 bg-purple-500/20 px-2 py-1.5 rounded-full border border-white/20">
            <Link
              href="/admin/add-grocery"
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-full bg-white text-purple-700 hover:bg-purple-50 transition uppercase tracking-tighter"
            >
              <PlusCircle className="w-3 h-3" /> Add
            </Link>
            <Link
              href="/admin/add-grocery"
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-full bg-white text-purple-700 hover:bg-purple-50 transition uppercase tracking-tighter"
            >
              <ClipboardList className="w-3 h-3" /> View
            </Link>
            <Link
              href="/admin/manage-order"
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-full bg-purple-800 text-white hover:bg-purple-900 transition uppercase tracking-tighter"
            >
              <LayoutDashboard className="w-3 h-3" /> Orders
            </Link>
          </div>
        )}

        {/* Profile Button */}
        <button
          ref={buttonRef}
          onClick={() => setOpen((p) => !p)}
          className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-purple-200 transition relative"
        >
          {open ? (
            <X className="w-5 h-5 text-purple-600" />
          ) : user.role === "admin" ? (
            <Menu className="w-5 h-5 text-purple-600 lg:hidden" />
          ) : null}
          <div
            className={
              open
                ? "hidden"
                : user.role === "admin"
                  ? "hidden lg:block"
                  : "block"
            }
          >
            <Avatar />
          </div>
        </button>

        {/* PORTAL FOR DROPDOWN */}
        {mounted &&
          createPortal(
            <AnimatePresence>
              {open && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  style={{
                    position: "fixed",
                    top: "90px",
                    right: "5%",
                    zIndex: 9999,
                  }}
                  className="w-64 md:w-72 rounded-3xl bg-white shadow-2xl p-4 border border-purple-100"
                >
                  {/* User Header */}
                  <div className="flex flex-col items-center gap-2 border-b border-gray-50 pb-4 mb-3">
                    <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center overflow-hidden ring-4 ring-purple-50">
                      <Avatar size={56} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-800 text-lg">
                        {user.name}
                      </p>
                      <span className="text-[10px] bg-purple-600 text-white px-3 py-0.5 rounded-full font-black uppercase tracking-widest">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Admin Menu */}
                  {user.role === "admin" && (
                    <div className="flex flex-col gap-1 lg:hidden border-b border-gray-50 pb-3 mb-3">
                      <p className="text-[10px] font-bold text-gray-400 px-3 uppercase mb-1">
                        Quick Actions
                      </p>
                      <Link
                        href="/admin/add-grocery"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-gray-700 transition"
                      >
                        <PlusCircle className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-semibold">
                          Add New Grocery
                        </span>
                      </Link>
                      <Link
                        href="/admin/groceries"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-gray-700 transition"
                      >
                        <ClipboardList className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-semibold">
                          Manage Inventory
                        </span>
                      </Link>
                      <Link
                        href="/admin/orders"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-gray-700 transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-semibold">
                          Admin Dashboard
                        </span>
                      </Link>
                    </div>
                  )}

                  {/* User Orders */}
                  {user.role !== "admin" && (
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-gray-700 transition mb-1"
                    >
                      <Package2Icon className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-semibold">My Orders</span>
                    </Link>
                  )}

                  {/* Logout - Fixed Logic */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-red-50 text-red-600 transition cursor-pointer border-none outline-none"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    <span className="text-sm font-semibold">Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </div>
  );
}

export default Nav;
