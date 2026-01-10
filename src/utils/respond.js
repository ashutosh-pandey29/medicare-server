/**
 *  * Purpose:
 *   Provides a centralized, uniform way to send API responses in your Express controllers.
 *   Reduces repetition and keeps controllers clean.
 *   Differentiates between successful responses and logical failures.
 *
 *  *Usage:
 *  // For success responses
 *  respond.success(res,  message: "Operation successful", data: result, statusCode: 200 );
 *
 *  // For failed responses
 *  respond.fail(res,  message: "Something went wrong", errors: errorDetails, statusCode: 400 );
 *
 */

export const respond = {
  success: (res, { statusCode = 200, message = "success", data = null } = {}) => {
    return res.status(statusCode).json({
      success: true,
      status: statusCode,
      message,
      data,
    });
  },

  fail: (res, { statusCode = 400, message = "failed", errors = [] } = {}) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  },
};
