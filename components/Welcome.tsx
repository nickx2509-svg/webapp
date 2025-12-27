'use client'
import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Bike, ShoppingBasket, ShoppingCart } from 'lucide-react'
type PropeType={
  nextStep:(s:number) => void
}
function Welcome({nextStep}:PropeType) {

  return (
    <div className="flex items-center justify-center min-h-screen flex-col" >
      <motion.div
      initial = {{
        opacity:0,
        y:-20
      }}
      animate={{
        opacity:20,
        y:0
      }}
      transition={{
        duration:0.4 
      }}
      className='flex iteam-center gap-3'
      >
        <ShoppingBasket className='w-15 h-15 text-purple-500' />
       <h1 className='text-5xl md:text-6xl font-bold text-purple-500' >Zepto</h1>
       
      </motion.div>

      <motion.p
      initial = {{
        opacity:0,
        y:50
      }}
      animate={{
        opacity:20,
        y:25
      }}
      transition={{
        duration:0.4 ,
        delay:1
      }}
      className='flex iteam-center gap-3 md:text-lg max-w-lg  text-purple-800 px-10 ml-8 '
      >

 Daily essentials, delivered fast
Because time matters From store to door in minutes
Freshness guaranteed

      </motion.p>

      <motion.div
       initial = {{
        opacity:0,
        scale:0
      }}
      animate={{
        opacity:20,
        scale:1
      }}
      transition={{
        duration:0.4 ,

      }}
      className='flex iteam-center gap-20 mt-10 md:text-lg max-w-lg  text-purple-800 px-10 ml-8 '
      >
        <ShoppingCart className='text-purple-500 w-30 h-30' />
        <Bike className='text-purple-500 w-30 h-30' />
      

      </motion.div>

      <motion.button
       initial = {{
        opacity:0,
        scale:0
      }}
      animate={{
        opacity:20,
        scale:1
      }}
      transition={{
        duration:0.4 ,
        delay:0.8

      }}
      onClick={() => nextStep(2)}
      className=' hover:cursor-pointer mt-10 ml-7 py-3 px-16 bg-purple-500 text-gray-300 flex iteam-center  gap-2 font-semibold rounded-2xl shadow-md transition-all duration-200 hover:bg-purple-400'
      >
        Next
        <ArrowRight />

      </motion.button>
    </div>
  )
}

export default Welcome
