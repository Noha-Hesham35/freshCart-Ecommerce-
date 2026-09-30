import WishListReview from '@/app/_components/WishListReview/WishListReview'
import { WishListtt } from '@/types/WishList.types'
import { Getwishlist } from '@/wishListAction/Getloggeduserwishlist.Action'
import { Heart, MoveRight, PackageOpen } from 'lucide-react'
import Link from 'next/link'

export default async function WishList() {
      const response = await Getwishlist()


  return (
<>
{response.data.length==0 ? <div className="mt-30 flex flex-col gap-4 justify-center items-center text-center">
        <div className="rounded-2xl bg-[#F3F4F6] p-6">
          <Heart color="gray" size="35px"/>
        </div>
        <h2 className="text-xl font-bold">Your wishlist is empty</h2>
        <p className="text-[#6a7282]">Browse products and save your favorites here. Sign in to <br/>sync your wishlist across devices.</p>
        <Link href={"/"} className="text-white bg-green-600 hover:bg-green-700 py-4 px-20 font-semibold mt-8 flex gap-2 items-center rounded-xl">Browse Products<MoveRight color="white" /></Link>
      </div> :<div className='w-[85%] mx-auto pt-10'>
<h1 className='text-2xl font-bold my-2 border-b pb-4'>Wish List</h1>
<div>        {response.data.map((product:WishListtt)=><WishListReview product={product}/>)}
</div>
</div> }


</>  
)
}
