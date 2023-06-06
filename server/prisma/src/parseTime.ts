/**
 * parse date time string to a Date object
 * @param {string} timeString  21:00:00-08
 * @return {Date} Date object
 */
function parseTime(timeString: string): Date {
  const timePart = timeString.split('-')[0];
  return new Date(`1970-01-01T${timePart}Z`);
}

export default parseTime;
