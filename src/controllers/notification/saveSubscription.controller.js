import { saveSubscriptionService } from "../../services/notifications/saveSubscription.service.js";
import { respond } from "../../utils/respond.js";

export const saveSubscriptionController = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const userInfo = req.user;
    const response = await saveSubscriptionService(subscription, userInfo);
    respond.success(res , response )
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
