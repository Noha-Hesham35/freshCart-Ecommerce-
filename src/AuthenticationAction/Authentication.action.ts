"use server"
export async function ForgetMyPassword(email:string)
{
    const response = await fetch(`${process.env.API}/auth/forgotPasswords`,
        {
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({email})
        }
    )
    const payLoad = await response.json()
    return payLoad
}



export async function VerifyResetCode(resetCode:string)
{
    const response = await fetch(`${process.env.API}/auth/verifyResetCode`,
        {
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({resetCode})
        }
    )
    const payLoad = await response.json()
    return payLoad
}


export async function ResetNewPassword(email:string,newPassword:string)
{
    const response = await fetch(`${process.env.API}/auth/resetPassword`,
        {
            method:"PUT",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({email,newPassword})
        }
    )
    const payLoad = await response.json()
    return payLoad
}