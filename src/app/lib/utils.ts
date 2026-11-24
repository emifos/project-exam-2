import type { Booking } from "../types/holidaze";

export function getUpcomingBookings(bookings: Booking[] = []) {
  const today = new Date();
  return bookings.filter((bookings) => new Date(bookings.dateTo) >= today);
}

export function formDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB");
}

export function getNights(dateFrom: string, dateTo: string) {
  const milliseconds =
    new Date(dateTo).getTime() - new Date(dateFrom).getTime();
  return Math.round(milliseconds / (1000 * 60 * 60 * 24));
}

export function formShortDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
