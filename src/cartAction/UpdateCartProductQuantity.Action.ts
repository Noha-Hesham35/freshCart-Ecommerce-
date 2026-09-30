"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"
export async function UpdateCartProductQuantity(id:string , count:number)
{
const token = await getMyToken()
if(!token)
{
    throw new Error ("login first")
}
const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,
    {
        method:"PUT",
        headers:{
        token,
        "content-type" : "application/json"
        },
        body:JSON.stringify({count:count})
        })
    const payLoad = await response.json()
    return payLoad
}