import { updateAccountService } from "../../services/auth/updateAccount.service.js";
import { respond } from "../../utils/respond.js";

export const updateAccountController = async (req, res, next) => {
  try {
    const userId = req.user.userId; // logged in user id
    const { username, email } = req.body; // new value
    const data = { username, email, userId };
    const response = await updateAccountService(data);

    respond.success(res, response);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
