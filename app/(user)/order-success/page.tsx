"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { BoxIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function OrderSuccess() {
  // 🔥 DELETE COOKIE ON FIRST LOAD (ONE-TIME ACCESS)
  useEffect(() => {
    document.cookie =
      "order_success=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center min-h-screen bg-linear-to-b from-purple-100 to-purple-200 flex-col justify-center"
    >
      {/* Image */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        <Image
          src="/image.png"
          alt="Order Success"
          width={150}
          height={150}
          className="mx-auto mt-10"
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl font-bold text-purple-700 mt-7"
      >
        Order Placed Successfully!
      </motion.h1>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-purple-600 mt-4 max-w-md"
      >
        Thank you for your order. Your delicious food is being prepared and will
        be delivered to you soon.
      </motion.p>

      {/* Icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <BoxIcon className="mt-8 text-purple-600" size={60} />
      </motion.div>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10"
      >
        <Link
          href="/my-order"
          className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
        >
          Go to my order
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default OrderSuccess;
