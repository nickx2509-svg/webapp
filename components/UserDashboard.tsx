import React from "react"
import HeroScetion from "./HeroScetion"
import Grocery from "@/model/items.model"
import GroceryCart from "./GroceryCart"
import connectDB from "@/lib/db"
import SliderCategory from "@/components/SliderCategory"

async function UserDashboard() {
  await connectDB()

  const grocery = await Grocery.find({}).lean()

  // ✅ Convert MongoDB docs → plain objects
  const safeGrocery = grocery.map((item: any) => ({
    _id: item._id.toString(),   // ObjectId → string
    name: item.name,
    category: item.category,
    price: item.price,
    image: item.image,
    unit: item.unit,
  }))

  return (
    <div>
      <HeroScetion />
      <SliderCategory />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 mt-6">
        {safeGrocery.map((items) => (
          <GroceryCart
            key={items._id}
            items={items}
          />
        ))}
      </div>
    </div>
  )
}

export default UserDashboard
