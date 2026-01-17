'use client'
import React, { useEffect, useState } from 'react'
import { MapPin, Phone, User, Home, Code, LocateFixedIcon, LocateIcon, CreditCard, WalletCards, IndianRupee, Truck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import dynamic from 'next/dynamic'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/149/149059.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})

export default function CheckOut() {
  const { userData } = useSelector((state: RootState) => state.user)
  const { subTotal,deliveryFee,finalTotal } = useSelector((state: RootState) => state.cart)

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  })

  const [position, setPosition] = useState<[number, number] | null>(null)
  const [payment,setPayment] = useState<"cod" | "online">("cod")

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords
        setPosition([latitude, longitude])
      }, (err) => console.log("location error", err), { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 })
    }
  }, [])

  useEffect(() => {
    if (userData) {
      setAddress((prev) => ({
        ...prev,
        fullName: userData?.data?.name || "",
        mobile: userData?.data?.mobile || ""
      }))
    }
  }, [userData])

  useEffect(() => {
    console.log('position:', position)
  }, [position])

  useEffect(() => {
    const fetchAdress = async () => {
      if (!position) return

      try {
        const result = await axios.get(
          `/api/reverse?lat=${position[0]}&lon=${position[1]}`
        )
        const add = result.data.address
        setAddress(prev => ({
          ...prev,
          state: add.state,
          city: add.state_district || add.city,
          pincode: add.postcode,
          fullAddress: result.data.display_name
        }))
        console.log("Position is", result.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAdress()
  }, [position])

  return (
    <div className="min-h-screen bg-purple-50 p-4 sm:p-12">
      <h1 className='text-center text-5xl text-purple-500 mb-5 font-bold'>Check Out</h1>
      <div className='grid md:grid-cols-2 gap-8' >

      
      <div className="max-w-2xl mx-auto lg:ml-0 bg-white p-8 rounded-[32px] shadow-sm">
        <h2 className="flex items-center gap-2 font-black text-gray-900 uppercase tracking-tight mb-8 text-xl">
          <MapPin size={24} className="text-purple-600" /> Delivery Address
        </h2>

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                onChange={(e) => setAddress((prev) => ({ ...prev, fullName: e.target.value }))}
                value={address.fullName}
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-gray-100 border-transparent rounded-2xl outline-none"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                onChange={(e) => setAddress((prev) => ({ ...prev, mobile: e.target.value }))}
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
              onChange={(e) => setAddress((prev) => ({ ...prev, fullAddress: e.target.value }))}
              value={address.fullAddress}
              placeholder="Full Address (House No, Building, Area)"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 h-28 resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Pincode */}
            <div className="relative">
              <Code className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                value={address.pincode}
                type="text"
                placeholder="Pincode"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* City */}
            <div className="relative">
              <LocateFixedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                value={address.city}
                type="text"
                placeholder="City"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* State */}
            <div className="relative">
              <LocateIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))}
                value={address.state}
                type="text"
                placeholder="State"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {
            position && <MapContainer
              center={position as LatLngExpression}
              zoom={13}
              style={{ height: '400px', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />
              <Marker position={position} draggable={false} icon={markerIcon} />
            </MapContainer>
          }

        </form>
      </div>
      <div className="lg:ml-0 bg-white p-8 rounded-[32px] shadow-sm flex flex-col">
  <h1 className="text-3xl text-gray-800 mb-4 flex items-center gap-2">
    <CreditCard className="text-purple-600" size={25} />
    Payment Method
  </h1>

  <div className="mb-6 flex flex-col space-y-6">
    <button onClick={() => setPayment("online")}
      className={`flex items-center border border-purple-100  gap-3 w-full  rounded-lg p-3 transition-all ${
        payment === "online"
          ? "border-purple-600 bg-purple-100 shadow-sm"
          : "hover:bg-gray-100"
      }`}
    >
      <WalletCards className='text-purple-500' size={20} />
      <span>Pay Online</span>
    </button>

    <button onClick={() => setPayment("cod")}
      className={`flex items-center border border-purple-100 gap-3 w-full  rounded-lg p-3 transition-all ${
        payment === "cod"
          ? "border-purple-600 bg-purple-100 shadow-sm"
          : "hover:bg-gray-100"
      }`}
    >
      <Truck className='text-purple-500' size={20} />
      <span>cash on delivery</span>
    </button>
 <div className='space-y-4 text-sm'>
                 <div className='flex justify-between text-gray-500'>
                   <span>Subtotal</span>
                   <span className='flex items-center font-semibold text-gray-800'>
                     <IndianRupee size={12} /> {subTotal}
                   </span>
                 </div>
                 <div className='flex justify-between text-gray-500'>
                   <span>Delivery Fee</span>
                   <span className='flex items-center font-semibold text-green-600'>
                     {deliveryFee === 0 ? 'FREE' : <><IndianRupee size={12} /> {deliveryFee}</>}
                   </span>
                 </div>
                 
                 <div className='border-t border-gray-100 pt-4 mt-4'>
                   <div className='flex justify-between items-end'>
                     <span className='text-base font-bold text-gray-800'>Total Amount</span>
                     <span className='text-2xl font-black text-purple-600 flex items-center'>
                       <IndianRupee size={20} /> {finalTotal}
                     </span>
                   </div>
                 </div>

                
       

  </div>


</div>

    </div>
    </div>
    </div>
  )
}