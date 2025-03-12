import dayjs from "dayjs";
import {
  dateFormate,
  dateTimeFormate,
  yearfirstdateFormate,
  yearfirstTimeFormate,
  invalidate,
  invalidDateTime,
  notAvailable,
  decryptionKey,
} from "../AppConstants";
import { AES, enc } from "crypto-js";

export const formatToDisplayDate = (dateValue) => {
  if (!dateValue || dateValue.trim() === "")
    return dayjs(new Date()).format(dateFormate);
  try {
    const formattedDate = dayjs(new Date(dateValue)).format(dateFormate);
    if (`${formattedDate}`.toLowerCase().includes(`invalid`)) throw invalidate;
    return formattedDate;
  } catch (error) {
    return notAvailable;
  }
};

export const formatToDisplayDateTime = (dateValue) => {
  if (!dateValue || dateValue.trim() === "")
    return dayjs(new Date()).format(dateTimeFormate);
  try {
    const formattedDateTime = dayjs(new Date(dateValue)).format(
      dateTimeFormate
    );
    if (`${formattedDateTime}`.toLowerCase().includes(`invalid`))
      throw invalidDateTime;
    return formattedDateTime;
  } catch (error) {
    return notAvailable;
  }
};

export const formatDayjsToDbStringValue = (
  dateValue = "",
  formatToBeReturned = yearfirstdateFormate
) => {
  const isValidInstanceOfDayjs = dayjs.isDayjs(dateValue);

  if (isValidInstanceOfDayjs && dateValue) {
    return dateValue.format(formatToBeReturned);
  } else if (!isValidInstanceOfDayjs && dateValue) {
    return dayjs(dateValue).format(formatToBeReturned);
  } else if (!dateValue || dateValue.trim() === "") {
    return "";
  }
};
export const formatDayjsToDbDateTimeString = (
  dateTimeValue = "",
  formatTobeReturned = yearfirstTimeFormate
) => {
  const isValidDayjsInstance = dayjs.isDayjs(dateTimeValue);
  if (isEmptyString(dateTimeValue))
    return dayjs(new Date()).format(formatTobeReturned);
  if (!isValidDayjsInstance)
    return dayjs(dateTimeValue).format(formatTobeReturned);
  return dateTimeValue.format(formatTobeReturned);
};

export const decodeBase64Data = (data) => {
  if (!data || data?.trim() === "") return "";
  return decodeURIComponent(Buffer.from(String(data).toString(), "base64"));
};

export const isFunction = (arg) => !!arg && typeof arg === "function";

export const isEmptyString = (data) => {
  return !data || (typeof data === "string" && data.trim() === "");
};

export const isEmptyObject = (data) => {
  return Object.keys(data || {}).length === 0;
};

export const isEmptyArray = (data) => {
  return !Array.isArray(data) || (Array.isArray(data) && data.length === 0);
};

export const ImageToDataURL = (img) => {
  return `data:image/png;base64, ${btoa(
    new Uint8Array(img).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  )}`;
};

export const returnFileSize = (number) => {
  if (number < 1024) return `${number} bytes`;
  if (number >= 1024 && number < 1048 * 1048)
    return `${(number / 1024).toFixed(1)} KB`;
  return `${(number / (1024 * 1024)).toFixed(1)} MB`;
};

export function getFileType(fileName) {
  if (isEmptyString(fileName)) return "";
  return `${fileName}`.split(/\./g).pop();
}

export function decryptLinkData(data = "", fallbackErrString = "") {
  try {
    return AES.decrypt(data, decryptionKey).toString(enc.Utf8);
  } catch (error) {
    return fallbackErrString;
  }
}
