import { React, useState, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactCardFlip from "react-card-flip";

import LogInBackgroundImage from "../../assets/img/IRI_Login.jpg";
import { Link } from "react-router-dom";
import { updateForgottenPassword } from "../../api/user-apis/UserApis";

import LoginPortalImage from "../../assets/img/portal_image.png";
import { getForgotPasswordLink } from "../../api/user-apis/UserApis";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

//Toasters starts here
import {
  passwordHasUserID,
  passwordResetSuccessfully,
} from "../../AppConstants";
import { forgotLisksuccess } from "../../AppConstants";
import { forgotmessage } from "../../AppConstants";
import { emptyNewPassword } from "../../AppConstants";
import { emptyConfirmPassword } from "../../AppConstants";
import { bothPassword } from "../../AppConstants";
import { checkValidEmail } from "../../AppConstants";
import { passwordComplexity } from "../../AppConstants";
import { toastValidation } from "../../AppConstants";
import { errorToast, successToast } from "../../AppConstants";
import LoadingSpinner from "../../components/common/loadingSpinner";
import { decryptLinkData, isEmptyString } from "../../utils/AppUtils";

export function ForgotPassword() {
  const location = useLocation();
  const [, encodedInfo] = location.pathname.split("forgotPassword/");
  const decodedInfo = isEmptyString(encodedInfo)
    ? " __t__ "
    : decryptLinkData(
        location.pathname.split("forgotPassword/").pop(),
        " __t__ "
      );
  const navigateTo = useNavigate();
  const isVerified = !isEmptyString(encodedInfo);
  const [userEmaildecoded, expiryLinkTime] = decodedInfo.split("__t__");
  const userEmail = userEmaildecoded;
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const [username, setUsername] = useState(userEmail);
  const [resetPassword, setResetPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpenExpiryModal] = useState(false);

  useEffect(() => {
    if (isEmptyString(expiryLinkTime)) return;
    expiryLinkTime < timestamp
      ? setOpenExpiryModal(true)
      : setOpenExpiryModal(false);
  });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const flipCard = (e) => {
    if (
      (username &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)) ||
      username == undefined
    ) {
      return toastValidation(checkValidEmail, errorToast);
    }

    if (username != "" && username != undefined) {
      setLoading(true);
      getForgotPasswordLink({ userId: username })
        .then((res) => {
          if (!res.emailSent) throw "Invalid credentials";
          return toastValidation(forgotLisksuccess, successToast);
        })
        .catch((error) => {
          return toastValidation(
            error?.data?.error || "Invalid credentials",
            errorToast
          );
        })
        .finally(() => setLoading(false));
    } else {
      toastValidation(forgotmessage, errorToast);
    }
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleToCheckPasswordFields = () => {
    if (!newPassword) {
      return toastValidation(emptyNewPassword, errorToast);
    }
    if (
      newPassword &&
      !/^(?=.*[A-Z])(?=.*[@$!%*?&#]).{6,16}$/i.test(newPassword)
    ) {
      return toastValidation(passwordComplexity, errorToast);
    }
    if (!confirmPassword) {
      return toastValidation(emptyConfirmPassword, errorToast);
    }
    if (newPassword !== confirmPassword) {
      return toastValidation(bothPassword, errorToast);
    }

    const mailPrefix = `${userEmail.split("@").shift()?.toLowerCase() || ""}`;
    if (
      !isEmptyString(mailPrefix) &&
      new RegExp(mailPrefix, "gi").test(newPassword)
    ) {
      setPasswordShown(true);
      setConfirmPasswordShown(true);
      return toastValidation(passwordHasUserID, errorToast);
    }

    setResetPassword(true);
    setLoading(true);
    updateForgottenPassword({
      userId: username,
      userPassword: newPassword,
      confirmedUserPassword: confirmPassword,
    })
      .then((result) => {
        if (result.resetStatus) {
          navigateTo("/auth/log-in");
          toastValidation(passwordResetSuccessfully, successToast);
        }
      })
      .catch((error) => {
        return toastValidation(
          error?.data?.error || "Invalid credentials",
          errorToast
        );
      })
      .finally(() => setLoading(false));
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };

  const naviagteToLogin = () => {
    navigateTo("/auth/log-in");
  };

  const closeExpiryModal = () => {};

  return (
    <>
      <img
        src={LogInBackgroundImage}
        className="absolute inset-0 z-0 h-screen w-screen object-cover"
      />
      <div className="flex justify-center w-screen h-screen items-center">
        <ReactCardFlip isFlipped={isVerified} flipDirection="horizontal">
          <div className="flex justify-center">
            <div className="grid place-items-center max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 w-80">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-24 w-auto"
                    src={LoginPortalImage}
                    alt="Your Company"
                  />
                  <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Forgot Password
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={username}
                          onChange={handleUsernameChange}
                          required
                          className="block w-full rounded-md border-inherit border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        onClick={flipCard}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Verify Email
                        {loading && <LoadingSpinner />}
                      </button>
                    </div>
                  </div>

                  <p className="mt-10 text-center text-sm text-gray-500 justify-end flex">
                    <a
                      href="#"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      <Link to="/auth/log-in">Back to Login</Link>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid place-items-center max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 w-80">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-24 w-auto"
                    src={LoginPortalImage}
                    alt="Your Company"
                  />
                  <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Reset Password
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          readOnly
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={username}
                          onChange={handleUsernameChange}
                          required
                          className="block w-full rounded-md border-inherit border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                        </div>
                        <div className="mt-2 relative">
                          <input
                            id="password"
                            name="password"
                            type={passwordShown ? "text" : "password"}
                            autoComplete="off"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                            className="block w-full rounded-md border-inherit border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                          />
                          <button
                            className="absolute inset-y-0 right-0 px-2 text-gray-500"
                            onClick={togglePasswordVisiblity}
                          >
                            {!passwordShown ? (
                              <EyeIcon className="h-5 w-5 float-right" />
                            ) : (
                              <EyeSlashIcon className="h-5 w-5 float-right" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Confirm Password
                        </label>
                      </div>
                      <div className="mt-2 relative">
                        <input
                          id="password"
                          name="password"
                          type={confirmPasswordShown ? "text" : "password"}
                          autoComplete="off"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          required
                          className="block w-full rounded-md border-inherit border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                        <button
                          className="absolute inset-y-0 right-0 px-2 text-gray-500"
                          onClick={toggleConfirmPasswordVisiblity}
                        >
                          {!confirmPasswordShown ? (
                            <EyeIcon className="h-5 w-5 float-right" />
                          ) : (
                            <EyeSlashIcon className="h-5 w-5 float-right" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        value={resetPassword}
                        onClick={handleToCheckPasswordFields}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Reset Password
                        {loading && <LoadingSpinner />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactCardFlip>
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={closeExpiryModal}>
          <div className="fixed  inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-200 h-[200px] px-4 pb-4 pt-5 sm:p-6 sm:pb-4 justify-center">
                  <div className="sm:flex justify-center m-10">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-center">
                      <Dialog.Title className="text-lg y-20 font-semibold leading-10 text-gray-900">
                        The shared Link has been expired.
                      </Dialog.Title>
                      <div className="mt-2 underline-offset-2">
                        <p
                          className="text-sm text-blue-500 cursor-pointer font-semibold underline underline-offset-3"
                          onClick={naviagteToLogin}
                        >
                          Please try again
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default ForgotPassword;
