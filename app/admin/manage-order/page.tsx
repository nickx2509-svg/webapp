"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Package,
  User,
  MapPin,
  Phone,
  CheckCircle,
  Truck,
  Clock,
  ChevronDown,
  Loader2,
} from "lucide-react";

export interface orderI {
  _id: string;
  user: any;
  groceery: any[];
  totalAmount: string;
  isPaid?: string;
  paymentType: string;
  address: any;
  status: "pending" | "out of delivered" | "delivered";
  createdAt?: string;
}

function ManageOrder() {
  const [orders, setOrders] = useState<orderI[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const getOrders = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/admin/admin-order");
      const fetchedOrders =
        result.data.orders || result.data.order || result.data.data || [];
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("API Error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      // Ensure you have this PATCH/PUT route created in your API
      await axios.patch("/api/admin/update-status", {
        orderId,
        status: newStatus,
      });

      // Update local state so UI changes immediately
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus as any }
            : order,
        ),
      );
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    getOrders();
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
    <div className="bg-purple-50 min-h-screen w-full pb-20">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Manage Orders
            </h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Dashboard
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border-2 border-purple-200 font-bold text-purple-600 text-xl">
            {orders.length} Total
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-purple-700" size={40} />
            <p className="mt-4 text-slate-500 font-medium">
              Fetching orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-16 rounded-[40px] border-2 border-dashed border-slate-200 text-center">
            <Package className="mx-auto text-slate-200 mb-4" size={80} />
            <h2 className="text-2xl font-bold text-slate-400">
              No Orders Found
            </h2>
            <button
              onClick={getOrders}
              className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              Refresh Data
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-[32px] border border-slate-100 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row"
              >
                {/* Left Section: Order Content */}
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-mono font-bold">
                        ID: {order._id.slice(-8)}
                      </span>
                      <div className="flex items-center gap-2 mt-2 text-slate-400 text-xs">
                        <Clock size={14} />
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "N/A"}
                      </div>
                    </div>
                    <div
                      className={`px-4 py-1.5 rounded-full text-xs font-black uppercase border-2 ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.groceery?.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                            {item.quantity}
                          </div>
                          <span className="font-bold text-slate-700">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-black text-slate-900">
                          ₹{item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-dashed border-slate-200 flex justify-end">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                        Amount to Collect
                      </p>
                      <p className="text-3xl font-black text-purple-600 tracking-tighter">
                        ₹{order.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section: Actions & Customer */}
                <div className="bg-slate-50/80 p-8 w-full md:w-80 border-l border-slate-100 flex flex-col justify-between">
                  <div className="space-y-5">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Customer Detail
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                        <User size={18} className="text-purple-600" />
                        <p className="font-bold text-sm text-slate-800">
                          {order.address?.fullName}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                        <Phone size={18} className="text-purple-600" />
                        <p className="text-sm font-bold text-slate-600">
                          {order.address?.mobile}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 🟢 DROPDOWN & STATUS CHANGE SECTION */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-3">
                      Update Order Status
                    </p>
                    <div className="relative group">
                      <select
                        disabled={updatingId === order._id}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`w-full appearance-none bg-white border-2 border-slate-200 text-slate-700 py-3 px-4 pr-10 rounded-2xl font-bold text-sm focus:outline-none focus:border-purple-500 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="pending">🟡 Pending</option>
                        <option value="out of delivered">
                          🔵 Out for Delivery
                        </option>
                        <option value="delivered">🟢 Delivered</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                        {updatingId === order._id ? (
                          <Loader2
                            size={18}
                            className="animate-spin text-purple-600"
                          />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageOrder;
