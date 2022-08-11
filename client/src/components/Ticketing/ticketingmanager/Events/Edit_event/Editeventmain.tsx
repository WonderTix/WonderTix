/* eslint-disable camelcase */
import React, {useEffect, useState} from 'react';
import Udash_nav from '../../udash_navbar';
import EditEventPage from './EditEventPage';

const Editeventmain = () => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState();
  const [shows, setShows] = useState();

  const getEventToEdit = () => {
    fetch(process.env.REACT_APP_ROOT_URL +'/api/events/')
        .then((response) => {
          return response.json();
        }).then((data)=>{
          setEvent(data);
        });
  };
  const getShowsToEdit = () => {
    fetch(process.env.REACT_APP_ROOT_URL +'/api/events/')
        .then((response) => {
          return response.json();
        }).then((data)=>{
          setShows(data);
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

