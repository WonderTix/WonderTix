/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {Form} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
// import {FieldArray} from 'react-final-form-arrays';
import React, {useCallback, useState, useEffect} from 'react';
import InputFieldForEvent from './InputField';
import ShowListController from '../Events/showListController';
import {Showing, WtixEvent} from '../../../../interfaces/showing.interface';
import PopUp from '../../Pop-up';

/**
 * Type of ticket
 *
 * @module
 * @param {number} id
 * @param {string} name
 * @param {number} price
 * @param {number} concessions
 */
export interface TicketType {
    id: number,
    name: string,
    price: number,
    concessions: number,
}

/**
 * Used to create new event data
 *
 * @module
 * @param {number} seasonID?
 * @param {number} eventid?
 * @param {string} eventname
 * @param {string} eventdescription
 * @param {boolean} active
 * @param {string} imageurl - why is this name scheme different
 * @param {Showing} showings
 */
/* export interface WtixEvent {
    seasonID?: number,
    eventid?: number,
    eventname: string,
    eventdescription: string,
    active: boolean,
    imageurl: string,
    showings: Showing []
}*/

/**
 * Validates form data
 *
 * @param {any} formData Data retrieved from form
 * @returns {ValidationErrors}
 */
function validate(formData: any) {
  return (formData.showings?.length > 0) ? undefined : {error: 'Need one or more showings added'};
}

/**
 * Sets initial state
 *
 * @param {Array} showings: DateTime: undefined, ticketType: undefined, ticketTypeId: undefined
 */
const initialState = {
  showings: [{
    DateTime: undefined,
    ticketType: undefined,
    ticketTypeId: undefined,
  }],
};

/**
 * Used for submission
 *
 * @param {WtixEvent} formData - starts void
 * @param {TicketType} tickeTypes - starts empty
 * @param {Partial<WtixEvent>} InitialValues?
 */
interface EventFormProps {
    onSubmit: (formData: WtixEvent) => void
    tickettypes: number[],
    initialValues?: Partial<WtixEvent>,
}

/**
 * Event Form values, set all of them
 *
 * @param eventname - initialValues.eventname || ''
 * @param eventid - initialValues.eventid || -1
 * @param eventdescription - initialValues.eventdescription || ''
 * @param imageurl - initialValues.imageurl || ''
 * @param active - initialValues.active || false
 * @param showings - initialValues.showings || []
 * @param eventname.onSubmit
 * @param {TicketType} eventname.tickettypes
 * @param eventname.initialValues
 * @returns {Form} EventForm
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventForm = ({onSubmit, tickettypes, initialValues}: EventFormProps) => {
  const def: WtixEvent = (initialValues !== undefined) ? {
    eventname: initialValues.eventname,
    eventid: initialValues.eventid,
    eventdescription: initialValues.eventdescription,
    imageurl: initialValues.imageurl,
    active: initialValues.active,
    showings: initialValues.showings,
  }:
  {
    eventname: '',
    eventid: -1,
    eventdescription: '',
    imageurl: '',
    active: false,
    showings: [],
  };

  useEffect(() => {
    console.log(initialValues)
  }, [])
  const [eventname, seteventname] = useState(def.eventname);
  const eventid = def.eventid;
  const [eventdescription, setEventDesc] = useState(def.eventdescription);
  const [imageurl, setImageURL] = useState(def.imageurl);
  const active = def.active;
  // console.log("showings before useState: " + JSON.stringify(def.showings));
  const [showings, setShowings] = useState(def.showings);
  const [showPopUp, setShowPopUp] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    console.log(initialValues);
  });
  // FIELDS CALLBACK
  // Set event name
  const addeventname = useCallback((eventname) => {
    seteventname(eventname.target.value);
  }, [eventname]);
  // Set description
  const addEventDesc = useCallback((event) => {
    setEventDesc(event.target.value);
  }, [eventdescription]);
  // Set url
  const addURL = useCallback((url) => {
    setImageURL(url.target.value);
  }, [imageurl]);

  const setShowingsHandler = (shows) => {
    setShowings(shows);
  };

  // Handle new play and the show options
  const handleSubmit = () => {
    const data: WtixEvent = {
      eventname,
      eventid: eventid,
      eventdescription,
      active,
      imageurl,
      showings: showings,
    };
    console.log(data);
    if (showings.length === 0) {
      setErr('Please enter at least one showing.');
      setShowPopUp(true);
      return;
    }
    if (eventname === '' || eventdescription === '' || showings.length === 0) {
      const conditions = [];
      if (eventname === '') {
        conditions.push('Event name');
      }
      if (eventdescription === '') {
        conditions.push('Event description');
      }
      let message = '';
      if (conditions.length > 0) {
        message += conditions.slice(0, -1).join(', ');
        if (conditions.length > 1) {
          message += ' and ';
        }
        message += conditions[conditions.length - 1];
      }
      if (conditions.length === 1) {
        message += ' field is missing.';
      } else {
        message += ' fields are missing.';
      }
      setErr(message);
      setShowPopUp(true);
      return;
    }
    for (let i = 0; i < data.showings.length; i++) {
      if (data.showings[i].eventdate === '' || data.showings[i].starttime === '') {
        setErr('Each showing must have an event date and an event time.');
        setShowPopUp(true);
        return;
      }
      if (data.showings[i].totalseats < 1) {
        setErr('Each showing must have at least 1 ticket.');
        setShowPopUp(true);
        return;
      }
    }
    for (let i = 0; i < data.showings.length; i++) {
      if (data.showings[i].tickettypeids) {
        for (let j = data.showings[i].tickettypeids.length - 1; j >= 0; j--) {
          if (data.showings[i].tickettypeids[j] === 'NaN') {
            data.showings[i].seatsForType.splice(j, 1);
            data.showings[i].tickettypeids.splice(j, 1);
          }
        }
      }
    }
    onSubmit(data);
  };

  return (
    <div>
      {showPopUp ? <PopUp message={err} title='Failed to save.' handleClose={() => setShowPopUp(false)} handleProceed={() => setShowPopUp(false)} success={false}/> : null}
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues ?? initialState}
        mutators={{...arrayMutators}}
        render={({
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='bg-white flex flex-col  p-6 rounded-xl shadow-xl'>
              <div className='text-3xl font-semibold mb-5'>
                  Event Information
              </div>
              <div className='w-full flex flex-col '>
                <InputFieldForEvent
                  name={'eventname'}
                  id={'eventname'} headerText={'Enter Event Name'}
                  action={addeventname} actionType={'onChange'} value={def.eventname}
                  placeholder={def.eventname ? def.eventname: 'Event Name'} />

                <InputFieldForEvent
                  name={'eventdescription'}
                  id={'eventdescription'} headerText={'Enter Short Event Description'}
                  actionType={'onChange'}
                  action={addEventDesc} value={def.eventdescription}
                  placeholder={def.eventdescription ? def.eventdescription : 'Event Description'} />

                <InputFieldForEvent
                  name={'imageurl'}
                  id={'imageurl'} headerText={'Upload Image for Event'}
                  action={addURL} actionType={'onChange'} value={def.imageurl}
                  placeholder={def.imageurl ? def.imageurl : 'image URL'}/>
              </div>
              {/* Showings container*/}
              <div className='text-3xl font-semibold mt-5'>
                  Showings
              </div>
              <div className='mb-3 text-sm text-zinc-600'>
                  You can configure occurances of this event below.
                  To add more, click the &quot;Add Showing&quot; button.
              </div>
              <div>
                {/*  Button to trigger add of new show*/}
                <div id="show-table">
                  <ShowListController showsData={def.showings.length != 0 ? def.showings: []} eventid={def.eventid} setShowingsHandler={setShowingsHandler}/>
                </div>
              </div>
            </div>

            <button
              className='px-3 py-2 bg-blue-600 text-white rounded-xl mt-5'
              type='submit'
            >
              Save
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default EventForm;
