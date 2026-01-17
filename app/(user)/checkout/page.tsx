'use client'
import React, { useEffect, useState } from 'react'
import { MapPin, Phone, User, Home, Code, LocateFixedIcon, LocateIcon, CreditCard, WalletCards, IndianRupee, Truck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
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
  const { subTotal, deliveryFee, finalTotal, cartData } = useSelector((state: RootState) => state.cart)

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    fullAddress: "",
  })

  const [position, setPosition] = useState<[number, number] | null>(null)
  const [payment, setPayment] = useState<"cod" | "online">("cod")

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
    const fetchAdress = async () => {
      if (!position) return
      try {
        const result = await axios.get(`/api/reverse?lat=${position[0]}&lon=${position[1]}`)
        const add = result.data.address
        setAddress(prev => ({
          ...prev,
          state: add.state,
          city: add.state_district || add.city,
          pincode: add.postcode,
          fullAddress: result.data.display_name
        }))
      } catch (error) {
        console.log("Reverse Geocode Error:", error)
      }
    }
    fetchAdress()
  }, [position])

  const handleCod = async () => {
  if (!position) return;

  try {
    const result = await axios.post("/api/order", { // Using the URL that works for you
      userId: userData?.data._id,
      groceery: cartData.map((item) => ({ // CHANGE THIS FROM 'items' TO 'groceery'
        item: item._id, 
        name: item.name,
        unit: item.unit,
        quantity: item.quantity,
        price: item,
        image: item.image
      })),
      paymentType: "cod",
      totalAmount: finalTotal, // Use 'totalAmount' with an 'n'
      address: {               // Use 'address' with two 'd's
        fullName: address.fullName,
        mobile: address.mobile,
        city: address.city,
        pincode: Number(address.pincode),
        fullAddress: address.fullAddress,
        latitude: position[0],
        longitude: position[1],
      }
    });
    alert("Order Placed!");
    console.log(result.data)
  } catch (error) {
    console.log("Order Error:", error.response?.data || error);
  }
};
  const handleOnline = () => alert("Online payment integration coming soon!")

  return (
    <div className="min-h-screen bg-purple-50 p-4 sm:p-12">
      <h1 className='text-center text-5xl text-purple-500 mb-8 font-bold'>Check Out</h1>
      <div className='grid md:grid-cols-2 gap-8 max-w-7xl mx-auto'>
        <div className="bg-white p-8 rounded-[32px] shadow-sm">
          <h2 className="flex items-center gap-2 font-black text-gray-900 uppercase tracking-tight mb-8 text-xl">
            <MapPin size={24} className="text-purple-600" /> Delivery Address
          </h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  value={address.fullName}
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 border-transparent rounded-2xl outline-none"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
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
                onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
                value={address.fullAddress}
                placeholder="Full Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 h-28 resize-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <input onChange={(e) => setAddress({ ...address, pincode: e.target.value })} value={address.pincode} placeholder="Pincode" className="w-full px-4 py-4 bg-gray-50 rounded-2xl outline-none" />
              <input onChange={(e) => setAddress({ ...address, city: e.target.value })} value={address.city} placeholder="City" className="w-full px-4 py-4 bg-gray-50 rounded-2xl outline-none" />
              <input onChange={(e) => setAddress({ ...address, state: e.target.value })} value={address.state} placeholder="State" className="w-full px-4 py-4 bg-gray-50 rounded-2xl outline-none" />
            </div>
            {position && (
              <div className="rounded-2xl overflow-hidden h-64 border">
                <MapContainer center={position as LatLngExpression} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
                  <Marker position={position} icon={markerIcon} />
                </MapContainer>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><CreditCard className="text-purple-600" size={24} /> Payment Method</h2>
          <div className="space-y-4 mb-8">
            <button onClick={() => setPayment("online")} className={`flex items-center gap-3 w-full rounded-2xl p-4 border-2 transition-all ${payment === "online" ? "border-purple-600 bg-purple-50" : "border-gray-100"}`}>
              <WalletCards className='text-purple-500' /> Pay Online
            </button>
            <button onClick={() => setPayment("cod")} className={`flex items-center gap-3 w-full rounded-2xl p-4 border-2 transition-all ${payment === "cod" ? "border-purple-600 bg-purple-50" : "border-gray-100"}`}>
              <Truck className='text-purple-500' /> Cash on Delivery
            </button>
          </div>
          <div className='space-y-4 border-t pt-6'>
            <div className='flex justify-between text-gray-600'><span>Subtotal</span><span className='flex items-center font-bold'><IndianRupee size={14} />{subTotal}</span></div>
            <div className='flex justify-between text-gray-600'><span>Delivery Fee</span><span className='text-green-600 font-bold'>{deliveryFee === 0 ? "FREE" : deliveryFee}</span></div>
            <div className='flex justify-between items-center pt-4 border-t'><span className='text-xl font-bold'>Total</span><span className='text-3xl font-black text-purple-600 flex items-center'><IndianRupee size={24} />{finalTotal}</span></div>
          </div>
          <button onClick={payment === "cod" ? handleCod : handleOnline} className='w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-purple-200'>
            {payment === "cod" ? "Place Order" : "Proceed to Pay"}
          </button>
        </div>
      </div>
    </div>
  )
}