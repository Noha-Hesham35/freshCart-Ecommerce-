import { getAllProducts } from '@/api/getAllProducts.api'
import SingleProduct from '../singleProduct/singleProduct'
import { ProductType } from '@/types/AllProduct.types'
import { Getwishlist } from '@/wishListAction/Getloggeduserwishlist.Action'
import { WishListtt } from '@/types/WishList.types'

export default async function AllProducts() {
  const { data } = await getAllProducts()

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
      <title>Product</title>
      <div className='w-[93%] mx-auto my-5'>
        <div className='flex flex-wrap'>
          {data.map((currentProduct: ProductType) => (
            <SingleProduct
              key={currentProduct.id}
              currentProduct={currentProduct}
              isWishListed={wishListId.includes(currentProduct.id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}