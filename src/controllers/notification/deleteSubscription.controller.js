import { deleteSubscriptionService } from "../../services/notifications/deleteSubscription.service.js";
import { respond } from "../../utils/respond.js";

export const deleteSubscriptionController = async (req, res, next) => {
  try {
    const { endpoint } = req.query;

    const response = await deleteSubscriptionService(endpoint);

    respond.success(res, response);
  } catch (err) {
    console.log(err);

    //pass error to global error handler
    next(err);
  }
};
