"use client"
export default function error({error}:{error:Error}) {
  return (
    <>
    <div className='h-screen flex items-center justify-center rounded-2xl w-[90%] mx-auto'>
<h1 className='text-2xl p-5 bg-red-500'>{error.message}</h1>
    </div>
    
    </>
  )
}
