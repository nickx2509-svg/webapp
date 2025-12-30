import { auth } from '@/auth'
import EditRoleAndMobile from '@/components/EditRoleAndMobile'
import Nav from '@/components/Nav'
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

  return (
    <>
      <Nav user={ user } />
    </>
  )
}

export default Home
