import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: String,
      required: true,
      unique: true,
    },

    departmentName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    departmentFees: {
      type: Number,
      required: true,
      min: 0,
    },

    departmentDescription: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
