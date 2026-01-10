import { updatePasswordService } from "../../services/auth/updatePassword.service.js";
import { removeCookie } from "../../utils/cookie.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { respond } from "../../utils/respond.js";

export const updatePasswordController = async (req, res, next) => {
  try {
    // console.log(req.user);
    // console.log(req.body);

    const data = {
      userId: req.user.userId,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    };

    const message = await updatePasswordService(data);

    removeCookie(res, "refreshToken");

    respond.success(res, {
      statusCode: HTTP_CODES.OK,
      message: message.message,
    });
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
