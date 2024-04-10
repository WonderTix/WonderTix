import React from 'react';
import defaultEventImage from '../assets/default_event_image.png';
import defaultSeasonImage from '../assets/default_season_image.png';

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
