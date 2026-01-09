'use client'
import React, { useState } from 'react'
import { MapPin, Phone, User, Home, Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function CheckOut() {
  // Get data directly from Redux
  const { userData } = useSelector((state: RootState) => state.user)

  // Only use state for fields the user actually needs to type in
  const [address, setAddress] = useState({
    fullName:userData?.data?.name,
    mobile:userData?.data?.mobile,
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  })

  return (
    <div className="min-h-screen bg-purple-50 p-4 sm:p-12">
      <div className="max-w-2xl mx-auto lg:ml-0 bg-white p-8 rounded-[32px] shadow-sm">
        <h2 className="flex items-center gap-2 font-black text-gray-900 uppercase tracking-tight mb-8 text-xl">
          <MapPin size={24} className="text-purple-600" /> Delivery Address
        </h2>

        <form className="space-y-5">
          {/* Use userData directly in the value. If it's empty, show "" */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                readOnly
                value={address.fullName} 
                type="text" 
                placeholder="Full Name" 
                className="w-full pl-12 pr-4 py-4 bg-gray-100 border-transparent rounded-2xl outline-none" 
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                readOnly 
                value={address.mobile} 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full pl-12 pr-4 py-4 bg-gray-100 border-transparent rounded-2xl outline-none" 
              />
            </div>
          </div>

          <div className="relative">
            <Home className="absolute left-4 top-5 text-gray-400" size={18} />
            <textarea 
              placeholder="Full Address (House No, Building, Area)" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 h-28 resize-none" 
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Pincode" className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="text" placeholder="City" className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="text" placeholder="State" className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div className='flex flex-row gap-2'>
            <input type="text" placeholder="Search City" className="w-full px-8 py-3 bg-gray-50 border-transparent rounded-xl outline-none focus:ring-2 focus:ring-purple-500" />          
            <button type="button" className='bg-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-700 transition-all'>
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}