"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"
export async function ClearUserCart()
{
    const token = await getMyToken()
    if(!token)
    {
throw new Error
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,
        {
            method:"DELETE",
            headers:{
                token,
                "content-type" :"application/json"
            }
        }
    )
    const payLoad = await response.json()
    return payLoad
}