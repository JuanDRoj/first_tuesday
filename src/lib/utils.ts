import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeDifference(reference: Date) {
  const localDate = dayjs.utc(reference).local();
  const pastDate = localDate.isAfter(dayjs()) ? dayjs() : localDate;
  return pastDate.fromNow();
}
