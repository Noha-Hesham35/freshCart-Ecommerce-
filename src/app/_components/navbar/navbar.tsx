"use client"
import { Heart, Menu, Package, ShoppingCart, User, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function Navbar({ cartIcon }: { cartIcon: React.ReactNode }) {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const logOut = () => {
    signOut({ callbackUrl: "/login" })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/products")
    }
  }

  return (
    <>
      <div className='bg-gray-100 p-5 fixed z-10 w-full shadow-xs'>
        <div className='w-[93%] mx-auto flex justify-between items-center'>
          <div className="left-nav flex items-center gap-5 flex-1 max-w-3xl">
            <Link href='/' className="logo text-[26px] flex items-center gap-1.5 shrink-0">
              <ShoppingCart color='green' />
              <h2 className='font-bold text-gray-800'>FreshCart</h2>
            </Link>

            <form onSubmit={handleSearch} className='w-full max-w-md relative hidden md:block'>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-4 py-5 pr-10 rounded-full bg-white border-gray-200 text-sm'
                placeholder="Search products, brands and more..."
              />
              <button type="submit" className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 cursor-pointer'>
                <Search size={18} />
              </button>
            </form>

            <ul className='hidden lg:flex items-center gap-5 shrink-0'>
              <li><Link className='hover:text-green-600 transition-all duration-200 text-gray-700 font-semibold text-sm' href={"/"}>Home</Link></li>
              <li><Link className='hover:text-green-600 transition-all duration-200 text-gray-700 font-semibold text-sm' href={"/products"}>Shop</Link></li>
              <li><Link className='hover:text-green-600 transition-all duration-200 text-gray-700 font-semibold text-sm' href={"/categories"}>Categories</Link></li>
              <li><Link className='hover:text-green-600 transition-all duration-200 text-gray-700 font-semibold text-sm' href={"/brands"}>Brands</Link></li>
            </ul>
          </div>

          <div className="right-nav">
            <ul className='hidden lg:flex items-center gap-4 text-sm font-semibold'>
              {session ? (
                <>
                  <li>
                    <Link className='flex items-center gap-1 hover:text-green-600 transition-all duration-200' href={"/profile"}>
                      <User size={18} />
                      <span className='max-w-28 truncate'>{session.user?.name || "Profile"}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className='flex items-center gap-1 hover:text-green-600 transition-all duration-200' href={"/allorders"}>
                      <Package size={18} />
                      <span>Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link className='flex items-center gap-1 hover:text-green-600 transition-all duration-200' href={"/wishList"}>
                      Wishlist <Heart className='hover:text-red-600' size={18} />
                    </Link>
                  </li>
                  <li>{cartIcon}</li>
                  <li>
                    <span onClick={() => logOut()} className='text-red-600 hover:text-red-500 cursor-pointer'>
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li><Link className='flex gap-1 hover:text-green-600 transition-all duration-200' href={"/login"}>Login</Link></li>
                  <li><Link className='flex gap-1 hover:text-green-600 transition-all duration-200' href={"/register"}>Register</Link></li>
                </>
              )}
            </ul>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className='lg:hidden cursor-pointer' render={<Button variant="outline"><Menu /></Button>} />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {session ? (
                  <>
                    <DropdownMenuItem>
                      <li><Link className='flex items-center gap-2 hover:text-green-600' href={"/profile"}><User size={18} /> Profile</Link></li>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <li><Link className='flex items-center gap-2 hover:text-green-600' href={"/allorders"}><Package size={18} /> My Orders</Link></li>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <li><Link className='flex items-center gap-2 hover:text-green-600' href={"/wishList"}><Heart size={18} /> Wishlist</Link></li>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <li>{cartIcon}</li>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <li><span onClick={() => logOut()} className='text-red-600 hover:text-red-500 cursor-pointer'>Logout</span></li>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem><li><Link className='flex gap-1 hover:text-green-600' href={"/login"}>Login</Link></li></DropdownMenuItem>
                    <DropdownMenuItem><li><Link className='flex gap-1 hover:text-green-600' href={"/register"}>Register</Link></li></DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem><li><Link className='hover:text-green-600' href={"/"}>Home</Link></li></DropdownMenuItem>
                <DropdownMenuItem><li><Link className='hover:text-green-600' href={"/products"}>Products</Link></li></DropdownMenuItem>
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
