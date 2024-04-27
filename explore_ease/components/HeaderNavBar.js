"use client";
import React from 'react'
import Image from 'next/image'

function HeaderNavBar() {
  return (
    <div className='flex gap-5 items-center'>
      <div className='flex gap-5 items-center'>
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <h2>Home</h2>
        <h2>Favourite</h2>
      </div>
      <div className='flex bg-gray-100 p-[6px] rounded-md w-[40%] gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6'>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <input type="text" placeholder="Search" className='bg-transparent outline-none w-full' />
      </div>

    </div>
  )
}

export default HeaderNavBar
