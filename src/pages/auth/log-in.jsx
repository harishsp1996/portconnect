import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { getLoginOtp } from "../../api/api-handlers/ApiHandler";
import { doUserLogin } from "../../api/api-handlers/ApiHandler";
import OtpInput from "react-otp-input";
import LogInBackgroundImage from "../../assets/img/IRI_Login.jpg";
import LoginPortalImage from "../../assets/img/portal_image.png";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import {
  checkValidEmail,
  loginFormInvalidToaster,
  loginOTPSuccess,
  loginOTPNotEntered,
  loginSuccessfully,
  errorToast,
  successToast,
} from "../../AppConstants";
import { toastValidation } from "../../AppConstants";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/loadingSpinner";

export function LogIn() {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [flip, setFlip] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const otpChange = (otp) => {
    return setOtp(otp);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const flipCard = (e) => {
    setFlip(!flip);
  };

  const onClickforgotPassword = () => {
    navigateTo("/auth/forgotPassword");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const resendOTP = () => {
    if (minutes > 0 || seconds > 0) return;
    getLoginOtp({
      userId: username,
      userPassword: password,
    })
      .then((res) => {
        if (!res.validUser) throw "Invalid credentials";
        setMinutes(14);
        setSeconds(59);
        return toastValidation(loginOTPSuccess, successToast);
      })
      .catch((error) => {
        return toastValidation(
          error?.data?.error || "Invalid credentials",
          errorToast
        );
      });
  };

  /** Login with user id and password code start */
  const loginFlip = () => {
    if (
      username &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)
    ) {
      return toastValidation(checkValidEmail, errorToast);
    }

    if (username == "" || password == "") {
      return toastValidation(loginFormInvalidToaster, errorToast);
    }
    setLoading(true);
    getLoginOtp({
      userId: username,
      userPassword: password,
    })
      .then((res) => {
        if (!res.validUser) throw "Invalid credentials";
        flipCard();
        setMinutes(14);
        setSeconds(59);
        return toastValidation(loginOTPSuccess, successToast);
      })
      .catch((error) => {
        return toastValidation(
          error?.data?.error || "Invalid credentials",
          errorToast
        );
      })
      .finally(() => setLoading(false));
  };
  /** Login with user id and password code end */

  /** Login with user id and OTP code start */
  function submitOTP() {
    if (otp == "") {
      return toastValidation(loginOTPNotEntered, errorToast);
    }
    setLoading(true);
    doUserLogin(
      {
        userId: username,
        userPassword: password,
        userOtp: otp,
      },
      {}
    )
      .then((res) => {
        if (!res.validUser) throw "Invalid credentials";
        localStorage.setItem("role", res.roles[0]);
        localStorage.setItem("userId", res.userId);
        navigateTo("/home/dashboard");
        toastValidation(loginSuccessfully, successToast);
      })
      .catch((error) => {
        toastValidation(
          error?.data?.error || "Invalid credentials",
          errorToast
        );
      })
      .finally(() => setLoading(false));
  }
  /** Login with user id and OTP code end */

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <img
        src={LogInBackgroundImage}
        className="absolute inset-0 z-0 h-screen w-screen object-cover"
      />
      <div className="flex justify-center w-screen h-screen items-center">
        <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
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
                    Login to Port Connect
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        User ID
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
                          autoComplete="current-password"
                          value={password}
                          onChange={handlePasswordChange}
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
                      <div className="text-xs">
                        <a
                          href="#"
                          onClick={onClickforgotPassword}
                          className="font-semibold text-indigo-600 hover:text-indigo-500 float-right mt-2 mb-5"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        onClick={loginFlip}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Login
                        {loading && <LoadingSpinner />}
                      </button>
                    </div>
                  </div>

                  <p className="mt-10 text-center text-sm text-gray-500 justify-end flex">
                    <a
                      href="#"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      <Link to="/auth/Register">Register Page</Link>
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
                  <ArrowLeftIcon
                    onClick={flipCard}
                    className="h-5 w-5 -mb-5 cursor-pointer"
                  />
                  <img
                    className="mx-auto h-24 w-auto"
                    src={LoginPortalImage}
                    alt="Your Company"
                  />
                  <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login to Port Connect
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        User ID
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
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          OTP
                        </label>
                      </div>
                      <div className="mt-2">
                        <OtpInput
                          className="text-grey-darkest"
                          value={otp}
                          inputType="tel"
                          onChange={otpChange}
                          numInputs={6}
                          inputStyle={{
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            width: "39px",
                            height: "35px",
                            fontSize: "12px",
                            color: " #111827",
                            fontWeight: "400",
                            caretColor: "blue",
                          }}
                          focusStyle={{
                            border: "1px solid #CFD3DB",
                            outline: "none",
                          }}
                          renderSeparator={<span>&nbsp;</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        onClick={submitOTP}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Login
                        {loading && <LoadingSpinner />}
                      </button>
                    </div>
                  </div>

                  <div
                    variant="small"
                    className="mt-6 flex justify-center text-xs"
                  >
                    {seconds > 0 || minutes > 0 ? (
                      <p>
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p>Didn't recieve code?</p>
                    )}

                    <div
                      as="span"
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold cursor-pointer"
                      disabled={seconds > 0 || minutes > 0}
                      style={{
                        color:
                          seconds > 0 || minutes > 0 ? "#DFE3E8" : "#4f46e5",
                        paddingLeft: "5px",
                      }}
                      onClick={resendOTP}
                    >
                      <u>Resend OTP</u>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactCardFlip>
      </div>
    </>
  );
}
export default LogIn;
