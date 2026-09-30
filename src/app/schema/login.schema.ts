import path from "path";
import z, { object } from "zod";
export const loginSchema = z.object({
    email:z.string().min(1,"email is required").pipe(z.email("invalid email")),
    password:z.string().min(1,"password is required").min(6,"name must be at least 6 character"),
   })

export type loginSchemaType = z.infer<typeof loginSchema>