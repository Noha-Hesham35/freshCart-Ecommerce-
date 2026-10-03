import { getUserOrders } from "@/CheckOutAction/getUserOrders.action"
import getMyToken from "@/utilities/GetMyToken.utilities"
import { jwtDecode } from "jwt-decode"
import Image from "next/image"
import Link from "next/link"
import { Banknote, CheckCircle2, Clock, CreditCard, MapPin, MoveRight, Package, PackageOpen, Phone, Truck } from "lucide-react"

type OrderItem = {
  _id: string
  count: number
  price: number
  product: { _id: string; title: string; imageCover: string }
}

type Order = {
  _id: string
  id: number
  createdAt: string
  totalOrderPrice: number
  paymentMethodType: "cash" | "card"
  isPaid: boolean
  isDelivered: boolean
  shippingAddress?: { details?: string; city?: string; phone?: string }
  cartItems: OrderItem[]
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function Badge({ done, doneText, pendingText, DoneIcon, PendingIcon }: {
  done: boolean
  doneText: string
  pendingText: string
  DoneIcon: typeof Truck
  PendingIcon: typeof Clock
}) {
  const Icon = done ? DoneIcon : PendingIcon
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        done ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
      }`}
    >
      <Icon size={14} />
      {done ? doneText : pendingText}
    </span>
  )
}

function OrderCard({ order }: { order: Order }) {
  const itemsCount = order.cartItems.reduce((sum, item) => sum + item.count, 0)

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
        <div>
          <h2 className="text-lg font-bold">Order #{order.id}</h2>
          <p className="text-sm font-semibold text-[#6a7282]">
            Placed on {formatDate(order.createdAt)} · {itemsCount} {itemsCount === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge done={order.isPaid} doneText="Paid" pendingText="Unpaid" DoneIcon={CheckCircle2} PendingIcon={Clock} />
          <Badge done={order.isDelivered} doneText="Delivered" pendingText="On its way" DoneIcon={Package} PendingIcon={Truck} />
        </div>
      </header>
      <ul className="divide-y divide-gray-100 px-5">
        {order.cartItems.map((item) => (
          <li key={item._id} className="flex items-center gap-4 py-4">
            <Image
              width={80}
              height={80}
              src={item.product.imageCover}
              alt={item.product.title}
              className="h-16 w-16 rounded-xl border border-gray-100 bg-white object-contain md:h-20 md:w-20"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{item.product.title}</p>
              <p className="text-sm font-semibold text-[#6a7282]">Qty: {item.count}</p>
            </div>
            <p className="whitespace-nowrap font-bold text-green-600">{item.price * item.count} EGP</p>
          </li>
        ))}
      </ul>
      <footer className="flex flex-wrap items-end justify-between gap-4 border-t border-gray-100 px-5 py-4">
        <div className="space-y-1.5 text-sm font-semibold text-[#6a7282]">
          {order.shippingAddress?.city && (
            <p className="flex items-center gap-2">
              <MapPin size={16} />
              {order.shippingAddress.details ? `${order.shippingAddress.details}, ` : ""}
              {order.shippingAddress.city}
            </p>
          )}
          {order.shippingAddress?.phone && (
            <p className="flex items-center gap-2">
              <Phone size={16} />
              {order.shippingAddress.phone}
            </p>
          )}
          <p className="flex items-center gap-2">
            {order.paymentMethodType === "card" ? <CreditCard size={16} /> : <Banknote size={16} />}
            {order.paymentMethodType === "card" ? "Paid by card" : "Cash on delivery"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-[#6a7282]">Order total</p>
          <p className="text-2xl font-bold text-green-600">{order.totalOrderPrice} EGP</p>
        </div>
      </footer>
    </article>
  )
}

export default async function Allorders() {
  const token = await getMyToken()
  if (!token) {
    return (
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold">Log in to see your orders</h2>
        <Link href="/login" className="mt-6 inline-block rounded-2xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700">
          Log in
        </Link>
      </div>
    )
  }

  const { id } = jwtDecode<{ id: string }>(token)
  const response = await getUserOrders(id)
  const orders: Order[] = Array.isArray(response) ? response : response?.data ?? []
  const sorted = [...orders].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))

  return (
    <div className="mx-auto mt-8 w-[90%] max-w-4xl pb-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-[#16A34A] p-3">
          <Package color="white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          {sorted.length > 0 && (
            <p className="font-semibold text-[#6a7282]">
              You have <span className="text-green-600">{sorted.length} {sorted.length === 1 ? "order" : "orders"}</span>
            </p>
          )}
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-[#F3F4F6] p-10">
            <PackageOpen color="gray" size="50px" />
          </div>
          <h2 className="text-2xl font-bold">No orders yet</h2>
          <p className="font-semibold text-[#6a7282]">When you place an order, it will show up here.</p>
          <Link href="/" className="mt-4 flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700">
            Start Shopping <MoveRight color="white" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {sorted.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}