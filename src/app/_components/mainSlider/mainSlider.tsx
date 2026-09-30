"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import imge2 from '../../../../public/img/image1.jpg'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Headset, RotateCcw, ShieldHalf, Van } from 'lucide-react';
export default function MainSlider() {
  return (
    <>
      <div className='pt-8 bg-[#F9FAFB]'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 4000 }}
        >
          <SwiperSlide className='relative'>
            <Image src={imge2} alt='mainImage' className='w-full h-96 object-cover' />
            <div className='absolute inset-0 bg-green-500/55 '>
              <div className='p-20 w-[40%]'>
                <h2 className='text-white font-bold text-3xl'>Fresh Products Delivered to your Door</h2>
                <p className='text-white my-3'>Get 20% off your first order</p>
                <div className='flex gap-2'>
                  <Button className="font-semibold p-5 bg-white text-[#00c950]">Shop Now</Button>
                  <Button className="font-semibold p-5 text-white bg-transparent ring-1 ring-gray-300">View Details</Button>
                </div>

              </div>
            </div>

          </SwiperSlide>

          <SwiperSlide className='relative'>
            <Image src={imge2} alt='mainImage' className='w-full h-96 object-cover' />
            <div className='absolute inset-0 bg-green-500/55 '>
              <div className='p-20 w-[40%]'>
                <h2 className='text-white font-bold text-3xl'>Premium Quality Guaranteed</h2>
                <p className='text-white my-3'>Fresh from farm to your table</p>
                <div className='flex gap-2'>
                  <Button className="font-semibold p-5 bg-white text-[#2b7fff]">Shop Now</Button>
                  <Button className="font-semibold p-5 text-white bg-transparent ring-1 ring-gray-300">Learn More</Button>
                </div>
              </div>
            </div>

          </SwiperSlide>

          <SwiperSlide className='relative'>
            <Image src={imge2} alt='mainImage' className='w-full h-96 object-cover' />
            <div className='absolute inset-0 bg-green-500/55 '>
              <div className='p-20 w-[40%]'>
                <h2 className='text-white font-bold text-3xl'>Fast & Free Delivery</h2>
                <p className='text-white my-3'>Same day delivery available</p>
                <div className='flex gap-2'>
                  <Button className="font-semibold p-5 bg-white text-[#ad46ff]">Order Now</Button>
                  <Button className="font-semibold p-5 text-white bg-transparent ring-1 ring-gray-300">Delivery Info</Button>
                </div>

              </div>
            </div>

          </SwiperSlide>
        </Swiper>
        <div className='flex w-[90%] mx-auto my-5 gap-4'>
          <div className='flex items-center bg-[white] w-full gap-3 border p-3 rounded-xl'>
            <div className='rounded-full bg-[#EFF6FF] p-4'>
              <Van color='blue' fill='blue' />
            </div>
            <div className='flex flex-col'>
              <h3 className='text-[14px] font-semibold'>Free Shipping</h3>
              <p className='text-[12px] text-slate-500'>On orders over 500 EGP</p>
            </div>
          </div>
          <div className='flex items-center bg-[white] w-full gap-3 border p-3 rounded-xl'>
            <div className='rounded-full bg-[#ECFDF5] p-4'>
              <ShieldHalf color='green' />
            </div>
            <div className='flex flex-col'>
              <h3 className='text-[14px] font-semibold'>Secure Payment</h3>
              <p className='text-[12px] text-slate-500'>100% secure transactions</p>
            </div>
          </div>
          <div className='flex items-center bg-[white] w-full gap-3 border p-3 rounded-xl'>
            <div className='rounded-full bg-[#FFF7ED] p-4'>
              <RotateCcw color='#FF6900'  />
            </div>
            <div className='flex flex-col'>
              <h3 className='text-[14px] font-semibold'>Easy Returns</h3>
              <p className='text-[12px] text-slate-500'>14-day return policy</p>
            </div>
          </div>
          <div className='flex items-center bg-[white] w-full gap-3 border p-3 rounded-xl'>
            <div className='rounded-full bg-[#FAF5FF] p-4'>
              <Headset color='#AD46FF' />
            </div>
            <div className='flex flex-col'>
              <h3 className='text-[14px] font-semibold'>24/7 Support</h3>
              <p className='text-[12px] text-slate-500'>Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
      <div className='my-5'>
      </div>
      
    </>
  )
}
