import { getPatientGraphService, getPaymentGraphService } from "../../../services/admin/stats/graph.service.js";
import { respond } from "../../../utils/respond.js";

export const revenueGraphController = async (req, res, next) => {
  try {
    const serviceResponse = await getPaymentGraphService();
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};


export const patientGraphController = async (req, res, next) => {
  try {
    const serviceResponse = await getPatientGraphService();
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};