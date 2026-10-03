import { getAllGategories } from '@/api/getAllGategory.api'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { CategoryType } from '@/types/AllCategory.types'
import { Layers, MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {
  let data = await getAllGategories()
  console.log("my dataaaa" , data)
  return (
    <>
      <title>Categories</title>
      <div className='bg-linear-to-r from-[#17A74C] to-[#46DB7C] h-60'>
        <div className='w-[90%] mx-auto py-5 '>
          <div className='flex gap-1  text-[15px] mt-8 mb-5'>
            <Link className='text-gray-200 hover:text-white' href="/">Home</Link>
            <span className='text-white'>/ Categories</span>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='rounded-2xl bg-linear-to-r from-[#49C477] to-[#4CCA7A] p-5'>
              <Layers color='white' size={32} />
            </div>
            <div>
              <h1 className='text-white text-3xl font-bold'>All Categories</h1>
              <p className='text-[#fffc]'>Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>


        <div className='w-[90%] mx-auto mt-10'>
          <div className='flex flex-wrap gap-7 justify-center'>
      {data.map((card :CategoryType)=> (
        <Link key={card._id} href={`/categories/${card._id}`}>
          <Card className="min-w-43.75 max-w-87.5 group cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardDescription className='bg-[#F9FAFB] px-4 py-8 rounded-xl'>
                <Image className=' transition-transform duration-300 w-full h-40 object-cover group-hover:scale-110' width={500} height={500} alt={card.name} src={card.image}/>
              </CardDescription>
            </CardHeader>
            <CardContent className='text-center font-semibold'>
              <h3 className='text-slate-800 group-hover:text-green-600 transition-all duration-300'>{card.name}</h3>
              <h4 className='text-green-600 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1.5 justify-center items-center text-[13px]'>View Products <MoveRight size={16} /></h4>
            </CardContent>
          </Card>
        </Link>
      ))}
          </div>
      
      
        </div>

    </>
  )
}
