/* eslint-disable camelcase */
import React, {useEffect, useState} from 'react';
import Udash_nav from '../../udash_navbar';
import EditEventPage from './EditEventPage';
import {useParams} from 'react-router-dom';
import {NewEventData} from '../EventForm';

/**
 * As the name says
 *
 * @returns {Udash_nav, EditsEventPage} or only Udash_nav if loading.
 * Also response.json()
 */
const Editeventmain = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(undefined);

  const getDataForEventAndShows = async () => {
    const eventData: NewEventData = {
      seasonID: undefined,
      eventID: undefined,
      eventName: '',
      eventDesc: '',
      isPublished: false,
      imageUrl: '',
      showings: [],
    };
    await fetch(process.env.REACT_APP_ROOT_URL +'/api/events/' + params.eventid)
        .then((response) => {
          return response.json();
        }).then((data)=>{
          eventData.eventName = data.data[0].title;
          eventData.eventDesc = data.data[0].description;
          eventData.isPublished = data.data[0].active;
          eventData.imageUrl =data.data[0].image_url;
          eventData.eventID = data.data[0].eventid;
          eventData.seasonID= data.data[0].seasonid;
        });
    await fetch(process.env.REACT_APP_ROOT_URL +
          `/api/events/instances/${params.eventid}`)
        .then((response) => {
          return response.json();
        }).then((data)=>{
          eventData.showings = data.data;
        });
    setEventData(eventData);
    if (eventData.showings !== undefined) {
      setLoading(false);
    }
  };
  useEffect( () => {
    getDataForEventAndShows();
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
        <EditEventPage initValues={eventData}/>
      </div>
    );
  }
};

export default Editeventmain;

