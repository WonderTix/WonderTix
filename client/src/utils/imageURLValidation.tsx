import React, {useEffect, useState} from 'react';
import defaultImage from '../assets/pp_logo_black.png';

export const validImageURLCheck = async (url:string) => {
  try {
    if (url === 'defaultEventImage') {
      return true;
    }
    const res = await fetch(url, {method: 'HEAD'});
    const data = await res.blob();
    return data.type.startsWith('image');
  } catch (err) {
    return false;
  }
};

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
  const [source, setSource] = useState('');
  return (
    <>
      <img
        className={className}
        src={getImageDefault(src)}
        alt={'Event Playbill'}
        onError={imageOnError}/>
    </>);
};

