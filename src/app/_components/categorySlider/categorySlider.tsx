"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card"
import { CategoryType } from '@/types/AllCategory.types';

export default function CategorySlider({ data }:{data:CategoryType[]}) {
    return (
        <>
            <Swiper
                spaceBetween={20}
                slidesPerView={2}
                modules={[Autoplay]}
                autoplay={{ delay: 4000 }}
                breakpoints={{640:{slidesPerView:2},768:{slidesPerView:4},1024:{slidesPerView:5},1280:{slidesPerView:6}}}
            >
                {data.map((category) => <SwiperSlide>

 <Card className="w-full max-w-sm cursor-pointer">
      <CardHeader>
        <CardDescription>
         <img className='h-30 w-30 mx-auto object-cover rounded-full' src={category.image} />
        </CardDescription>
         <CardContent className='mx-auto my-2'>
      {category.name}
      </CardContent>
      </CardHeader>
    </Card>

                </SwiperSlide>)}
            </Swiper>
        </>
    )
}



     