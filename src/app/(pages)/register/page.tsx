"use client"
import { registerSchema, registerSchemaType } from '@/app/schema/register.schema'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, MailBadge } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {Controller, useForm} from "react-hook-form"
import { toast } from 'react-toastify'
export default function Register() {
const [isLoating, setIsLoating] = useState(false)
  const form = useForm({
    defaultValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    resolver:zodResolver(registerSchema),
    mode:"all"
  })
const router = useRouter()
const handleRegister = async (values:registerSchemaType)=>{
setIsLoating(true)
try {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
    method:"POST",
    body: JSON.stringify(values),
    headers:{"content-type" : "application/json"}
  })
  const data = await response.json()
if(data.message=='success')
{
toast.success("Account Created Successfully")
setTimeout(()=>{
router.push("/login")
},2000)
}

else if(data.message== 'Account Already Exists')
{
toast.error("Account Already Exists")
}
  
} catch (error) {
  toast.error("Account failed to create")
}finally{
  setIsLoating(false)
}

}

  interface FormFields {
    name: "name"|"email"|"password"|"rePassword"|"phone",
    type:string,
    placeholder:string,
    autoComplete:string,
  }






  const formFields :FormFields[] = [
    {name:"name" , type:"text" , placeholder:"Enter your Name" , autoComplete:"name"},
    {name:"email" , type:"email" , placeholder:"Enter your Email" , autoComplete:"email"},
    {name:"password" , type:"password" , placeholder:"Enter your Password" , autoComplete:"new-password"},
    {name:"rePassword" , type:"password" , placeholder:"Enter your rePassword" , autoComplete:"new-password"},
    {name:"phone" , type:"tel" , placeholder:"Enter your Phone" , autoComplete:"phone"},
  ]




  return (
<>
<div className='w-[90%] lg:w-[60%] mx-auto my-6 px-5 shadow-2xl rounded-2xl'>
  <h1 className='text-2xl font-semibold text-[#364153] text-center '>Create Your Account</h1>
  <p className='text-[#364153] text-center '>Start your fresh journey with us today</p>
<form className='my-4' onSubmit={form.handleSubmit(handleRegister)}>
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

<Button disabled={isLoating} type='submit' className="bg-green-600 hover:bg-green-500 mt-3 cursor-pointer w-full p-5 text-xl">{isLoating ? <LoaderCircle className='animate-spin'/> :<>SignUp <MailBadge /></>}</Button>
<p className='text-[#4a5565] text-center mt-3 '>Already have an account <Link href={"/login"} className='text-green-500 font-semibold'>SingIn Now</Link>     </p>

</form>
</div>

</> 
 )
}
