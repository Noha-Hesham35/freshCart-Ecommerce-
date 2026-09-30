"use client"
import { ClearUserCart } from "@/cartAction/ClearUserCart.Action"
import { RemoveProductFromCart } from "@/cartAction/RemoveProductFromCart.Action"
import { UpdateCartProductQuantity } from "@/cartAction/UpdateCartProductQuantity.Action"
import { Button } from "@/components/ui/button"
import { CartType } from "@/types/CartLogged.types"
import { Loader, MoveRight, PackageOpen, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function CartTable({cart}: { cart: CartType}) {
  const [isLoading1, setIsLoading1] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  async function deletFromCart(id: string) {
    try {
      setIsLoading1(true)
      const remove = await RemoveProductFromCart({ id })
      if (remove.status == "success") {
        toast.success(remove.message, { position: "top-right", autoClose: 2000, closeOnClick: true })
        router.refresh()
      }
      else {
        toast.error("Something Went Wrong", { position: "top-right", autoClose: 2000, closeOnClick: true })
      }
    } catch (error) {
      toast.error("Something Went Wrong", { position: "top-right", autoClose: 2000, closeOnClick: true })
    }finally{
      setIsLoading1(false)
    }
  }

  async function clearYourCart() {
    try {
      setIsLoading2(true)
      const clear = await ClearUserCart()
      if (clear.status == "success") {
        toast.success(clear.message, { position: "top-right", autoClose: 2000, closeOnClick: true })
        router.refresh()
      }
      else {
        toast.error("Something Went Wrong", { position: "top-right", autoClose: 2000, closeOnClick: true })

      }
    } catch (error) {
      toast.error("Something Went Wrong", { position: "top-right", autoClose: 2000, closeOnClick: true })
    }finally{
      setIsLoading2(false)
    }
  }

async function QuantityUpdate(productId: string, count: number) {
  try {
    setIsLoading(true)
    const res = await UpdateCartProductQuantity(productId, count)
    if (res.status === "success") {
      router.refresh()
    } else {
      toast.error("Something Went Wrong", { position: "top-right", autoClose: 2000 })
    }
  } catch (error) {
    toast.error("Something Went Wrong", { position: "top-right", autoClose: 2000 })
  }finally{
      setIsLoading(false)
    }
}

  return (
    <>
      {cart.data.products.length == 0 ? <div className="mt-8 flex flex-col gap-4 justify-center items-center text-center">
        <div className="rounded-full bg-[#F3F4F6] p-10">
          <PackageOpen color="gray" size="50px" />
        </div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-[#6a7282] font-semibold">Looks like you haven't added anything to your cart yet.<br />
          Start exploring our products!</p>
        <Link href={"/"} className="text-white bg-green-600 hover:bg-green-700 py-4 px-8 font-semibold mt-8 flex gap-2 items-center rounded-2xl">Start Shopping <MoveRight color="white" /></Link>
      </div> : <>
        <div className="w-[90%] mx-auto mt-8">
          <div className="flex gap-3 items-center">
            <div className="bg-[#16A34A] rounded-xl p-3">
              <ShoppingCart color="white" />
            </div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
          </div>
          <div className=" flex justify-between">
            <div className=" my-2 text-[#6a7282] font-semibold">
              <p>You have <span className="text-green-600"> {cart.data.products.length} items</span> in your cart</p>
              <p>Total Cart Price <span className="text-green-600 mt-2"> {cart.data.totalCartPrice} EGP</span></p>
            </div>
            <div className="flex flex-col gap-2">
                 <Button onClick={() => clearYourCart()} className="hover:cursor-pointer  bg-red-600 hover:bg-red-700">{isLoading2 ? <Loader className="animate-spin"/> : "Clear Your Cart"}   </Button>
         <Link href={`/checkOut/${cart.cartId}`}>
            <Button className="hover:cursor-pointer  bg-green-600 w-full hover:bg-green-700">Check Out</Button>  
         </Link>
               </div>

            </div>
            <div>
          </div>
        </div>
        <div className="mt-5 relative w-[90%] mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className=" text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span>Image</span>
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.data.products.map((product) =>   
                  <tr key={product.product.id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                    <td className="p-4">
                      <Image width={100} height={100} src={product.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={product.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-heading text-[18px] hover:text-green-600 cursor-pointer transition-all duration-300">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <form className="max-w-xs mx-auto">
                        <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
                        <div className="relative flex items-center">
                          <button  onClick={()=>QuantityUpdate(product.product._id , product.count -1)} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex hover:cursor-pointer items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                            <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
                          </button>
                          <span className="mx-5">{isLoading ? <Loader className="animate-spin"/> : product.count }</span>

                          <button onClick={()=>QuantityUpdate(product.product._id , product.count +1)} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex hover:cursor-pointer items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                            <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
                          </button>
                        </div>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-heading text-green-600 font-bold text-[18px]">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <Button onClick={() => deletFromCart(product.product._id)} className="font-semibold  bg-amber-500 hover:bg-amber-600  cursor-pointer text-white">{isLoading1 ? <Loader className="animate-spin"/> : "Remove"} </Button>
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </>}
    </>
  )
}
