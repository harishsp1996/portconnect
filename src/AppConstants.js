import { toast } from "react-toastify";
export const loginFormInvalidToaster = "User ID or Password not entered.";
export const loginOTPNotEntered = " Please enter OTP.";
export const loginOTPSuccess = "OTP has been sent to registered email ID.";
export const loginSuccessfully = "Login successfully.";
export const forgotmessage = "Please enter email ID.";
export const registerSuccessMessage =
  "Welcome link has been sent to your registered Email ID";
export const forgotLisksuccess =
  "The link has been sent to the registered Email Id";
export const passwordResetSuccessfully =
  "Your password has been reset successfully.";
export const passwordCreatedSuccessfully =
  "Your password has been created Successfully.";
export const emptyNewPassword = "Please enter the password.";
export const emptyConfirmPassword = "Please confirm the password.";
export const bothPassword = "Password should be same.";
export const checkValidEmail = "Please enter valid Email ID.";
export const passwordComplexity =
  "Password must contain an upper case character, a special character and must be 6 to 16 characters long!";
export const passwordHasUserID = 'Your Password must not contain the User ID';
export const errorToast = "error";
export const successToast = "success";
export const dateFormate = "DD-MMM-YYYY";
export const yearfirstdateFormate = "YYYY-MM-DD";
export const dateTimeFormate = "DD-MMM-YYYY HH:mm";
export const yearfirstTimeFormate = "YYYY-MM-DD HH:mm";
export const invalidate = "Invalid date.";
export const invalidDateTime = "Invalid date time.";
export const notAvailable = "N.A.";
export const requestTimeOut = "Request timed out";

export const toastValidation = (message, type) => {
  toast.dismiss();
  switch (type) {
    case "success":
      return toast.success(message);
    case "error":
      return toast.error(message);
    case "warning":
      return toast.warning(message);
    default:
      return toast.warning(message);
  }
};

export const decryptionKey = `a471b8d09da919d950dca57d66dfe3f1b5a8aa3d37`;
