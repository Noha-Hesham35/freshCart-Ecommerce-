"use client"
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { ProductType } from '@/types/AllProduct.types';
import Image from 'next/image';
import AddCartBtn from '../AddCartBtn/AddCartBtn';
export default function SwiperSlider({ data } :{data:ProductType}) {
    const [selectedImage, setselectedImage] = useState(data.imageCover)

    return (
        <>
            <div className='w-[93%] mx-auto my-5'>
                <div className='flex items-start gap-3'>
                    <div className='w-1/3'>
                        <Image width={500} height={500} src={selectedImage} alt={data.title} />
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={4}
                        >
                            {data.images.map((image) => <SwiperSlide   key={data.id} onClick={() => setselectedImage(image)} className='cursor-pointer my-5'><img src={image} alt="" /></SwiperSlide>)}
                        </Swiper>
                    </div>
                    <div className='w-2/3 my-10'>
                        <div className='flex gap-2.5 my-2'>
                            <Button className="bg-[#F0FDF4] rounded-full text-[12px] font-semibold hover:bg-[#DCFCE7] cursor-pointer text-[#15803d]">{data.category.name}</Button>
                            <Button className="bg-[#F3F4F6] rounded-full text-[12px] font-semibold text-[#364153]" >{data.brand.name}</Button>
                        </div>

                        <h2 className='text-3xl font-semibold'>{data.title}</h2>
                        <p className='text-slate-700 mt-3'>{data.description}</p>
                        <div className='flex justify-between mt-3'>
                            <div className='text-gray-800 font-semibold text-3xl'>{data.price} EGP</div>
                            <div className=' flex gap-0.5'>
                                {data.ratingsAverage} ({data.ratingsQuantity})
                                <Star className='text-[#FDC700]' size={18} fill='#FDC700' />
                            </div>
                        </div>
                        <Button className=" bg-[#F0FDF4] p-2 my-4 font-semibold hover:bg-[#DCFCE7]  text-[#15803d]">In Stock</Button>
<AddCartBtn showAlways id={data.id}/>                
    </div>
                </div>
            </div>

        </>
    )
}
