import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 bg-white shadow'>
        <div className='container mx-auto flex items-center justify-between py-4 px-4'>
            <Link className='text-[#285943] font-black w-full md:w-1/2' href="/">
                Sankofa Seedlings
            </Link> 
            <div className='hidden md:flex justify-end space-x-6 w-full md:w-1/2'>
                <p className='font-medium text-black hover:underline'>Find Your Hardiness Zone</p>
                <Link className='text-[#285943] font-black hover:text-gray-600' href="/">Home</Link> 
                <Link className='text-[#285943] font-black hover:text-gray-600' href="/products">
                    Products
                </Link> 
                <Link className='text-[#285943] font-black hover:text-gray-600' href="/checkout">
                    Checkout
                </Link> 
                </div>
                <div className='flex items-center space-x-4'>{/* <Link href="/cart">Cart</Link> */}</div>
            </div>
    </nav>
  )
}

export default Navbar