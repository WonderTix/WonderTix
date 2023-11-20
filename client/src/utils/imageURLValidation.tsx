import React from 'react';
import defaultEventImage from '../assets/default_event_image.png';

export const getImageDefault = (url?: string) => {
  if (url && url !== '' && url !== 'Default Event Image') {
    return url;
  }
  return defaultEventImage;
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
      src={getImageDefault(src)}
      alt={`${title} Playbill`}
      onError={imageOnError}
    />
  );
};
