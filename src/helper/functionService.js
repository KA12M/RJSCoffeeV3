import { DateTime } from "luxon";

export const Dateformat = (date) =>
  Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(Date.parse(date));

export const IntMoney = (int) => {
  var money = new Intl.NumberFormat("th-TH");
  return money.format(int);
};

export const ScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export function timeSince(date) {
  date = DateTime.fromISO(date);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " ปีที่แล้ว";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " เดือนที่แล้ว";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " วันที่แล้ว";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " ชั่วโมงที่แล้ว";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " นาทีที่แล้ว";
  }
  return Math.floor(seconds) + " วินาทีที่แล้ว";
}
