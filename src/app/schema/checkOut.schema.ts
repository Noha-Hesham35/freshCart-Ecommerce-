import path from "path";
import z, { object } from "zod";
export const checkOutSchema = z.object({
    details:z.string().min(1,"details is required"),
    phone:z.string().min(1,"phone is required").regex(/01[0125][0-9]{8}$/,"invalid number"),
    city:z.string().min(1,"city is requird"),
})

export type CheckOutSchemaType = z.infer<typeof checkOutSchema>