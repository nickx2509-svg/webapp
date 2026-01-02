'use client'

import { AmpersandIcon, BikeIcon, User } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function EditRoleAndMobile() {
  const {update} = useSession()
  const router = useRouter()

  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [mobile, setmobile] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const roles = [
    { id: 'admin', label: 'Admin', icon: AmpersandIcon },
    { id: 'user', label: 'User', icon: User },
    { id: 'deliveryBoy', label: 'Delivery Boy', icon: BikeIcon },
  ]

  const isFormComplete = selectedRole && mobile.length === 10

  const HandleEdit = async () => {
    if (!isFormComplete) return

    try {
      setLoading(true)
      setError(null)
      setMessage(null)

      const res = await axios.post('/api/user/EditRoleAndMobile', {
        role: selectedRole,
        mobile,
      })
      await update({role:selectedRole})

      setMessage('Profile updated successfully ')

      // redirect after short delay
      setTimeout(() => {
        router.push('/')
      }, 1200)

    } catch (err: any) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 text-center">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-purple-500"
      >
        Select Your Role
      </motion.h1>

      {/* Role boxes */}
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        {roles.map((role, index) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id

          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRole(role.id)}
              className={`
                cursor-pointer w-48 h-40 rounded-2xl border flex flex-col items-center justify-center gap-3 transition
                ${isSelected
                  ? 'border-purple-500 bg-purple-200 shadow-md'
                  : 'border-gray-200 hover:border-purple-400'}
              `}
            >
              <Icon className={`w-10 h-10 ${isSelected ? 'text-purple-600' : 'text-purple-500'}`} />
              <span className={`text-lg font-semibold ${isSelected ? 'text-purple-600' : 'text-gray-700'}`}>
                {role.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile input */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col mt-10 items-center w-full max-w-sm"
      >
        <label className="mb-2 text-sm font-semibold text-gray-700">
          Enter your mobile number
        </label>

        <input
          onChange={(e) => setmobile(e.target.value)}
          type="tel"
          placeholder="e.g. 9876543210"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
        />
      </motion.div>

      {/* Messages */}
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={!isFormComplete || loading}
        onClick={HandleEdit}
        className={`
          mt-8 w-full max-w-sm rounded-xl px-6 py-3 font-semibold transition
          ${isFormComplete
            ? 'bg-purple-500 text-white hover:bg-purple-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        {loading ? 'Saving...' : 'Next'}
      </motion.button>

    </div>
  )
}

export default EditRoleAndMobile
