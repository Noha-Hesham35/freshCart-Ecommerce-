"use server"
export async function getUserOrders(id:string)
{

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    const payLoad = await response.json()
    return payLoad
}