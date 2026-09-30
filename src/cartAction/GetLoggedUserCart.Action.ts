"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"
export async function GetLoggedUserCart()
{
const token = await getMyToken()
if(!token)
{
    throw new Error ("login first")
}
const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,
    {
        method:"GET",
        headers:{
        token,
        "content-type" : "application/json"
        },
    })
    const payLoad = await response.json()
    return payLoad
}