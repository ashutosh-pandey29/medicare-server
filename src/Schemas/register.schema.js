import { z } from "zod";

export const registrationSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Username must contain letters and numbers only"
    ),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[^\s]+$/,
      "Password must contain letters and numbers, no spaces"
    ),
});
