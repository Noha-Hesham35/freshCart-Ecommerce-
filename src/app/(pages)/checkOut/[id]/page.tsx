"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Banknote, CheckCircle2, CreditCard, DollarSign, LoaderCircle, ShieldCheck } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { checkOutSchema, CheckOutSchemaType } from '@/app/schema/checkOut.schema'
import { toast } from 'react-toastify'
import { onlinePayment } from '@/CheckOutAction/CheckOutSession.action'
import { createCashOrder } from '@/CheckOutAction/CashOrder.action'

export default function CheckOut() {
  const { id }: { id: string } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash")
  const router = useRouter()

  const form = useForm<CheckOutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: ""
    },
    resolver: zodResolver(checkOutSchema),
    mode: "all"
  })

  const handleCheckOut = async (values: CheckOutSchemaType) => {
    setIsLoading(true)
    try {
      if (paymentMethod === "cash") {
        const response = await createCashOrder(id, values)
        if (response?.status === "success") {
          toast.success("Order placed successfully!", { position: 'top-right', autoClose: 2000 })
          setTimeout(() => {
            router.push("/allorders")
          }, 1500)
        } else {
          toast.error(response?.message || "Failed to place cash order", { position: 'top-right', autoClose: 2000 })
        }
      } else {
        const origin = typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000"
        const response = await onlinePayment(id, origin, values)
        if (response?.status === "success") {
          toast.success("Redirecting to payment gateway...", { position: 'top-right', autoClose: 1500 })
          setTimeout(() => {
            window.location.href = response.session.url
          }, 1000)
        } else {
          toast.error(response?.message || response?.error || "Failed to initiate online payment", { position: 'top-right', autoClose: 2000 })
        }
      }
    } catch (error) {
      toast.error("Checkout failed, please try again", { position: 'top-right', autoClose: 2000 })
    } finally {
      setIsLoading(false)
    }
  }

  interface FormFields {
    name: "details" | "phone" | "city"
    type: string
    placeholder: string
    autoComplete: string
    label: string
  }

  const formFields: FormFields[] = [
    { name: "details", type: "text", placeholder: "e.g. Street name, building number", autoComplete: "street-address", label: "Address Details" },
    { name: "phone", type: "tel", placeholder: "e.g. 01012345678", autoComplete: "tel", label: "Phone Number" },
    { name: "city", type: "text", placeholder: "e.g. Cairo, Giza, Alexandria", autoComplete: "address-level2", label: "City" },
  ]

  return (
    <>
      <div className='w-[90%] lg:w-[60%] mx-auto my-8 px-6 py-6 shadow-xl border border-gray-100 rounded-3xl bg-white'>
        <div className='text-center pb-4 border-b border-gray-100'>
          <h1 className='text-3xl font-bold text-gray-800'>Checkout</h1>
          <p className='text-gray-500 text-sm mt-1'>Choose your payment method and enter delivery address</p>
        </div>
        <div className='my-6'>
          <h2 className='text-sm font-semibold text-gray-700 mb-3'>Payment Method:</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div
              onClick={() => setPaymentMethod("cash")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                paymentMethod === "cash"
                  ? "border-green-600 bg-green-50/50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className='flex items-center gap-3'>
                <div className={`p-3 rounded-xl ${paymentMethod === "cash" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                  <Banknote size={24} />
                </div>
                <div>
                  <h3 className='font-bold text-gray-800 text-base'>Cash on Delivery</h3>
                  <p className='text-xs text-gray-500'>Pay with cash upon arrival</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "cash" ? "border-green-600" : "border-gray-300"
              }`}>
                {paymentMethod === "cash" && <div className='w-2.5 h-2.5 rounded-full bg-green-600' />}
              </div>
            </div>
            <div
              onClick={() => setPaymentMethod("card")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                paymentMethod === "card"
                  ? "border-green-600 bg-green-50/50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className='flex items-center gap-3'>
                <div className={`p-3 rounded-xl ${paymentMethod === "card" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className='font-bold text-gray-800 text-base'>Pay with Card</h3>
                  <p className='text-xs text-gray-500'>Visa, MasterCard, Online</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "card" ? "border-green-600" : "border-gray-300"
              }`}>
                {paymentMethod === "card" && <div className='w-2.5 h-2.5 rounded-full bg-green-600' />}
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={form.handleSubmit(handleCheckOut)}>
          <h2 className='text-sm font-semibold text-gray-700 mb-2'>Shipping Address:</h2>
          {formFields.map((myInput) => (
            <Controller
              key={myInput.name}
              name={myInput.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='my-3'>
                  <label htmlFor={field.name} className='text-xs font-semibold text-gray-600 mb-1 block'>
                    {myInput.label}
                  </label>
                  <Input
                    className='p-4 rounded-xl border-gray-200'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={myInput.placeholder}
                    autoComplete={myInput.autoComplete}
                    type={myInput.type}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          ))}

          <Button
            disabled={isLoading}
            type='submit'
            className="my-5 bg-green-600 hover:bg-green-700 cursor-pointer w-full py-6 text-lg font-bold rounded-2xl shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <LoaderCircle className='animate-spin' />
            ) : paymentMethod === "cash" ? (
              <>
                Confirm Cash Order <Banknote size={20} />
              </>
            ) : (
              <>
                Proceed to Online Payment <CreditCard size={20} />
              </>
            )}
          </Button>
          <div className='flex items-center justify-center gap-2 text-xs text-gray-400 text-center'>
            <ShieldCheck size={16} className='text-green-600' />
            <span>Guaranteed safe and secure checkout</span>
          </div>
        </form>
      </div>
    </>
  )
}
