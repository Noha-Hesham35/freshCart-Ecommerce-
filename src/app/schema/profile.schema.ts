import z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number (e.g. 01012345678)")
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
