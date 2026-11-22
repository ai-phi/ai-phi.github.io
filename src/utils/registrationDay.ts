import { LOCALE } from "@config";

const eventCalendar = new Intl.DateTimeFormat("sv-SE", {
  timeZone: LOCALE.timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const registrationDay = (date: string | Date) =>
  eventCalendar.format(new Date(date));

export const registrationDayHasPassed = (day: string, now = new Date()) =>
  registrationDay(now) > day;
