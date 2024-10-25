'use client'
import React from 'react'
import Topbar from '../components/Molecular/topbar'
import Navbar from '../components/Organism/navBar'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/constants/firebase";

const page = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className='h-screen relative'>
      <Topbar />
      <div className='absolute bottom-0 w-full'>
        <Navbar />
      </div>
    </div>
  )
}

export default page