import * as z from "zod";

export const registerSchema = z
  .object({
    companyName: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    companyPhone: z.number().gte(9, { message: "Invalid phone number min 9 character}" }),

    password: z.string().min(6, { message: "Password is required" }),
    confirmPassword: z.string().min(6, { message: "Retype password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
