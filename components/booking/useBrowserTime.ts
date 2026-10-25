import { useSyncExternalStore } from "react";
import { isValidTimeZone, todayIn } from "@/lib/booking/time";

// The visitor's clock and timezone only exist in the browser. The server snapshot keeps the
// prerendered form neutral, and the browser value takes over once it hydrates.

const subscribe = () => () => {};
const noZones: string[] = [];
let zones: string[] | undefined;

function getZones() {
  zones ??= Intl.supportedValuesOf("timeZone");
  return zones;
}

export function useDetectedTimeZone() {
  return useSyncExternalStore(subscribe, () => Intl.DateTimeFormat().resolvedOptions().timeZone, () => "");
}

/** Today's date in the given timezone, or "" before hydration. */
export function useToday(timeZone: string) {
  return useSyncExternalStore(
    subscribe,
    () => (isValidTimeZone(timeZone) ? todayIn(timeZone) : ""),
    () => "",
  );
}

export function useTimeZones() {
  return useSyncExternalStore(subscribe, getZones, () => noZones);
}
