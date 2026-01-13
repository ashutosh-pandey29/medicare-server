import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    patient: {
      name: { type: String, trim: true, required: true },
      age: { type: Number, default: 0 },
      gender: { type: String, enum: ["M", "F"] },
      email: { type: String, required: true, trim: true },
      phone: { type: String, trim: true },
      problem: { type: String, trim: true },
    },

    paymentMode: {
      type: String,
      enum: ["online", "cash"],
      default: "cash",
    },

    paymentAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refund"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
