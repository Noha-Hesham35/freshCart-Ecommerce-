import z from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(1, "New password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(1, "Please confirm your new password")
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "New password and confirmation do not match"
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
