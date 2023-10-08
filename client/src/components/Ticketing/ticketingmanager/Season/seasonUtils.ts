import defaultSeasonImage from '../../../../assets/DefaultEventImage.png'; // TODO, change to default season image once completed

export const formatSeasonDate = (date: number) => {
  const dateStr = date.toString();
  const year: string = dateStr.slice(0, 4);
  const month: string = dateStr.slice(4, 6);
  const day: string = dateStr.slice(6);

  return `${month}/${day}/${year}`;
};

export const getSeasonImage = (url?: string) => {
  if (url && url !== '') return url;
  return defaultSeasonImage;
};
