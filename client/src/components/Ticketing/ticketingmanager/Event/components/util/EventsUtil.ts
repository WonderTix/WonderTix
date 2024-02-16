export const toDateStringFormat = (date) => {
  if (date === undefined || date === '') return '';
  const dateString = String(date);
  if (dateString.includes('-')) return date;
  if (dateString.split('-').length === 3) {
    const [year, month, day] = dateString.split('-').map(Number);
    const Dateobject = new Date(year, month - 1, day);
    return Dateobject.getTime();
  }
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}-${month}-${day}`;
};
