import { newAppointmentService } from "../../services/appointment/newAppointment.service.js";
import { respond } from "../../utils/respond.js";

export const newAppointmentController = async (req, res, next) => {
  try {
    const payload = req.body;
    //!<---------- Resolve user (guest or logged-in) --------------------------------->
  const userId = req.user ? req.user?.userId : null; // for guest userId   is null

    const serviceResponse = await newAppointmentService(payload, userId);

    respond.success(res, serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
