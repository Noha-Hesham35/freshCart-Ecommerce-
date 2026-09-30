"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"
export async function Getwishlist()
{
    const token = await getMyToken()
    if(!token)
    {
        return { data: [] }
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            method:"GET",
            headers:{
                token,
                "Content-type" : "application/json"
            }
        })
        const payLoad = await response.json()
        return payLoad
}
