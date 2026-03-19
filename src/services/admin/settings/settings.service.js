import Setting from "../../../models/Settings.js";
import { HTTP_CODES } from "../../../utils/httpCodes.js";
import { db } from "../../db/db.service.js";

export const maintenanceModeService = async (payload) => {
  const { maintenanceMode } = payload;
  const settings = await db.fetchOne(Setting, {});

  if (!settings) {
    settings = await db.createOne(Setting, { maintenanceMode });
  } else {
    await db.updateOne(Setting, { _id: settings._id }, { $set: { maintenanceMode } });
  }


  return {
    httpsStatus: HTTP_CODES.OK,
    message: `Maintenance mode ${maintenanceMode ? "enabled" : "disabled"}`,
  };
};
