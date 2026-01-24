"use client";

import { orderI } from "@/model/order.models";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Package, MapPin, ChevronRight, Clock } from "lucide-react"; // Install lucide-react

function MyOrder() {
  const [orders, setOrders] = useState<orderI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyOrder = async () => {
      try {
        const result = await axios.get("/api/order-get");
        let orderList: orderI[] = [];

        if (Array.isArray(result.data)) orderList = result.data;
        else if (Array.isArray(result.data.data)) orderList = result.data.data;
        else if (Array.isArray(result.data.orders))
          orderList = result.data.orders;

        setOrders(orderList);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyOrder();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "out of delivered":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Premium Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">My Orders</h1>
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
            {orders.length}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center pt-20 space-y-4">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
            <Package className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-2 text-slate-500">No orders found yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md"
            >
              {/* Order Header */}
              <div className="p-4 border-b border-slate-50 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Clock size={14} />
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "Date N/A"}
                  </div>
                  <p className="text-sm font-mono text-slate-600 mt-1">
                    #{order._id?.slice(-8)}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items List */}
              <div className="p-4 space-y-3">
                {order.groceery.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Package className="h-full w-full p-3 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.quantity} x {item.unit}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-slate-700">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer Info */}
              <div className="bg-slate-50/50 p-4 flex justify-between items-center">
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin size={14} />
                  <span className="text-xs truncate max-w-[150px]">
                    {order.address.city}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Total Amount</p>
                  <p className="text-lg font-bold text-purple-700">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrder;
