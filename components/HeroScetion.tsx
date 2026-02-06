"use client";

import { motion, AnimatePresence } from "motion/react";
import { Leaf, Shirt, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getSocket } from "@/lib/socket";

function HeroScetion() {
  useEffect(() => {
    const socket = getSocket();
  }, []);

  const slides = [
    {
      id: 1,
      icon: Leaf,
      title: "Groceries in Minutes",
      subtitle: "Fresh fruits & vegetables at lightning speed",
      btnText: "Order Groceries",
      bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 2,
      icon: Shirt,
      title: "Fashion Delivered Fast",
      subtitle: "Trending styles at your doorstep",
      btnText: "Shop Fashion",
      bg: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 3,
      icon: Smartphone,
      title: "Latest Tech Deals",
      subtitle: "Premium gadgets with instant delivery",
      btnText: "Buy Electronics",
      bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const Icon = slides[current].icon;

  return (
    <div className="relative w-[98%] mx-auto mt-32 h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={slides[current].bg}
            alt={slides[current].title}
            fill
            priority
            className="object-cover"
          />

          {/* PURPLE OVERLAY */}
          <div className="absolute inset-0 bg-purple-950/20" />

          {/* CENTER CONTENT */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-white max-w-2xl"
            >
              <Icon className="w-12 h-12 mx-auto mb-4 text-purple-300" />

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                {slides[current].title}
              </h1>

              <p className="mt-4 text-lg md:text-xl text-purple-100">
                {slides[current].subtitle}
              </p>

              {/* Motion Button */}
              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 35px rgba(168, 85, 247, 0.9)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative mt-8 px-12 py-4 rounded-full 
                           bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700
                           text-white font-semibold text-lg overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full bg-purple-400/40 blur-xl opacity-0 hover:opacity-100 transition" />
                <span className="relative z-10">{slides[current].btnText}</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🔘 BOTTOM CENTER DOT INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            className="relative"
            whileHover={{ scale: 1.2 }}
          >
            <span
              className={`block h-5 w-5 rounded-full transition-all duration-300
                ${
                  current === index
                    ? "w-8 bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.9)]"
                    : "w-2.5 bg-white/50"
                }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default HeroScetion;
