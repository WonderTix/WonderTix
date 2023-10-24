import React from 'react';
import defaultSeasonImage from '../../../../assets/DefaultEventImage.png'; // TODO, change to default season image once completed

export const formatSeasonDate = (date: number, fromApiResponse = false) => {
  const dateStr = date.toString();
  const year: string = dateStr.slice(0, 4);
  const month: string = dateStr.slice(4, 6);
  const day: string = dateStr.slice(6);

  if (fromApiResponse) return `${year}-${month}-${day}`;
  else return `${month}/${day}/${year}`;
};

export const getSeasonImage = (url?: string) => {
  if (url && url !== '' && url !== 'Default Season Image') return url;
  return defaultSeasonImage;
};

export const imageOnError = (event) => {
  event.currentTarget.src = defaultSeasonImage;
};

export interface SeasonImageProps {
  className: string;
  src: string;
  alt: string;
}

export const SeasonImage = (props: SeasonImageProps) => {
  const {src, className, alt} = props;
  return (
    <img
      className={className}
      src={getSeasonImage(src)}
      alt={alt}
      onError={imageOnError}
    />
  );
};
