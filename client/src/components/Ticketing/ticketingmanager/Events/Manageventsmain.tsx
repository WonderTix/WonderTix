/* eslint-disable camelcase */
import React, {useState, useEffect} from 'react';
import Udash_nav from '../udash_navbar';
import ManageEventsPage from './ManageEvents';

const Manageventmain = () => {
  const [eventData, setEventData] = useState();
  const [loading, setLoading] = useState(true);

  const getDataFromServer = async () => {
    fetch(process.env.REACT_APP_ROOT_URL +'/api/events/')
        .then((response) => {
          return response.json();
        }).then((data)=>{
          setEventData(data);
          console.log('From Manageventmain');
          console.log(data);
          setLoading(false);
        });
  };
  useEffect(()=>{
    getDataFromServer();
  }, []);

  if (loading === true) {
    return (
      <div className='flex flex-row'>
        <Udash_nav/>
        <h1>Loading</h1>
      </div>
    );
  } else {
    return (
      <div className='flex flex-row'>
        <Udash_nav/>
        <ManageEventsPage data={eventData}/>
      </div>
    );
  }
};

export default Manageventmain;
