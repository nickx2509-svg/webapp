'use client'

import { ArrowLeft, EyeIcon, EyeOff, Key, Loader, Loader2, Loader2Icon, LogIn, Mail, User, UserCheck, UserRound } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'





function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [showpassword, setshowpassword] = useState(false)
  const [loading,setloading] = useState(false)

  const navigate = useRouter()
  const session = useSession()
  console.log(session)

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    setloading(true)
    try {
        const res = await signIn("credentials",{
          email,password,redirect: false,

        })
        if(res?.ok){
          navigate.push("/")
        }

        setloading(false)
    } catch (error) {
      console.log(error)
        setloading(false)

      
    }
  }

  
    


  return (
    <div className="min-h-screen bg-white p-8 relative flex items-center justify-center">
      
     

      {/* Centered content */}
      <div className="flex flex-col items-center text-center gap-4 w-full">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl text-purple-500 font-bold"
        >
          Welcome Back
        </motion.h1>

        {/* Subtitle */}
        <p className="text-gray-500 max-w-sm flex items-center justify-center gap-1 text-sm">
          Login to Zepto 
          <UserRound className="w-4 h-4 text-purple-500" />
        </p>

        {/* Form */}
        <motion.form onSubmit={handleLogin} 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col w-full max-w-sm gap-5 mt-4"
        >
          {/* Name */}
          

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />

            <input
              type={showpassword ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-12 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />

            <button
              type="button"
              onClick={() => setshowpassword(!showpassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500"
            >
              {showpassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

       {
  (() => {
    const formValidate =  email.trim() !== "" && password.trim() !== ""

    return (
      <button
        type="submit"
        disabled={!formValidate || loading}
        className={` w-full py-2 rounded-xl font-semibold transition-all  duration-200
          ${formValidate
            ? "bg-purple-600 text-white hover:bg-purple-700 flex iteams-center justify-center cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {
          loading ? <Loader2 className='w-5 h-5 animate-spin ' /> : "Login"
        }
        
      </button>
    )
  })()
}

  <div className='flex iteam-center gap-2 text-gray-800mt-2 text sm' >
    <span className="flex-1 h-px bg-gray-200 mt-3" ></span>
    OR
    <span className="flex-1 h-px bg-gray-200 mt-3" ></span>

  </div>

 <button  
  onClick={() => signIn("google",{callbackUrl:'/'})}
type="button"
  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition hover:cursor-pointer"
>
  <Image
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    width={20}
    height={20}
  />
  <span className="text-sm font-medium text-gray-700">
    Continue with Google
  </span>
</button>
        </motion.form>
       <p className="mt-6 flex items-center gap-1 text-sm text-gray-600">
  create an Account
  <span onClick={() => navigate.push('/register')}  className="flex items-center gap-1 text-purple-600 hover:text-purple-700 cursor-pointer font-medium">
    <UserCheck className="w-4 h-4" />
    create account
  </span>
</p>

      </div>
    </div>
  )
}

export default Login
