"use server"
import getMyToken from "@/utilities/GetMyToken.utilities"

export async function ForgetMyPassword(email: string) {
    const response = await fetch(`${process.env.API}/auth/forgotPasswords`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    const payLoad = await response.json()
    return payLoad
}

export async function VerifyResetCode(resetCode: string) {
    const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode })
    })
    const payLoad = await response.json()
    return payLoad
}

export async function ResetNewPassword(email: string, newPassword: string) {
    const response = await fetch(`${process.env.API}/auth/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
    })
    const payLoad = await response.json()
    return payLoad
}

export interface UpdateUserDataPayload {
    name: string
    email: string
    phone: string
}

export async function UpdateUserData(values: UpdateUserDataPayload) {
    const token = await getMyToken()
    if (!token) {
        throw new Error("login first")
    }
    const response = await fetch(`${process.env.API}/users/updateMe/`, {
        method: "PUT",
        headers: {
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })
    const payLoad = await response.json()
    return payLoad
}

export interface UpdateUserPasswordPayload {
    currentPassword: string
    password: string
    rePassword: string
}

export async function UpdateUserPassword(values: UpdateUserPasswordPayload) {
    const token = await getMyToken()
    if (!token) {
        throw new Error("login first")
    }
    const response = await fetch(`${process.env.API}/users/changeMyPassword`, {
        method: "PUT",
        headers: {
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })
    const payLoad = await response.json()
    return payLoad
}