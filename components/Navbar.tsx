"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import "@fontsource/passion-one"
import HardinessZoneSelector from './HardinessZoneSelector'

const Navbar = () => {
  const tabs = ['Home', 'Products', 'Checkout']
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  
  return (
    <nav className='sticky top-0 z-50 bg-white shadow'>
        <div className='mx-auto flex items-center justify-between py-4 px-4'>
            <Link style={{fontFamily: 'Passion One, sans-serif', fontWeight:500}} className='text-[#285943] font-black w-full md:w-1/2 text-3xl ' href="/">
            SANKOFA SEEDLINGS
            </Link> 
            <div className='hidden md:flex justify-end items-center space-x-6 w-full md:w-1/2'>
                <HardinessZoneSelector />
                <ul className='flex space-x-6'>
                    {tabs.map((item) => (
                        <Link
                            key={item}
                            style={{fontFamily: 'Passion One, sans-serif', fontWeight:500}}
                            href={ item === 'Home' ? '/' : `/${item.toLowerCase()}` }
                            className={ (item === selectedTab ? 'font-black text-[#77AF9C]'  : 'text-[#285943] font-black hover:text-[#77AF9C]') + ' text-xl'}
                            onClick={() => setSelectedTab(item)}
                        >
                            {`${item}`}
                        </Link>
                    ))}
                </ul>
                {/* <Link onClick={setSelectedTab(tabs[0])} className='text-[#285943] font-black hover:text-[#77AF9C]' href="/">Home</Link> 
                <Link className='text-[#285943] font-black hover:text-[#77AF9C]' href="/products">
                    Products
                </Link> 
                <Link className='' href="/checkout">
                    Checkout
                </Link>  */}
                </div>
                <div className='flex items-center space-x-4'>{/* <Link href="/cart">Cart</Link> */}</div>
            </div>
    </nav>
  )
}

export default Navbar