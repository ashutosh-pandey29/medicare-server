import { deleteAccountService } from "../../services/auth/deleteAccount.service.js";
import { respond } from "../../utils/respond.js";

export const deleteAccountController = async (req, res, next) => {
  try {
    const user = req.user;
    const serviceResponse = await deleteAccountService(user);
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
