import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
