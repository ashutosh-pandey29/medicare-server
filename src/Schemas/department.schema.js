import { z } from "zod";
import { DEPARTMENT_MESSAGE } from "../utils/messages/department.message.js";

export const departmentValidationSchema = z.object({
  departmentName: z
    .string(DEPARTMENT_MESSAGE.NAME_REQUIRED)
    .min(1, DEPARTMENT_MESSAGE.NAME_MIN)
    .max(100, DEPARTMENT_MESSAGE.NAME_MAX)
    .transform((val) => val.trim()),
  departmentFees: z.coerce
    .number({ invalid_type_error: DEPARTMENT_MESSAGE.FEES_INVALID })
    .min(0, DEPARTMENT_MESSAGE.FEES_POSITIVE)
    .max(1000000, DEPARTMENT_MESSAGE.FEES_MAX),

  departmentDescription: z
    .string()
    .max(500, DEPARTMENT_MESSAGE.DESCRIPTION_MAX)
    .optional()
    .transform((val) => val.trim()),
});
