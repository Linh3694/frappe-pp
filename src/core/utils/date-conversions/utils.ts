import moment, { Moment } from "moment-timezone";

const DEFAULT_TIME_ZONE = "Asia/Ho_Chi_Minh";
export const SYSTEM_TIMEZONE =
  //@ts-expect-error
  window.frappe?.boot?.time_zone?.system || DEFAULT_TIME_ZONE;
export const USER_TIMEZONE =
  //@ts-expect-error
  window.frappe?.boot?.time_zone?.user || DEFAULT_TIME_ZONE;
export const USER_DATE_FORMAT =
  //@ts-expect-error
  window.frappe?.boot?.user?.defaults?.date_format?.toUpperCase() ||
  //@ts-expect-error
  window.frappe?.boot?.sysdefaults?.date_format?.toUpperCase() ||
  "DD/MM/YYYY";

export const FRAPPE_DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const FRAPPE_DATE_FORMAT = "YYYY-MM-DD";
export const FRAPPE_TIME_FORMAT = "HH:mm:ss";

export const convertFrappeTimestampToUserTimezone = (
  timestamp: string
): Moment => {
  return moment.tz(timestamp, SYSTEM_TIMEZONE).clone().tz(USER_TIMEZONE);
};
