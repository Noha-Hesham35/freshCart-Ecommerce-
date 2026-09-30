import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {  Star } from 'lucide-react'
import Link from 'next/link'
import { ProductType } from '@/types/AllProduct.types'
import Image from 'next/image'
import AddCartBtn from '../AddCartBtn/AddCartBtn'
import WishListIcon from '../WishListIcon/WishListIcon'
export default function SingleProduct({ currentProduct ,isWishListed}: { currentProduct: ProductType , isWishListed:boolean}) {
  return (
    <>
      <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
        <div className='inner p-3'>
          <Card className="w-full max-w-sm group ring-0 hover:ring-1 hover:ring-green-600 cursor-pointer transition-all duration-200">
            <WishListIcon id={currentProduct.id} isWishListed={isWishListed}/>
            <Link href={`/products/${currentProduct.id}`}>
              <CardHeader>
                <CardTitle><Image width={5000} height={5000} src={currentProduct.imageCover} alt={currentProduct.title} /></CardTitle>
                <CardDescription>
                  <h2>{currentProduct.category.name}</h2>
                  <p className='text-gray-800 text-[18px] py-1'>{currentProduct.slug}</p>
                  <div className='flex justify-between'>
                    <div className='text-gray-800 font-semibold text-[19px]'>{currentProduct.price} EGP</div>
                    <div className=' flex gap-0.5'>
                      {currentProduct.ratingsAverage} ({currentProduct.ratingsQuantity})
                      <Star className='text-[#FDC700]' size={18} fill='#FDC700' />
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
            </Link>
            <div className=' mx-auto w-[85%]'>
              <AddCartBtn id={currentProduct.id} />
            </div>
          </Card>
        </div>
      </div >
    </>
  )
}
