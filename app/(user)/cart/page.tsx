'use client'
import { ArrowLeft, IndianRupee, Minus, Plus, ShoppingBasket, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion' // Note: standard import is framer-motion
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import Image from 'next/image'
import { decreaseQty, increaseQty, removeFromCart } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation'

function Cart() {
  const { cartData, subTotal, finalTotal, deliveryFee } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()

  const naviagte = useRouter()

  return (
    <div className='max-w-6xl mx-auto px-4 py-10 min-h-screen'>
      {/* Header & Back Button */}
      <div className='flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4'>
        <Link 
          className='flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors' 
          href={"/"}
        >
          <ArrowLeft size={18} className='mr-2' />
          Back to Shop
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl font-extrabold text-gray-900'
        >
          Shopping Cart <span className='text-purple-600'>({cartData.length})</span>
        </motion.h1>
        <div className='w-20 hidden md:block'></div> {/* Spacer */}
      </div>

      {cartData.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className='text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200'
        >
          <ShoppingBasket className='w-16 h-16 text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-700'>Your cart is empty</h3>
          <p className='text-gray-500 mb-8'>Looks like you haven't added anything yet.</p>
          <Link href={"/"} className='bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-200'>
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          
          {/* Items List */}
          <div className='lg:col-span-2 space-y-4'>
            <AnimatePresence mode='popLayout'>
              {cartData.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className='flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
                >
                  <div className='relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0'>
                    <Image src={item.image} alt={item.name} fill className='object-contain p-2' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <h2 className='font-bold text-gray-800 truncate'>{item.name}</h2>
                    <p className='text-xs text-gray-400 mb-2'>{item.unit}</p>
                    <div className='flex items-center text-purple-600 font-bold'>
                      <IndianRupee size={14} />
                      <span>{item.price * item.quantity}</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className='flex items-center bg-gray-100 rounded-full p-1'>
                    <button 
                      onClick={() => dispatch(decreaseQty(item._id))}
                      className='p-1.5 hover:bg-white rounded-full transition-colors'
                    >
                      <Minus size={14} />
                    </button>
                    <span className='w-8 text-center font-semibold text-sm'>{item.quantity}</span>
                    <button 
                      onClick={() => dispatch(increaseQty(item._id))}
                      className='p-1.5 hover:bg-white rounded-full transition-colors'
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button 
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className='p-2 text-gray-300 hover:text-red-500 transition-colors'
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className='lg:col-span-1'>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className='bg-white p-6 rounded-3xl border border-gray-100 shadow-xl sticky top-6'
            >
              <h2 className='text-xl font-bold text-gray-800 mb-6'>Order Summary</h2>
              
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

                <button onClick={()=>naviagte.push("/checkout")}  className='w-full bg-gray-900 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-purple-600 transition-all active:scale-[0.98] shadow-lg'>
                 CheckOut
                </button>
                
               
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart