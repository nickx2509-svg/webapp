import { auth } from '@/auth'
import AdminDashboard from '@/components/AdminDashboard'
import DeliveryBoyDashboard from '@/components/DeliveryBoyDashboard'
import EditRoleAndMobile from '@/components/EditRoleAndMobile'
import Nav from '@/components/Nav'
import SliderCategory from '@/components/SliderCategory'
import UserDashboard from '@/components/UserDashboard'
import connectDB from '@/lib/db'
import User from '@/model/user.model'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async () => {
  await connectDB()

  const session = await auth()
  console.log(session)

  const user = await User.findById(session?.user?.id)

  if (!user) {
    redirect('/login')
  }

  const isComplete =
    !user.mobile ||
    !user.role ||
    (!user.mobile && user.role == "user")

  if (isComplete) {
    return <EditRoleAndMobile />
  }

  const plainUser = JSON.parse(JSON.stringify( user ))
  
  return (
    <>
      <Nav user={ plainUser } />
      {
        user.role =="user" ? (
          <>
          <UserDashboard />
          <SliderCategory />
          </>
        ) : user.role == "admin"? (
          <AdminDashboard />
        ) : <DeliveryBoyDashboard />      }
    </>
  )
}

export default Home
