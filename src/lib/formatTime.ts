export function formatTime(unixTimestamp: number, timezoneOffset: number): string {
  const localDate = new Date((unixTimestamp + timezoneOffset) * 1000);
  const hours = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}