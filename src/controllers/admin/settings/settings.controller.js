import {
  backupDBService,
  getMaintenanceModeStatus,
  maintenanceModeService,
} from "../../../services/admin/settings/settings.service.js";
import { respond } from "../../../utils/respond.js";

export const maintenanceModeController = async (req, res, next) => {
  try {
    const serviceResponse = await maintenanceModeService(req.body);

    return respond.success(res, serviceResponse);
  } catch (err) {
    //pass error to global error handler
    next(err);
  }
};

export const getMaintenanceModeStatusController = async (req, res, next) => {
  try {
    const serviceResponse = await getMaintenanceModeStatus();

    return respond.success(res, serviceResponse);
  } catch (err) {
    next(err);
  }
};

// database backup controller

export const backupDBController = async (req, res , next ) => {
  try {
    const archive = await backupDBService();

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=backup-${new Date().toISOString()}.zip`
    );

    archive.pipe(res);
    archive.finalize();

  } catch (err) {
    
    // pass error to global error handler
    next(err)
  }
};
