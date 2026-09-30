export const getAllBrands = async()=>{
    let response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
    let data = await response.json()
    return data
}