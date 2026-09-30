"use client"
import {  ResetNewPassword} from '@/AuthenticationAction/Authentication.action'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter()
    async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await ResetNewPassword(email,newPassword)
        if (response.token) {
            toast.success("Password changed Successfully")
            router.push('/login')
        }
        else {
            toast.error("Password failed changed")
        }
    }
    return (
        <>
            <div className='w-[50%] mx-auto mt-30'>
                <h1 className='text-center font-bold text-2xl'>Reset Code</h1>
                <form onSubmit={handelSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-[#364153]  font-semibold text-[15px] p-2'>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' id="email" placeholder='Enter your Email' className='rounded-xl border border-slate-500 py-2 px-5' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="newPassword" className='text-[#364153]  font-semibold text-[15px] p-2'>New Password</label>
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type='text' id="newPassword" placeholder='Enter your New Password' className='rounded-xl border border-slate-500 py-2 px-5' />
                    </div>
                    <button className="bg-green-600 text-white hover:bg-green-700 mt-3 w-full py-2 rounded-2xl text-[18px] hover:cursor-pointer">Confirm Reset Code</button>
                </form>
            </div>


        </>
    )
}
