"use client"
import {  VerifyResetCode } from '@/AuthenticationAction/Authentication.action'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function VerifyCode() {
    const [resetCode, setResetCode] = useState("")
    const router = useRouter()
    async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await VerifyResetCode(resetCode)
        if (response.status == "Success") {
            toast.success("Verify Code Successfully")
            router.push(`/resetPassword`)
        }
        else {
            toast.error('Verify Code failed')
        }
    }
    return (
        <>
            <div className='w-[50%] mx-auto mt-30'>
                <h1 className='text-center font-bold text-2xl'>Reset Code</h1>
                <form onSubmit={handelSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="resetCode" className='text-[#364153]  font-semibold text-[15px] p-2'>Reset Code</label>
                        <input value={resetCode} onChange={(e) => setResetCode(e.target.value)} type='text' id="resetCode" placeholder='Enter your Code' className='rounded-xl border border-slate-500 py-2 px-5' />
                    </div>

                    <button className="bg-green-600 text-white hover:bg-green-700 mt-3 w-full py-2 rounded-2xl text-[18px] hover:cursor-pointer">Confirm Reset Code</button>
                </form>
            </div>


        </>
    )
}
