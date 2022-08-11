/* eslint-disable camelcase */
import React, {useEffect, useState} from 'react';
import Udash_nav from '../../udash_navbar';
import EditEventPage from './EditEventPage';
import {useParams} from 'react-router-dom';
import {NewEventData} from '../EventForm';

const Editeventmain = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(undefined);
  const [shows, setShows] = useState();

  const getEventToEdit = () => {
    fetch(process.env.REACT_APP_ROOT_URL +'/api/events/' + params.eventid)
        .then((response) => {
          return response.json();
        }).then((data)=>{
          console.log(data);
          const eventData: NewEventData = {
            eventName: data[0].title,
            eventDesc: data[0].description,
            isPublished: data[0].active,
            imageUrl: data[0].image_url,
            showings: [],
          };
          setEvent(eventData);
        });
  };
  const getShowsToEdit = () => {
    fetch(process.env.REACT_APP_ROOT_URL +'/api/events/')
        .then((response) => {
          return response.json();
        }).then((data)=>{
          console.log(data);
          setShows(data);
          setLoading(false);
        });
  };

  useEffect( () => {
    getEventToEdit();
    getShowsToEdit();
    if (shows !== undefined && event !== undefined) {
      setLoading(false);
    }
  }, []);

  if (loading == true) {
    return (
      <div className='flex flex-row'>
        <Udash_nav/>
      </div>
    );
  } else {
    return (
      <div className='flex flex-row '>
        <Udash_nav/>
        <EditEventPage event={event} shows={shows}/>
      </div>
    );
  }
};

export default Editeventmain;

