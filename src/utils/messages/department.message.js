const DEPARTMENT_MESSAGE = {
  /* ============= CREATE=========================*/
  CREATED: "Department created successfully.",
  CREATE_FAILED: "Unable to create department. Please try again later.",

  /**=========== */
  ALREADY_EXIST :"Department already exist",
  /*============= FETCH=========================*/
  FETCH_ALL_SUCCESS: "Departments fetched successfully.",
  FETCH_SINGLE_SUCCESS: "Department details fetched successfully.",
  NOT_FOUND: "Department not found.",

  /*============ UPDATE =========================*/
  UPDATED: "Department updated successfully.",
  UPDATE_FAILED: "Unable to update department. Please try again later.",

  /*=========== DELETE=========================*/
  DELETED: "Department deleted successfully.",
  DELETE_FAILED: "Unable to delete department. Please try again later.",
  DELETE_BLOCKED: "Department cannot be deleted because doctors are assigned to it.",

  /*=========== VALIDATION=========================*/
  NAME_REQUIRED: "Department name is required.",
  NAME_STRING: "Department name must be a valid string.",
  NAME_MIN: "Department name must contain at least 2 characters.",
  NAME_MAX: "Department name must not exceed 100 characters.",
  NAME_TRIM: "Department name must not contain leading or trailing spaces.",
  FEES_REQUIRED: "Department consultation fee is required.",
  FEES_NUMBER: "Department consultation fee must be a valid number.",
  FEES_POSITIVE: "Department consultation fee must be greater than zero.",
  FEES_INVALID: "Invalid department consultation fee value.",
  DESCRIPTION_STRING: "Department description must be a valid string.",
  DESCRIPTION_MAX: "Department description must not exceed 500 characters.",
  ID_REQUIRED: "Department ID is required.",
  ID_INVALID: "Invalid department ID format.",

  /*=====================*/
  IN_USE: "Department is currently in use and cannot be modified.",
  UNAUTHORIZED: "You are not authorized to perform this action on departments.",
  FORBIDDEN: "Access denied. Admin privileges required.",

  /*=============== GENERIC MESSAGE=====================*/
  SOMETHING_WENT_WRONG: "Something went wrong. Please contact support.",
  INVALID_PAYLOAD: "Invalid department data provided.",
};

export default DEPARTMENT_MESSAGE;