import AllProducts from '@/app/_components/allProducts/allProducts'
import { PackageOpen } from 'lucide-react'
import Link from 'next/link'

export default async function Products({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; brand?: string; keyword?: string }>
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined

  return (
    <>
      <title>Products - FreshCart</title>
      <div className='bg-linear-to-r from-[#17A74C] to-[#46DB7C] h-60'>
        <div className='w-[90%] mx-auto py-10'>
          <div className='flex gap-1 text-[15px] mt-8 mb-5'>
            <Link className='text-gray-200 hover:text-white' href="/">Home</Link>
            <span className='text-white'>/ All Products</span>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='rounded-2xl bg-linear-to-r from-[#49C477] to-[#4CCA7A] p-5'>
              <PackageOpen color='white' size={32} />
            </div>
            <div>
              <h1 className='text-white text-3xl font-bold'>All Products</h1>
              <p className='text-[#fffc]'>Explore our complete product collection</p>
            </div>
          </div>
        </div>
      </div>
      <AllProducts filters={resolvedSearchParams} />
    </>
  )
}
