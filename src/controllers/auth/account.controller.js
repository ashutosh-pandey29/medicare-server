import { deleteAccountService } from "../../services/auth/deleteAccount.service.js";
import { meService } from "../../services/auth/me.service.js";
import { updateAccountService } from "../../services/auth/updateAccount.service.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { respond } from "../../utils/respond.js";


/**
 * ====================================================
 * ! Returns the currently logged-in user's profile.
 * ====================================================
 */
export const meController = async (req, res, next) => {
  try {
    const data = {
      userId: req.user?.userId,
    };

    const result = await meService(data);

    respond.success(res, { statusCode: HTTP_CODES.OK, message: result.message, data: result.data });
  } catch (err) {
    //pass error to global error handler
    next(err);
  }
};


/**
 * ====================================================
 * ! UPDATE ACCOUNT INFORMATION 
 * ====================================================
 */

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


/**
 * ====================================================
 * ! UPDATE PASSWORD INFORMATION 
 * ====================================================
 */

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


/**
 * ====================================================
 * ! DELETE  ACCOUNT  CONTROLLER
 * ====================================================
 */

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





