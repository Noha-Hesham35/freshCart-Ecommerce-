import getMyToken from "@/utilities/GetMyToken.utilities";


export async function Removeproductfromwishlist(id:string)
{
    const token = await getMyToken()
    if(!token)
    {
        throw new Error('login first')
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
            method:"DELETE",
            headers:{
                token,
                "Content-type" : "application/json"
            }
        }
    )
    const payLoad = await response.json()
    return payLoad
}
