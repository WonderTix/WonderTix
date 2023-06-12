/**
 * parse date time string to a Date object
 * @param {string} timeString  20:00:00.000000 -08:00
 * @return {Date} Date object
 */
function parseDateTime(timeString: string): Date {
  const [time, timezone] = timeString.split(' ');
  const [hours, minutes, seconds] = time.split(':').map(Number);

  const date = new Date();

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(Math.floor(seconds));

  const [timezoneHours, timezoneMinutes] = timezone.split(':').map(Number);
  date.setHours(date.getHours() - timezoneHours);
  date.setMinutes(date.getMinutes() - timezoneMinutes);

  return date;
}

export default parseDateTime;
