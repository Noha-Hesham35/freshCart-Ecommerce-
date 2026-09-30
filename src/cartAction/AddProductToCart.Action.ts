"use server"
import getMyToken from "@/utilities/GetMyToken.utilities"

export async function AddProductToCart(id: string) {
    const token = await getMyToken()
    if (!token) {
        throw new Error("login first")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "POST",
        headers: {
            token,
            "content-type": "application/json"
        },
        body: JSON.stringify({ productId: id })
    })

    const payLoad = await response.json()
    return payLoad

}