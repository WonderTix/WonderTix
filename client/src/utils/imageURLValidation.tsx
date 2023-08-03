import React from 'react';
import defaultImage from '../assets/pp_logo_black.png';

export const getImageDefault = (url?:string) => {
  if (url == undefined || url === 'defaultEventImage') {
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
}
export const EventImage = (props:EventImageProps) => {
  const {src, className} = props;
  return (
    <>
      <img
        className={className}
        src={getImageDefault(src)}
        alt={'Event Playbill'}
        onError={imageOnError}/>
    </>);
};

