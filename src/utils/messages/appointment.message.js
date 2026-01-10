/**
 * Centralized Appointment & Payment Messages
 */
export const APPOINTMENT_MESSAGES = {
  /* ===== APPOINTMENT BOOKING / CREATE ===== */
  CREATE: "Appointment booked successfully",
  NOT_CREATE: "Failed to book appointment",
  INVALID_BOOKING_DATA: "Invalid appointment data",
  TIME_SLOT_UNAVAILABLE: "Selected time slot is not available",
  MAX_APPOINTMENTS_REACHED: "You have reached the maximum number of appointments allowed",
  APPOINTMENT_NOT_FOUND: "Appointment not found",
  
  /* ===== APPOINTMENT UPDATE ===== */
  UPDATED: "Appointment updated successfully",
  NOT_UPDATE: "Failed to update appointment",
  INVALID_UPDATE_DATA: "Invalid data for appointment update",
  NOT_STATUS_UPDATE: "Failed to update appointment status",
  
  /* ===== APPOINTMENT CANCELLATION / DELETE ===== */
  CANCEL: "Appointment cancelled successfully",
  CANCEL_FAILED: "Failed to cancel appointment",
  DELETE: "Appointment deleted successfully",
  NOT_DELETE: "Failed to delete appointment",
  CANNOT_CANCEL_PAST_APPOINTMENT: "Cannot cancel past appointments",
  
  /* ===== APPOINTMENT STATUS ===== */
  APPROVED: "Appointment approved successfully",
  REJECTED: "Appointment rejected",
  RESCHEDULED: "Appointment rescheduled successfully",
  COMPLETED: "Appointment marked as completed",
  MISSED: "Appointment marked as missed",
  STATUS_UPDATED: "Appointment status updated successfully",
  STATUS_UPDATE_FAILED: "Failed to update appointment status",
  STATUS_INVALID: "Invalid appointment status",
  
  /* ===== APPOINTMENT FETCH ===== */
  FETCH_SUCCESS: "Appointments fetched successfully",
  FETCH_FAILED: "Failed to fetch appointments",
  NO_APPOINTMENTS_FOUND: "No appointments found",
  
  /* ===== PAYMENT ===== */
  PAYMENT_SUCCESS: "Payment completed successfully",
  PAYMENT_FAILED: "Payment failed. Please try again",
  PAYMENT_PENDING: "Payment is pending",
  PAYMENT_INVALID: "Invalid payment details",
  PAYMENT_REFUNDED: "Payment refunded successfully",
  PAYMENT_REFUND_FAILED: "Failed to process refund",
  PAYMENT_ALREADY_DONE: "Payment has already been made for this appointment",
  
  /* ===== NOTIFICATIONS ===== */
  REMINDER_SENT: "Appointment reminder sent successfully",
  REMINDER_FAILED: "Failed to send appointment reminder",
};
