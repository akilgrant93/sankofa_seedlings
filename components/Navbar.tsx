"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import "@fontsource/passion-one"
import HardinessZoneSelector from './HardinessZoneSelector'
import { useCartStore } from "@/store/cartstore";

const Navbar = () => {
  const tabs = ['Home', 'Products']
  const [selectedTab, setSelectedTab] = useState(tabs[0])
//   const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
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
                </div>
                <Link href="/checkout" className="relative pl-6 mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6 stroke-[#285943]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {cartCount}
                            </span>
                        )}
                </Link>
            </div>
    </nav>
  )
}

export default Navbar