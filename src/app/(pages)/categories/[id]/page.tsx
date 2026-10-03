import { getCategoryDetails } from '@/api/getCategoryDetails.api'
import { getAllProducts } from '@/api/getAllProducts.api'
import SingleProduct from '@/app/_components/singleProduct/singleProduct'
import { ProductType } from '@/types/AllProduct.types'
import { Getwishlist } from '@/wishListAction/Getloggeduserwishlist.Action'
import { WishListtt } from '@/types/WishList.types'
import { ArrowLeft, Layers, PackageOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [categoryResponse, productsResponse] = await Promise.all([
    getCategoryDetails(id).catch(() => null),
    getAllProducts({ category: id }).catch(() => null),
  ])

  const category = categoryResponse?.data
  const products: ProductType[] = productsResponse?.data || []

  let wishListId: string[] = []
  try {
    const wishList = await Getwishlist()
    if (wishList?.data) {
      wishListId = wishList.data.map((wishlist: WishListtt) => wishlist.id)
    }
  } catch (error) {
    wishListId = []
  }

  const categoryName = category?.name || "Category"

  return (
    <>
      <title>{`${categoryName} - FreshCart`}</title>

      {/* Header Banner */}
      <div className='bg-linear-to-r from-[#17A74C] to-[#46DB7C] min-h-60'>
        <div className='w-[90%] mx-auto py-10'>
          <div className='flex items-center gap-2 text-[15px] mt-4 mb-5'>
            <Link className='text-gray-200 hover:text-white transition-colors' href="/">Home</Link>
            <span className='text-white/60'>/</span>
            <Link className='text-gray-200 hover:text-white transition-colors' href="/categories">Categories</Link>
            <span className='text-white/60'>/</span>
            <span className='text-white font-medium'>{categoryName}</span>
          </div>

          <div className='flex flex-wrap items-center justify-between gap-6'>
            <div className='flex gap-4 items-center'>
              {category?.image ? (
                <div className='rounded-2xl bg-white p-3 shadow-md'>
                  <Image
                    src={category.image}
                    alt={categoryName}
                    width={80}
                    height={80}
                    className='h-16 w-16 rounded-xl object-cover'
                  />
                </div>
              ) : (
                <div className='rounded-2xl bg-linear-to-r from-[#49C477] to-[#4CCA7A] p-5 shadow-md'>
                  <Layers color='white' size={32} />
                </div>
              )}
              <div>
                <h1 className='text-white text-3xl font-bold'>{categoryName}</h1>
                <p className='text-[#fffc] mt-1'>
                  {products.length} {products.length === 1 ? 'Product available' : 'Products available'}
                </p>
              </div>
            </div>

            <Link
              href="/categories"
              className='inline-flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 text-sm font-semibold backdrop-blur-xs transition-colors'
            >
              <ArrowLeft size={18} /> All Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className='w-[93%] mx-auto my-10'>
        {products.length === 0 ? (
          <div className='text-center py-16 flex flex-col items-center justify-center'>
            <div className='rounded-full bg-green-50 p-8 mb-4'>
              <PackageOpen className='text-green-600' size={56} />
            </div>
            <h2 className='text-2xl font-bold text-gray-800'>No products found</h2>
            <p className='text-gray-500 mt-2 max-w-md'>
              There are currently no products available under <span className='font-semibold text-green-600'>{categoryName}</span>.
            </p>
            <Link
              href="/categories"
              className='mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold transition-colors'
            >
              <ArrowLeft size={18} /> Browse Other Categories
            </Link>
          </div>
        ) : (
          <div className='flex flex-wrap'>
            {products.map((currentProduct: ProductType) => (
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
