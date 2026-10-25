// Date and timezone helpers for the booking flow, shared by the browser and the server.
// Dates are "YYYY-MM-DD" strings and times are "HH:MM", so they compare as plain strings.

export function isValidTimeZone(timeZone: string) {
  if (!timeZone) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

/** Wall-clock date and time of an instant in a timezone. */
function wallClock(instant: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(instant);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value;
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    time: `${part("hour")}:${part("minute")}`,
  };
}

export function todayIn(timeZone: string, now = new Date()) {
  return wallClock(now, timeZone).date;
}

export function addDays(date: string, days: number) {
  const day = new Date(`${date}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() + days);
  return day.toISOString().slice(0, 10);
}

/** True for real calendar dates only, so "2026-02-31" fails. */
export function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && addDays(value, 0) === value;
}

function offsetMinutes(timeZone: string, instant: Date) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
    .formatToParts(instant)
    .find((part) => part.type === "timeZoneName")?.value;
  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(name ?? "");
  if (!match) return 0;
  return (match[1] === "-" ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3]));
}

/** The same moment as a wall-clock time in another timezone. */
export function convertTime(date: string, time: string, from: string, to: string) {
  const wall = Date.parse(`${date}T${time}:00Z`);
  // Two passes settle the offset when the date sits next to a daylight-saving change.
  const guess = wall - offsetMinutes(from, new Date(wall)) * 60_000;
  const instant = new Date(wall - offsetMinutes(from, new Date(guess)) * 60_000);
  return wallClock(instant, to);
}

/** "GMT+6", "GMT-4:30" or "GMT" for a timezone on a given date. */
export function formatOffset(timeZone: string, date: string) {
  return (
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
      .formatToParts(new Date(`${date}T12:00:00Z`))
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT"
  );
}

/** "Tuesday 3 November 2026", or "Wed 4 Nov" for short notes. */
export function formatDate(date: string, style: "long" | "short" = "long") {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: style,
    day: "numeric",
    month: style,
    year: style === "long" ? "numeric" : undefined,
  }).format(new Date(`${date}T00:00:00Z`));
}

export function zoneLabel(timeZone: string) {
  return timeZone.replaceAll("_", " ");
}
