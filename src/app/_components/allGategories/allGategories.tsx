import { getAllGategories } from '@/api/getAllGategory.api'
import CategorySlider from '../categorySlider/categorySlider'
import { MoveRight } from 'lucide-react'

export default async function AllCategories() {
  let  data  = await getAllGategories()
  return (
    <>
      <div className='w-[93%] mx-auto'>
        <div className='flex justify-between'>
          <h2 className='text-3xl font-bold'>Shop By <span className='text-[#096]'>Category</span> </h2>
          <p className='text-[#15803d] my-4 flex items-center gap-2.5 cursor-pointer'>View All Categories <MoveRight /></p>
        </div>
        <CategorySlider data={data} />

      </div>
    </>
  )
}
