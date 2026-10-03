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

import Link from 'next/link';

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
                {data.map((category) => (
                  <SwiperSlide key={category._id}>
                    <Link href={`/categories/${category._id}`} className='block'>
                      <Card className="w-full max-w-sm cursor-pointer hover:shadow-md transition-all group">
                        <CardHeader>
                          <CardDescription>
                            <img className='h-30 w-30 mx-auto object-cover rounded-full group-hover:scale-105 transition-transform duration-300' src={category.image} alt={category.name} />
                          </CardDescription>
                          <CardContent className='mx-auto my-2 group-hover:text-green-600 transition-colors'>
                            {category.name}
                          </CardContent>
                        </CardHeader>
                      </Card>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}



     