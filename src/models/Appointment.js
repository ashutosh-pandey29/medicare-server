import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    trim: true,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    trim: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    trim: true,
    required: false,
  },

  name: {
    type: String,
    default: null,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    default: null,
    trim: true,
    required: false,
  },

  phone: {
    type: String,
    default: null,
    trim: true,
    required: true,
  },

  appointmentDate: {
    type: String,
    required: true,
  },

  problem: {
    type: String,
    required: true,
    trim: true,
  },

  token: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["waiting", "booked", "confirmed", "rescheduled", "cancelled", "completed", "missed"],
    default: "waiting",
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["online", "cash", null],
    default: null,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed", "refound"],
    default: "pending",
    trim: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
