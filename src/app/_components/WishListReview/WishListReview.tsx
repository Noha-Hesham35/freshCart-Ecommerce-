
"use client"
import { Button } from '@/components/ui/button'
import { WishListtt } from '@/types/WishList.types'
import { Removeproductfromwishlist } from '@/wishListAction/Removeproductfromwishlist.Action'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import AddCartBtn from '../AddCartBtn/AddCartBtn'

export default  function WishListReview({ product }: { product: WishListtt }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
 async function removeWishList()
  {
    try {
      setIsLoading(true)
      const response = await Removeproductfromwishlist(product.id)
      if(response.status=="success")
      {
toast.success(response.message,{position:"top-right",autoClose:2000,closeOnClick:true})
router.refresh()
}
      else
      {
        toast.error("Product failed to Remove",{position:"top-right",autoClose:2000,closeOnClick:true})
      }

    } catch (error) {
      toast.error("Product failed to Remove",{position:"top-right",autoClose:2000,closeOnClick:true})

    }finally
    {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <div>
            <Image height={200} width={200} src={product.imageCover} alt={product.title} />
          </div>
          <div>
            <h3 className='text-xl hover:text-green-500'>{product.title}</h3>
            <p className='text-green-500'>{product.price} EGP</p>
          </div>
        </div>
        <div className='flex flex-col gap-3 '>
          {/* <Button className="hover:cursor-pointer bg-green-600 px-10">Add to Cart</Button> */}
         <AddCartBtn showAlways id={product.id}/>
          <Button onClick={()=>removeWishList()} className="hover:cursor-pointer rounded-full px-10 bg-green-500 hover:bg-red-600 transition-all duration-200">{isLoading ? <Loader className='animate-spin'/> : "Remove"}</Button>
        </div>
      </div>
    </>

  )
}
