import { getAppointmentByDoctorService } from "../../services/appointment/getAppointmentByDoctor.service.js";
import { respond } from "../../utils/respond.js";

export const getAppointmentsByDoctorController = async (req , res , next) => {
   try {
     const  userId  = req.user.userId;
        
        const serviceResponse = await getAppointmentByDoctorService(userId);
        
          respond.success(res, serviceResponse);

  } catch (err) {
    // passing error to global error handler 
    next(err);
  }
}