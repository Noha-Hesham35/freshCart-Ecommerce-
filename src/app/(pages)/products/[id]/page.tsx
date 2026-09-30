import { getProductDetails } from '@/api/getProductDetails.api'
import SwiperSlider from '@/app/_components/swiperSlider/swiperSlider'

export default async function ProductDetails({params}:{params:Promise<{id:string}>}) {
  let {id} = await params
  let {data} = await getProductDetails(id)
  return (
    <>
    <SwiperSlider data={data}/>
    </>
  )
}
