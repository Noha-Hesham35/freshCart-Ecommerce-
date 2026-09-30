import getMyToken from "@/utilities/GetMyToken.utilities";
interface Shipping
{
    details:string,
    phone:string,
    city:string
}
export async function onlinePayment(cardId:string,URL:string,values:Shipping)
{
    const token = await getMyToken()
    if(!token)
    {
        return null
    }
    const respone = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${URL}`,
        {
            method:"POST",
            headers:{
                token,
                "Content-type" :"application/json"
            },
            body:JSON.stringify({shippingAddress:values})
        }
    )
    const payLoad = await respone.json()
    return payLoad
}