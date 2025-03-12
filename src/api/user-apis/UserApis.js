import { isEmptyObject, isEmptyString } from "../../utils/AppUtils";
import { doGet, doPost } from "../api-handlers/ApiHandler";

export async function getRegistrationLink({ userId }) {
  if (isEmptyString(userId)) return Promise.reject("User Id cannot be empty!");
  return doGet(`/auth/sendRegistrationLink/${userId}`, {})
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}

export async function getForgotPasswordLink({ userId }) {
  if (isEmptyString(userId)) return Promise.reject("User Id cannot be empty!");
  return doGet(`/auth/sendForgotPasswordLink/${userId}`, {})
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}

export async function updateResetPassword({
  userId,
  currentPassword,
  resettedPassword,
}) {
  if (isEmptyObject(arguments[0]))
    return Promise.reject("Missing user details!");
  return doPost(
    `/auth/resetPassword`,
    {
      userId,
      currentPassword,
      resettedPassword,
    },
    {}
  )
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}

export async function updateForgottenPassword({
  userId,
  userPassword,
  confirmedUserPassword,
}) {
  if (isEmptyObject(arguments[0]))
    return Promise.reject("Missing user details!");
  return doPost(
    `/auth/forgotPassword`,
    { userId, userPassword, confirmedUserPassword },
    {}
  )
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}

export async function registerUser({ userId, userPassword }) {
  if (isEmptyObject(arguments[0]))
    return Promise.reject("Missing user details!");
  return doPost(`/auth/register`, { userId, userPassword }, {})
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}
