'use client'
import Registerform from '@/components/Registerform'
import Welcome from '@/components/Welcome'
import React, { useState } from 'react'

const Register = () => {
  const [step,setstep] = useState(1)
  return(
    <>
    {step == 1 ?   <Welcome nextStep ={setstep} /> : <Registerform />}
  
    </>
  )
}
export default Register