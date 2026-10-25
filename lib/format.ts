/** "25 October 2026". Dates are stored as ISO days, so they're formatted in UTC to stay put. */
export const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
