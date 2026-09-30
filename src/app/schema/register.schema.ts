import path from "path";
import z, { email, object } from "zod";

export const registerSchema = z.object({
name:z
    .string()
    .min(3,"name must be at least 3 character")
    .max(10,"name must be at most 10 character")
    .min(1,"name is required"),
    email:z.string().min(1,"email is required").pipe(z.email("invalid email")),
    password:z.string().min(1,"password is required").min(6,"name must be at least 6 character"),
    rePassword:z.string().min(1,"rePassword is required"),
    phone:z.string().min(1,"phone is required").regex(/^01[0125][0-9]{8}$/,"phone must be an egyptian number")
}).refine((object)=>object.password === object.rePassword,{
    path:["rePassword"],
    error:"password and rePassword must be same"
})


export type registerSchemaType = z.infer<typeof registerSchema>