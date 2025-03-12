import axios from "axios";
import { requestTimeOut } from "../../AppConstants";
import { isEmptyString } from "../../utils/AppUtils";

export const clientId = "auditapp";
export const webToken = "webToken";

const authReq = "authReq";
const apiReq = "apiReq";

const baseURL = "http://<URL>/msc";  // If app is running on port other than 443 use <URL:Port>

const loginHeaders = { "Content-type": "application/json; charset=utf-8" };
const basicHeaders = { "Content-type": "application/json; charset=utf-8" };

const headerCodeMap = {
  [`${authReq}`]: loginHeaders,
  [`${apiReq}`]: basicHeaders,
};

const globalAxiosAuthObject = axios.create({
  baseURL: baseURL,
  headers: { ...loginHeaders },
  withCredentials: true,
});

function authRequestInterceptor(req) {
  // request interception custom logic goes here...
  if (window.navigator.cookieEnabled) return req;
  const token = getToken();
  req.headers = {
    ...(req.headers || {}),
    Authorization: `Bearer ${token}`,
  };
}

function authResponseInterceptor(res) {
  if (!res || res.data.error || res.response) {
    throw {
      message:
        (!res && requestTimeOut) ||
        JSON.stringify(res.data.error || res.response),
    };
  }
  return res.data;
}

function authErrorInterceptor({ request, response }) {
  // dispatch(genericResponseErrorReducer({ hasError: true, errorDesc: JSON.stringify(response || request), sourceType: authError }));
  throw response || request;
}

function getHeaders(headers, overrideHeaders, code) {
  const customHeaders = (!!overrideHeaders && { ...headers }) || {
    ...headerCodeMap[code],
    ...headers,
  };
  return customHeaders;
}

function saveToken({ id }) {
  if (isEmptyString(id)) return;
  const tokenId = Buffer.from("id", "base64");
  window.sessionStorage.setItem(tokenId, id);
}

function getToken() {
  if (!window.navigator.cookieEnabled) return null;
  const tokenId = Buffer.from("id", "base64");
  return window.sessionStorage.getItem(tokenId);
}

globalAxiosAuthObject.interceptors.request.use(authRequestInterceptor);

globalAxiosAuthObject.interceptors.response.use(
  authResponseInterceptor,
  authErrorInterceptor
);

Object.freeze(globalAxiosAuthObject);

export function doGet(url, { headers, overrideHeaders, ...otherProps }) {
  return globalAxiosAuthObject.get(url, {
    headers: getHeaders(headers, overrideHeaders, apiReq),
    ...otherProps,
    withCredentials: true,
  });
}

export function doPost(
  url,
  postData,
  { headers, overrideHeaders, ...otherProps }
) {
  return globalAxiosAuthObject.post(url, postData, {
    headers: getHeaders(headers, overrideHeaders, apiReq),
    ...otherProps,
    withCredentials: true,
  });
}

// They are here because the globalAxiosAuthObject must strictly belong to this file
// only the common methods can be exported and this applies to all the API calls in this file

export async function doUserLogin(loginData, { headers, ...otherProps }) {
  return globalAxiosAuthObject
    .post("/auth/login", loginData, {
      headers: getHeaders(headers, true, authReq),
      ...otherProps,
    })
    .then((loginData) => {
      const { cookieEnabled } = window.navigator;
      //if cookies are enabled, ignore session storage
      if (cookieEnabled) return loginData;
      saveToken(loginData);
      return loginData;
    });
}

export async function doUserLogout() {
  return globalAxiosAuthObject
    .get("/auth/logout", {
      headers: getHeaders({}, true, authReq),
      withCredentials: true,
    })
    .then((result) => {
      window.sessionStorage.clear();
      return result;
    });
}

export async function getLoginOtp(loginData) {
  return globalAxiosAuthObject.post("/auth/getLoginOtp", loginData, {
    headers: getHeaders({}, true, authReq),
  });
}

export function validateUser(userData, { headers, ...otherProps }) {
  return globalAxiosAuthObject.post("/auth/validateUser", userData, {
    headers: getHeaders(headers, true, authReq),
    ...otherProps,
  });
}
