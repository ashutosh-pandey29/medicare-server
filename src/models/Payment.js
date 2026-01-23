import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    userName: {
      type: String,
      required: true,
      trim: true,
    },

    userPhone: {
      type: String,
      required: true,
      trim: true,
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
      trim: true,
    },

    receiverType: {
      type: String,
      enum: ["doctor", "hospital"],
      default: "hospital",
    },

    method: {
      type: String,
      enum: ["upi", "cash", "wallet", "netbanking", "card"],
      default: "upi",
    },

    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
