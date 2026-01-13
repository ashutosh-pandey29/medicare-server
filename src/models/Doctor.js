import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },

    education: [
      {
        degree: { type: String, required: true, trim: true },
        college: { type: String, required: true, trim: true },
        year: { type: Number, required: true },
      },
    ],

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    bio: {
      type: String,
      trim: true,
      default: "Not updated yet",
    },

    workingTime: [
      {
        day: {
          type: String,
          enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          required: true,
        },
        slots: [
          {
            from: { type: String, required: true },
            to: { type: String, required: true },
          },
        ],
      },
    ],

    onLeave: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isIdCardIssued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
