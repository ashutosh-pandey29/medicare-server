export const DOCTOR_MESSAGE = {
  /* =====================================================
     PROFILE
  ===================================================== */
  PROFILE_CREATED: "Doctor profile created successfully. Admin verification is pending.",
  PROFILE_UPDATED: "Doctor profile updated successfully.",
  PROFILE_FETCHED: "Doctor profile fetched successfully.",
  PROFILE_DELETION_REQUESTED:
    "Profile deletion request sent to admin. You can delete your profile after approval.",

  PROFILE_NOT_CREATED: "Doctor profile could not be created.",
  PROFILE_NOT_UPDATED: "Doctor profile could not be updated.",
  PROFILE_NOT_FOUND: "Doctor profile not found.",
  PROFILE_ALREADY_EXISTS: "Doctor profile already exists.",
  PROFILE_INACTIVE: "Doctor profile is currently inactive.",
  PROFILE_UNDER_REVIEW: "Doctor profile is under admin review.",

  /* =====================================================
     VERIFICATION
  ===================================================== */
  VERIFICATION_PENDING: "Doctor profile verification is pending.",
  VERIFICATION_APPROVED: "Doctor profile has been verified and approved.",
  VERIFICATION_REJECTED: "Doctor profile verification was rejected. Please update your details.",
  VERIFICATION_REQUIRED: "Doctor profile verification is required to proceed.",
  VERIFICATION_FAILED: "Doctor profile verification failed.",

  /* =====================================================
     AUTH / ACCESS
  ===================================================== */
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied. You do not have permission to perform this action.",
  SESSION_EXPIRED: "Session expired. Please login again.",
  ACCESS_DENIED: "Access denied for doctor account.",

  /* =====================================================
     STATUS
  ===================================================== */
  STATUS_ACTIVE: "Doctor account is active.",
  STATUS_INACTIVE: "Doctor account is inactive.",
  STATUS_SUSPENDED: "Doctor account has been suspended by admin.",
  STATUS_BLOCKED: "Doctor account is blocked due to policy violation.",
  STATUS_NOT_ACTIVE: "Doctor account is not active.",

  /* =====================================================
     APPOINTMENT
  ===================================================== */
  APPOINTMENT_ALLOWED: "Appointments are enabled for this doctor.",
  APPOINTMENT_DISABLED: "Appointments are currently disabled for this doctor.",
  APPOINTMENT_LIMIT_REACHED: "Daily appointment limit has been reached.",
  APPOINTMENT_NOT_ALLOWED: "You are not allowed to book an appointment for this doctor.",
  APPOINTMENT_FAILED: "Appointment operation failed.",

  /* =====================================================
     DOCUMENTS (GENERAL)
  ===================================================== */
  DOCUMENT_UPLOADED: "Document uploaded successfully.",
  DOCUMENT_UPDATED: "Document updated successfully.",
  DOCUMENT_DELETED: "Document deleted successfully.",

  DOCUMENT_NOT_UPLOADED: "Document could not be uploaded.",
  DOCUMENT_NOT_UPDATED: "Document could not be updated.",
  DOCUMENT_NOT_DELETED: "Document could not be deleted.",

  DOCUMENT_REQUIRED: "Required document is missing.",
  DOCUMENT_INVALID: "Invalid document format provided.",
  DOCUMENT_NOT_FOUND: "Requested document not found.",
  DOCUMENT_ACCESS_DENIED: "You are not allowed to access this document.",

  /* =====================================================
     PROFILE PICTURE
  ===================================================== */
  PROFILE_IMAGE_UPLOADED: "Doctor profile picture uploaded successfully.",
  PROFILE_IMAGE_UPDATED: "Doctor profile picture updated successfully.",
  PROFILE_IMAGE_DELETED: "Doctor profile picture removed successfully.",

  PROFILE_IMAGE_NOT_UPLOADED: "Doctor profile picture could not be uploaded.",
  PROFILE_IMAGE_NOT_UPDATED: "Doctor profile picture could not be updated.",
  PROFILE_IMAGE_NOT_DELETED: "Doctor profile picture could not be removed.",

  PROFILE_IMAGE_REQUIRED: "Doctor profile picture is required.",
  PROFILE_IMAGE_INVALID: "Invalid profile picture format. Only JPG and PNG are allowed.",
  PROFILE_IMAGE_SIZE_EXCEEDED: "Profile picture size exceeds the allowed limit.",

  /* =====================================================
     MEDICAL REPORT
  ===================================================== */
  MEDICAL_REPORT_UPLOADED: "Medical report uploaded successfully.",
  MEDICAL_REPORT_UPDATED: "Medical report updated successfully.",
  MEDICAL_REPORT_DELETED: "Medical report deleted successfully.",

  MEDICAL_REPORT_NOT_UPLOADED: "Medical report could not be uploaded.",
  MEDICAL_REPORT_NOT_UPDATED: "Medical report could not be updated.",
  MEDICAL_REPORT_NOT_DELETED: "Medical report could not be deleted.",

  MEDICAL_REPORT_REQUIRED: "Medical report is required.",
  MEDICAL_REPORT_INVALID: "Invalid medical report format provided.",

  /* =====================================================
     PRESCRIPTION
  ===================================================== */
  PRESCRIPTION_UPLOADED: "Prescription uploaded successfully.",
  PRESCRIPTION_UPDATED: "Prescription updated successfully.",
  PRESCRIPTION_DELETED: "Prescription deleted successfully.",

  PRESCRIPTION_NOT_UPLOADED: "Prescription could not be uploaded.",
  PRESCRIPTION_NOT_UPDATED: "Prescription could not be updated.",
  PRESCRIPTION_NOT_DELETED: "Prescription could not be deleted.",

  PRESCRIPTION_REQUIRED: "Prescription is required.",
  PRESCRIPTION_INVALID: "Invalid prescription format provided.",

  /* =====================================================
     VALIDATION
  ===================================================== */
  NAME_REQUIRED: "Doctor name is required.",
  NAME_INVALID: "Doctor name must contain only alphabets.",

  EMAIL_REQUIRED: "Doctor email is required.",
  EMAIL_INVALID: "Invalid email address.",

  PHONE_REQUIRED: "Doctor phone number is required.",
  PHONE_INVALID: "Invalid phone number.",

  DEPARTMENT_REQUIRED: "Department is required.",

  EXPERIENCE_REQUIRED: "Experience is required.",
  EXPERIENCE_INVALID: "Experience must be a valid number.",

  FEES_REQUIRED: "Consultation fee is required.",
  FEES_INVALID: "Consultation fee must be a valid amount.",

  ADDRESS_REQUIRED: "Doctor address is required.",

  LANGUAGE_REQUIRED: "At least one language is required.",

  /* =====================================================
     GENERAL ERRORS
  ===================================================== */
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
  SERVER_ERROR: "Internal server error.",
  DATA_FETCH_FAILED: "Failed to fetch doctor data.",
};
