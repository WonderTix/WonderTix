import React from 'react';
import defaultEventImage from '../assets/WTix_default_event.png';
import defaultSeasonImage from '../assets/WTix_default_season.png';

export const getEventImageDefault = (url?: string) => {
  if (url && url !== '' && url !== 'Default Event Image') {
    return url;
  }
  return defaultEventImage;
};

export const getSeasonImageDefault = (url?: string) => {
    if (url && url !== '' && url !== 'Default Season Image') {
        return url;
    }
    return defaultSeasonImage;
};

export const imageOnError = (event) => {
  event.currentTarget.src = defaultEventImage;
};

interface EventImageProps {
  className: string;
  src: string;
  title: string;
}

export const EventImage = (props: EventImageProps) => {
  const {src, className, title} = props;
  return (
    <img
      className={className}
      src={getEventImageDefault(src)}
      alt={`${title} Playbill`}
      onError={imageOnError}
    />
  );
};
