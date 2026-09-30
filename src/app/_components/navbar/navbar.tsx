"use client"
import { Heart, Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react'
export default function Navbar({cartIcon} : {cartIcon : React.ReactNode}) {
  const {data: session, status}=  useSession()
const logOut = ()=>{
    signOut({callbackUrl:"/login"})
}
    return (
        <>
            <div className='bg-gray-100 p-5 fixed z-10 w-full'>
                <div className='w-[93%] mx-auto flex justify-between items-center'>
                    <div className="left-nav flex items-center gap-5">
                        <Link href='/' className="logo text-[26px] flex items-center gap-1.5">
                            <ShoppingCart color='green'/>
                            <h2 className=' font-bold'>FreshCart</h2>
                        </Link>
                        <Input className='w-full px-4 py-6 rounded-full' placeholder="Search for products, brands and more..." />
                        <ul className=' hidden lg:flex items-center gap-5'>
                            <li><Link className='hover:text-green-600 transition-all duration-200 text-mist-600 font-semibold' href={"/"}>Home</Link></li>
                            <li><Link className='hover:text-green-600 transition-all duration-200  text-mist-600 font-semibold' href={"/products"}>Shop</Link></li>
                            <li><Link className='hover:text-green-600 transition-all duration-200  text-mist-600 font-semibold' href={"/categories"}>Categories</Link></li>
                            <li><Link className='hover:text-green-600 transition-all duration-200  text-mist-600 font-semibold' href={"/brands"}>Brands</Link></li>
                        </ul>
                    </div>
                    <div className="right-nav">
                        <ul className='hidden lg:flex items-center gap-3'>
                             {session? <>
                            <li><Link className='flex gap-1 hover:text-green-600 transition-all duration-200' href={"/wishList"}>Wishlist <Heart className='hover:text-red-600' size={20} /></Link></li>
                            <li>{cartIcon}</li>
                            <li><span onClick={()=>logOut()} className='text-red-600 hover:text-red-500 cursor-pointer'>Logout</span></li>
                             </>:<>
                              <li><Link className='flex gap-1 hover:text-green-600 transition-all duration-200' href={"/login"}>Login </Link></li>
                            <li><Link className='flex gap-1 hover:text-green-600 transition-all duration-200' href={"/register"}>Register </Link></li></>}
                        </ul>
                    </div>
                
 <DropdownMenu>
      <DropdownMenuTrigger className='lg:hidden cursor-pointer' render={<Button variant="outline"><Menu /></Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
            {session?<>
                      <DropdownMenuItem><li><Link className='flex gap-1 hover:text-green-600 transition-all duration-200' href={"/wishList"}>Wishlist <Heart className='hover:fill-green-600 ' fill='black' /></Link></li></DropdownMenuItem>
          <DropdownMenuItem><li>{cartIcon}</li></DropdownMenuItem>
          <DropdownMenuItem><li><span className='text-red-600 hover:text-red-500 cursor-pointer'>Logout</span></li></DropdownMenuItem>
            </>:<>
                      <DropdownMenuItem><li><Link className='flex gap-1 hover:text-green-600 transition-all duration-200' href={"/login"}>Login </Link></li></DropdownMenuItem>
          <DropdownMenuItem><li><Link className='flex gap-1 hover:text-green-600 transition-all duration-200' href={"/register"}>Register </Link></li></DropdownMenuItem>
            </>}
          <DropdownMenuItem><li><Link className='hover:text-green-600 transition-all duration-200' href={"/products"}>Products</Link></li></DropdownMenuItem>
          <DropdownMenuItem><li><Link className='hover:text-green-600' href={"/categories"}>Categories</Link></li></DropdownMenuItem>
          <DropdownMenuItem><li><Link className='hover:text-green-600' href={"/brands"}>Brands</Link></li></DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
                </div>
            </div>
        </>
    )
}
