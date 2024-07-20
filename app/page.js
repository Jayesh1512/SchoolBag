import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div className='grid place-content-center h-screen'>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  )
}

export default page