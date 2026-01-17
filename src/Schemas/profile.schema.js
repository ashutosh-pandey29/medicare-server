import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const doctorProfileValidation = z.object({
  doctorName: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name can't exceed 30 characters"),

  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

  gender: z
    .string()
    .nonempty("Gender is required")
    .refine((val) => ["M", "F"].includes(val), {
      message: "Invalid gender option",
    }),

  experience: z.coerce
    .number({ required_error: "Experience is required" })
    .min(0, "Experience can't be negative")
    .max(60, "Invalid experience"),

  bio: z
    .string()
    .trim()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio can't exceed 500 characters"),

  education: z
    .array(
      z.object({
        degree: z.string().trim().min(2, "Degree is required"),
        college: z.string().trim().min(3, "College name is required"),
        year: z.coerce
          .number()
          .min(1950, "Invalid year")
          .max(new Date().getFullYear(), "Invalid year"),
      })
    )
    .min(1, "At least one education entry is required"),

  workingTime: z
    .array(
      z.object({
        day: z.string().nonempty("Day is required"),

        slots: z
          .array(
            z
              .object({
                from: z
                  .string()
                  .nonempty("From time is required")
                  .regex(timeRegex, "Invalid time format"),

                to: z
                  .string()
                  .nonempty("To time is required")
                  .regex(timeRegex, "Invalid time format"),
              })
              .refine((data) => toMinutes(data.to) > toMinutes(data.from), {
                message: "End time must be after start time",
                path: ["to"],
              })
          )
          .min(1, "At least one slot is required"),
      })
    )
    .min(1, "Select at least one working day"),
});
