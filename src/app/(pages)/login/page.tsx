"use client"
import { loginSchema, loginSchemaType } from '@/app/schema/login.schema'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import  { useState } from 'react'
import {Controller, useForm} from "react-hook-form"
import { toast } from 'react-toastify'
import {signIn} from "next-auth/react"
export default function Login() {
const [isLoating, setIsLoating] = useState(false)
  const form = useForm<loginSchemaType>({
    defaultValues:{
      email:"",
      password:""
    },
    resolver:zodResolver(loginSchema),
    mode:"all"
  })

const router = useRouter()

const handleLogin = async (values:loginSchemaType)=>{
  setIsLoating(true)

try {
 const response = await signIn("credentials",{
email:values.email,
password:values.password,
redirect:false,
callbackUrl:"/"
  })
  if(response?.ok)
  {
toast.success("login successfully",{position:'top-right',delay:2000,autoClose:1500})
setTimeout(() => {
  router.push("/")
}, 2000);
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
    name: "email"|"password",
    type:string,
    placeholder:string,
    autoComplete:string,
  }

  const formFields :FormFields[] = [
    {name:"email" , type:"email" , placeholder:"Enter your Email" , autoComplete:"email"},
    {name:"password" , type:"password" , placeholder:"Enter your Password" , autoComplete:"new-password"},
  ]

  return (
<>
<div className='w-[90%] lg:w-[60%] mx-auto my-6 px-5 shadow-2xl rounded-2xl'>
  <h1 className='text-2xl font-semibold text-[#364153] text-center pt-5'><span className='text-green-500'>FreshCart</span> Welcome Back!</h1>
  <p className='text-[#364153] text-center '>Sign in to continue your fresh shopping experience</p>
<form className='my-4' onSubmit={form.handleSubmit(handleLogin)}>
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
<Link href={"/forgetPassword"}><p className='text-green-500 hover:cursor-pointer my-1 text-[15px] mx-3 font-semibold'>Forget Password?</p></Link>
<Button disabled={isLoating} type='submit' className="bg-green-600 hover:bg-green-500 mt-3 cursor-pointer w-full p-5 text-xl">{isLoating ? <LoaderCircle className='animate-spin'/> :<>Login <LogIn /></>}</Button>
<p className='text-[#4a5565] text-center mt-3 '>New to FreshCart? <Link href={"/register"} className='text-green-500 font-semibold'>Create an account</Link>     </p>

</form>
</div>

</> 
 )
}
