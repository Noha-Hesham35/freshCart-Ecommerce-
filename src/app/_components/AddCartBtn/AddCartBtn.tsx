"use client"
import { AddProductToCart } from '@/cartAction/AddProductToCart.Action'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function AddCartBtn({id , showAlways =false }:{id:string , showAlways?:boolean}) {
const [isLoading, setIsLoading] = useState(false)
const router = useRouter()
async function AddToCart(id:string)
{
  try {
    setIsLoading(true)
        const response = await AddProductToCart(id)
    if(response.status=="success")
    {
      toast.success(response.message,{position:"top-right" , autoClose: 2000 , closeOnClick:true})
  router.refresh()
    }
    else
    {
      toast.error("Something went wrong",{position:"top-right" , autoClose: 2000 , closeOnClick:true})
    }
  } catch (error) {
          toast.error("Something went wrong",{position:"top-right" , autoClose: 2000 , closeOnClick:true})

  }finally{
    setIsLoading(false)
  }

}
  return (
    <>
    <Button onClick={()=>AddToCart(id)} className={`rounded-full text-white bg-green-500 cursor-pointer p-2 hover:bg-green-600 transition-all duration-200 w-full my-2 ${!showAlways ? " opacity-0 group-hover:opacity-100" : ""}`}>{isLoading ?<Loader className='animate-spin'/> : "Add to cart"}  </Button>
    </>
  )
}
