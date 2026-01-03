"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, PlusCircle, IndianRupee, Tag, Package, Info, X, CheckCircle2, AlertCircle } from 'lucide-react'
import Image from 'next/image'

function AddGrocery() {
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fruits & Vegetables',
    price: '',
    unit: '',
    description: ''
  })

  // Auto-hide notifications after 4 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setError(null) // clear error when image selected
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation: Check for Image
    if (!imageFile) {
      setError("Please upload a product image!")
      return
    }

    setLoading(true)

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('category', formData.category)
      data.append('price', formData.price)
      data.append('unit', formData.unit)
      data.append('description', formData.description)
      data.append('image', imageFile)

      const response = await fetch('/api/admin/add-items', {
        method: 'POST',
        body: data,
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Reset Form
        setFormData({ name: '', category: 'Fruits & Vegetables', price: '', unit: '', description: '' })
        setImageFile(null)
        setImagePreview(null)
      } else {
        setError(result.message || "Failed to add product")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Server connection failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      
      {/* --- NOTIFICATION POPUPS --- */}
      {success && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300">
          <CheckCircle2 className="w-6 h-6" />
          <div>
            <p className="font-bold">Success!</p>
            <p className="text-sm opacity-90">Item added to inventory successfully.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300">
          <AlertCircle className="w-6 h-6" />
          <div>
            <p className="font-bold">Error</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      )}

      {/* Decorative Purple Header Background */}
      <div className="absolute top-0 left-0 w-full h-72 bg-purple-600 rounded-b-[3rem] z-0 shadow-2xl" />

      <div className='relative z-10 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-purple-100 mt-10 md:mt-0'>
        
        {/* Header Section */}
        <div className="bg-white px-6 md:px-10 pt-8 pb-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-all font-bold text-sm bg-purple-50 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="bg-purple-600 px-4 py-1.5 rounded-full shadow-md shadow-purple-200">
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Admin Portal</span>
          </div>
        </div>

        <div className="px-6 md:px-10 pb-10">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add New Grocery</h1>
            <p className="text-gray-500 text-sm mt-1">Stock up your inventory with fresh items.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload Area */}
            <div className={`group relative border-2 border-dashed rounded-[2rem] p-6 md:p-10 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden min-h-[200px] 
              ${!imageFile && error ? 'border-red-400 bg-red-50' : 'border-purple-200 hover:border-purple-500 hover:bg-purple-50/50'}`}>
              
              {imagePreview ? (
                <div className="relative w-full h-full flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-md">
                     <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                  <button 
                    type="button"
                    onClick={() => {setImageFile(null); setImagePreview(null)}}
                    className="mt-3 flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 transition"
                  >
                    <X className="w-3 h-3" /> Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-purple-100 p-4 rounded-full shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-7 h-7 text-purple-600" />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm font-bold text-purple-900 tracking-tight">Upload Product Image</p>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">Drag and drop or click to browse</p>
                  </div>
                </>
              )}
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-purple-500" /> Name
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  placeholder="e.g. Alphonso Mangoes"
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-sm font-medium"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-purple-500" /> Category
                </label>
                <div className="relative">
                  <select 
                    value={formData.category}
                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Fruits & Vegetables</option>
                    <option>Dairy & Eggs</option>
                    <option>Bakery & Biscuits</option>
                    <option>Beverages</option>
                    <option>Snacks & Munchies</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-400">
                    <ArrowLeft className="w-4 h-4 -rotate-90" />
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-purple-500" /> Price
                </label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  placeholder="0.00"
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm font-medium"
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              {/* Unit/Weight */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-purple-500" /> Weight / Unit
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.unit}
                  placeholder="e.g. 1kg or 1 Dozen"
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 outline-none transition-all text-sm font-medium"
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-gray-700 ml-1">Product Description</label>
              <textarea 
                rows={3}
                value={formData.description}
                placeholder="Briefly describe the product quality, origin, etc."
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 outline-none transition-all resize-none text-sm font-medium"
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-200 transition-all transform hover:-translate-y-1 active:scale-[0.97] flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  Add to Store
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddGrocery