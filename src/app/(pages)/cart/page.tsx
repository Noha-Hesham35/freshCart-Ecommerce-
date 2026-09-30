
import CartTable from '@/app/_components/CartTable/CartTable'
import { GetLoggedUserCart } from '@/cartAction/GetLoggedUserCart.Action'

export default async function Cart() {
const response = await GetLoggedUserCart()
  return (
    <CartTable cart={response}/>
  )
}
