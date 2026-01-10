import { saveSubscriptionService } from "../../services/notifications/saveSubscription.service.js";
import { respond } from "../../utils/respond.js";

export const saveSubscriptionController = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const userInfo = req.user;

    const response = await saveSubscriptionService(subscription, userInfo);

    // console.log(response);
    // console.log(req.body);

    respond.success(res , response )



  } catch (err) {
    console.log("push notification not send ");
    // pass error to global error handler
    next(err);
  }
};
