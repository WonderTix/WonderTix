import React from 'react';
import defaultImage from '../assets/DefaultEventImage.png';

export const getImageDefault = (url?:string) => {
  if (url == undefined || url === 'Default Event Image') {
    return defaultImage;
  }
  return url;
};

export const imageOnError = (event) => {
  event.currentTarget.src = defaultImage;
};

interface EventImageProps {
  className:string;
  src:string;
  title:string;
}
export const EventImage = (props:EventImageProps) => {
  const {src, className, title} = props;
  return (
    <>
      <img
        className={className}
        src={getImageDefault(src)}
        alt={`${title} Playbill`}
        onError={imageOnError}/>
    </>);
};

