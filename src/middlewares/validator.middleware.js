//* Import custom API error class for structured error handling
import { ApiError } from "../utils/apiError.js";

//* Payload validation middleware
export const payloadValidator = (schema) => {
  //* Return actual middleware function
  return (req, res, next) => {
    //* Validate incoming request body using Zod's safeParse
    const result = schema.safeParse(req.body);

    //* If validation fails
    if (!result.success) {
      //* Extract readable error details from Zod error object
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."), // Field name (supports nested fields)
        message: err.message, // Validation error message
      }));

      //* Throw standardized API error with 400 status code
      throw new ApiError(400, "Payload Validation Failed", errors);
    }

    //* If validation passes, move to next middleware/controller
    next();
  };
};
