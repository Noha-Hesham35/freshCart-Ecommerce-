import { GetLoggedUserCart } from '@/cartAction/GetLoggedUserCart.Action'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default async function CartIcon() {
    const response = await GetLoggedUserCart()
    return (
        <>
            <Link className='relative flex gap-1 hover:text-green-600 transition-all duration-200' href={"/cart"}>Cart <ShoppingCart className='hover:fill-green-600 ' color='green' />
            <span className='bg-green-500 px-1 absolute bottom-2 -right-2 text-[13px] text-white rounded-2xl'>{response.numOfCartItems}</span></Link>
        </>
    )
}
