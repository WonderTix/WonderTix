/* eslint-disable camelcase */
import React, {useEffect, useState} from 'react';
import Udash_nav from '../../udash_navbar';
import EditEventPage from './EditEventPage';
import {useParams} from 'react-router-dom';
import { WtixEvent } from '../../../../../interfaces/showing.interface';

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
    const eventData: WtixEvent = {
      seasonid: undefined,
      eventid: undefined,
      eventname: '',
      eventdescription: '',
      active: false,
      image_url: '',
      showings: [],
    };
    await fetch(process.env.REACT_APP_API_1_URL +'/events/' + params.eventid)
        .then((response) => {
          return response.json();
        }).then((data)=>{
          eventData.eventname = data.data[0].title;
          eventData.eventdescription = data.data[0].description;
          eventData.active = data.data[0].active;
          eventData.image_url =data.data[0].image_url;
          eventData.eventid = data.data[0].eventid;
          eventData.seasonid = data.data[0].seasonid;
        });
    await fetch(process.env.REACT_APP_API_1_URL +
          `/events/instances/${params.eventid}`)
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

