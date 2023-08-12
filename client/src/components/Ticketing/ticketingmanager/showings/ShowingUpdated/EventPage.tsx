import {EventInstanceForm} from './EventInstanceForm';
import React, {useEffect, useState} from 'react';
import {WtixEvent} from '../../../../../interfaces/showing.interface';
import {Container} from '@mui/material';
import {EventGeneralForm} from './EventGeneralForm';

const getDataForEventAndShows = async (eventID, setEventData, setLoading) => {
  const eventData: WtixEvent = {
    seasonid: undefined,
    eventid: undefined,
    eventname: '',
    eventdescription: '',
    active: false,
    imageurl: '',
    showings: [],
  };
  await fetch(process.env.REACT_APP_API_1_URL +'/events/' + eventID)
      .then((response) => {
        return response.json();
      }).then((data)=>{
        eventData.eventname = data.data[0].title;
        eventData.eventdescription = data.data[0].description;
        eventData.active = data.data[0].active;
        eventData.imageurl = data.data[0].imageurl;
        eventData.eventid = data.data[0].eventid;
        eventData.seasonid = data.data[0].seasonid;
      });

  await fetch(process.env.REACT_APP_API_1_URL +
    `/events/instances/${eventID}`)
      .then((response) => {
        return response.json();
      }).then((data)=>{
        eventData.showings = data.data;
      });

  for (const showing of eventData.showings) {
    if (!showing.seatsForType) {
      showing.seatsForType = [];
    }
    if (!showing.ticketTypeId) {
      showing.ticketTypeId = [];
    }
    await fetch(process.env.REACT_APP_API_1_URL +
      `/tickets/restrictions/${showing.eventinstanceid}`)
        .then((response) => {
          return response.json();
        }).then((res) => {
          for (const item of res.data) {
            if (showing.seatsForType) {
              showing.seatsForType.push(item.ticketlimit);
            }
            if (showing.ticketTypeId) {
              showing.ticketTypeId.push(item.tickettypeid_fk);
            }
          }
        });
  }
  console.log(eventData.showings[4]);
  setEventData(eventData);
  if (eventData.showings !== undefined) {
    setLoading(false);
  }
};


export const TestPage = () => {
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(undefined);
  const [ticketTypes, setTicketTypes] = useState([]);
  useEffect( () => {
    fetchTicketTypes();
    getDataForEventAndShows(32, setEventData, setLoading);
  }, []);

  const fetchTicketTypes = async () => {
    const res = await fetch(process.env.REACT_APP_API_1_URL +
      '/tickets/allTypes');
    const data = await res.json();
    console.log(data);
    setTicketTypes(data.data);
  };

  if (loading == true) {
    return (
      <div className='flex flex-row'>
        Loading
      </div>
    );
  } else {
    return (
      <Container>
        <div className={'bg-zinc-900/60 p-7' +
          ' white flex flex-col  p-6 rounded-xl shadow-xl'}>
          <h2>{eventData?'Event Information':'Add Event'}</h2>
          <EventGeneralForm initialValues={eventData}/>
        </div>
        <div className='flex flex-col gap-2'>
          {
          eventData && eventData.showings?
            eventData.showings.map((showing) => (
              <div key={'showing '+showing.eventinstanceid}>
                <EventInstanceForm
                  initialValues={showing}
                  eventid={eventData.eventid}
                  ticketTypes={ticketTypes}
                />
              </div>
            )):
            null
          }
          <EventInstanceForm
            eventid={eventData.eventid}
            ticketTypes={ticketTypes}
          />
        </div>
      </Container>
    );
  }
};

