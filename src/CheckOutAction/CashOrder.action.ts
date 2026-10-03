"use server"
import getMyToken from "@/utilities/GetMyToken.utilities"

export interface ShippingAddress {
    details: string
    phone: string
    city: string
}

export async function createCashOrder(cartId: string, values: ShippingAddress) {
    const token = await getMyToken()
    if (!token) {
        return null
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ shippingAddress: values })
    })
    const payload = await response.json()
    return payload
}
