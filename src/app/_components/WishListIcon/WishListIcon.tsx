"use client"
import { AddProductToWishlist } from '@/wishListAction/Addproducttowishlist.Action'
import { Removeproductfromwishlist } from '@/wishListAction/Removeproductfromwishlist.Action'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'


export default function WishListIcon({ id, isWishListed }: { id: string, isWishListed: boolean }) {
const [isWishList, setIsWishList] = useState(isWishListed)
  async function toggleWishList() {
    if(isWishList)
    {
    try {
      setIsWishList(false)
      const response = await Removeproductfromwishlist(id)
      if(response.status=="success")
      {
toast.success(response.message,{position:"top-right",autoClose:2000,closeOnClick:true})
}
      else
      {
        toast.error("Product failed to Remove",{position:"top-right",autoClose:2000,closeOnClick:true})
      }

    } catch (error) {
      toast.error("Product failed to Remove",{position:"top-right",autoClose:2000,closeOnClick:true})
    }
    }


    else
    {
    try {
      setIsWishList(true)
      const response = await AddProductToWishlist(id)
      if (response.status=="success") {
        toast.success(response.message, { position: "bottom-left", closeOnClick: true, autoClose: 2000 })
      }
      else {
        toast.error("Can't Add Ptoduct to WishList now", { position: "bottom-left", closeOnClick: true, autoClose: 2000 })
      }
    } catch (error) {
      toast.error("Can't Add Ptoduct to WishList now", { position: "bottom-left", closeOnClick: true, autoClose: 2000 })
    }
    }

  }

  return (
    <>
      <div onClick={() => toggleWishList()} className='flex justify-end px-4'>
        <Heart className={isWishList ? " fill-red-600 text-red-600" : "hover:text-red-600 text-gray-600 transition-all duration-200 "} />
      </div>
    </>
  )
}
