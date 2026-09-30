"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { DollarSign, LoaderCircle, LogIn } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import  { useState } from 'react'
import {Controller, useForm} from "react-hook-form"

import { checkOutSchema, CheckOutSchemaType } from '@/app/schema/checkOut.schema'
import { toast } from 'react-toastify'
import { onlinePayment } from '@/CheckOutAction/CheckOutSession.action'


export default function CheckOut() {
  const {id} : {id:string} = useParams()
const [isLoating, setIsLoating] = useState(false)
  const form = useForm<CheckOutSchemaType>({
    defaultValues:{
      details:"",
      phone:"",
      city:""
    },
    resolver:zodResolver(checkOutSchema),
    mode:"all"
  })

const router = useRouter()
const handleCheckOut = async (values:CheckOutSchemaType)=>{
  setIsLoating(true)
try {
    setIsLoating(true)
 const response = await onlinePayment( id ,"http://localhost:3000" , values)
  if(response.status=='success')
  {
    window.location.href = response.session.url
toast.success("login successfully",{position:'top-right',delay:2000,autoClose:1500})
  }
  else{
toast.error(response?.error || "login failed",{position:'top-right',delay:2000,autoClose:1000})
  }
} catch (error) {
  toast.error( "login failed",{position:'top-right',delay:2000,autoClose:1000})
}finally{
  setIsLoating(false)
}
}

  interface FormFields {
    name: "details"|"phone"|"city",
    type:string,
    placeholder:string,
    autoComplete:string,
  }

  const formFields :FormFields[] = [
    {name:"details" , type:"text" , placeholder:"Enter your Details" , autoComplete:"details"},
    {name:"phone" , type:"tel" , placeholder:"Enter your Phone" , autoComplete:"phone"},
    {name:"city" , type:"text" , placeholder:"Enter your City" , autoComplete:"city"},
  ]

  return (
<>
<div className='w-[90%] lg:w-[60%] mx-auto my-6 px-5 shadow-2xl rounded-2xl'>
  <h1 className='text-2xl font-semibold  text-center pt-5 text-green-600'>CheckOut</h1>
<form className='my-4' onSubmit={form.handleSubmit(handleCheckOut)}>
{formFields.map((myInput)=><Controller
key={myInput.name}
  name={myInput.name}
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <Input
      className='mt-3 p-5'
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
/>)}

<Button disabled={isLoating} type='submit' className="my-5 bg-green-600 hover:bg-green-500  cursor-pointer w-full p-5 text-[19px] font-bold">{isLoating ? <LoaderCircle className='animate-spin'/> :<>Pay Now <DollarSign/></>}</Button>

</form>
</div>

</> 
 )
}
