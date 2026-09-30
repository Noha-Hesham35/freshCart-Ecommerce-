"use client"
import { ForgetMyPassword } from '@/AuthenticationAction/Authentication.action'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ForgetPassword() {
    const [email, setEmail] = useState("")
    const router = useRouter()
    async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await ForgetMyPassword(email)
        if (response.statusMsg == "success") {
            toast.success(response.message)
            router.push(`/verifyResetCode?${email}`)
        }
        else {
            toast.error(response.message)
        }
    }
    return (
        <>
            <div className='w-[50%] mx-auto mt-30'>
                <h1 className='text-center font-bold text-2xl'>Forgot Password?</h1>
                <p className='text-center text-[#4a5565]'>No worries, we'll send you a reset code</p>
                <form onSubmit={handelSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="forgetpass" className='text-[#364153]  font-semibold text-[15px] p-2'>Email Address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' id="forgetpass" placeholder='Enter your email address' className='rounded-xl border border-slate-500 py-2 px-5' />
                    </div>

                    <button className="bg-green-600 text-white hover:bg-green-700 mt-3 w-full py-2 rounded-2xl text-[18px] hover:cursor-pointer">Send Reset Code</button>
                </form>
            </div>


        </>
    )
}
