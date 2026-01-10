import { z } from "zod";

export const loginSchema = z.object({
  login_id: z
    .string()
    .trim()
    .min(3, "Username or Email is required")
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_]+$/.test(value), {
      message: "Login ID must be a valid email or username",
    }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, "Password must contain letters and numbers only"),
});
