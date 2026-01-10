import { ApiError } from "../utils/apiError.js";

export const payloadValidator = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      throw new ApiError(400, "Payload Validation Failed", errors);
    }

    next(); 
  };
};
