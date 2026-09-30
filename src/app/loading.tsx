import { ThreeDots } from 'react-loader-spinner'

export default function Loading() {
  return (
    <>
    <div className='h-screen w-[90%] mx-auto flex items-center justify-center'>
      <div>
        <ThreeDots
visible={true}
height="80"
width="80"
color="#4fa94d"
radius="9"
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClass=""
/>
      </div>
    </div>
    </>
  )
}
