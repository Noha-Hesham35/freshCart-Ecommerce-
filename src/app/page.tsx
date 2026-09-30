import Image from "next/image";
import MainSlider from "./_components/mainSlider/mainSlider";
import AllCategories from "./_components/allGategories/allGategories";
import AllProducts from "./_components/allProducts/allProducts";

export default function Home() {
  return (
   <>
 <MainSlider/>
 <AllCategories/>
 <AllProducts/>
   </>
  );
}
