import { getAllProducts, ProductFilters } from '@/api/getAllProducts.api'
import SingleProduct from '../singleProduct/singleProduct'
import { ProductType } from '@/types/AllProduct.types'
import { Getwishlist } from '@/wishListAction/Getloggeduserwishlist.Action'
import { WishListtt } from '@/types/WishList.types'
import { PackageOpen } from 'lucide-react'
import Link from 'next/link'

export default async function AllProducts({ filters }: { filters?: ProductFilters }) {
  const response = await getAllProducts(filters)
  const data: ProductType[] = response?.data || []

  let wishListId: string[] = []
  try {
    const wishList = await Getwishlist()
    if (wishList?.data) {
      wishListId = wishList.data.map((wishlist: WishListtt) => wishlist.id)
    }
  } catch (error) {
    wishListId = []
  }

  return (
    <>
      <div className='w-[93%] mx-auto my-5'>
        {data.length === 0 ? (
          <div className='text-center py-16 flex flex-col items-center justify-center'>
            <div className='rounded-full bg-gray-100 p-8 mb-4'>
              <PackageOpen className='text-gray-400' size={56} />
            </div>
            <h2 className='text-2xl font-bold text-gray-800'>No products found</h2>
            <p className='text-gray-500 mt-2 max-w-md'>
              Try clearing filters or search query to see other products.
            </p>
            <Link href="/products" className='mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold transition-colors'>
              View All Products</Link>
          </div>
        ) : (
          <div className='flex flex-wrap'>
            {data.map((currentProduct: ProductType) => (
              <SingleProduct
                key={currentProduct.id}
                currentProduct={currentProduct}
                isWishListed={wishListId.includes(currentProduct.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}