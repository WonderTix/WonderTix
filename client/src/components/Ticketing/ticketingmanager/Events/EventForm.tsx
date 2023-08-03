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
    if (initialValues) {
      console.log(initialValues.showings);
    }
  }, []);
  const [eventname, seteventname] = useState(def.eventname);
  const eventid = def.eventid;
  const [eventdescription, setEventDesc] = useState(def.eventdescription);
  const [imageurl, setImageURL] = useState(def.imageurl);
  const active = def.active;
  // console.log("showings before useState: " + JSON.stringify(def.showings));
  const [showings, setShowings] = useState(def.showings);
  const [showPopUp, setShowPopUp] = useState(false);
  const [err, setErr] = useState('');
  const [disabledUrl, setDisabledUrl] = useState(false);

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
    console.log(shows);
    setShowings(shows);
  };

  // Handle new play and the show options
  const handleSubmit = async () => {
    const data: WtixEvent = {
      eventname,
      eventid: eventid,
      eventdescription,
      active,
      imageurl,
      showings: showings,
    };
    console.log(data);
    const name = data.eventname?.trim() === '';
    const desc = data.eventdescription?.trim() === '';
    const count = (name?1:0)+(desc?1:0);
    if (count) {
      const len = count>1;
      setErr( `${name?'Event Name':''}${len?', and ':''}${desc?'Event Description':''}${len?' fields are missing':' field is missing'}`);
      setShowPopUp(true);
      return;
    }
    if (showings.length === 0) {
      setErr('Please enter at least one showing.');
      setShowPopUp(true);
      return;
    }
    data.showings.forEach((showing) => {
      if (showing.eventdate === '' || showing.eventtime === '') {
        setErr('Each showing must have an event date and an event time.');
        setShowPopUp(true);
        return;
      }
      if (showing.totalseats < 1) {
        setErr('Each showing must have at least 1 ticket.');
        setShowPopUp(true);
        return;
      }
      const seatsTypeSum = showing.seatsForType.reduce((acc, seats) => acc+seats, 0);
      const eventDate = new Date(showing.eventdate+ ' '+ showing.eventtime);
      if (showing.totalseats != seatsTypeSum) {
        setErr(`The ${eventDate.toLocaleDateString()} 
        ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} 
        showing's total ticket count does not match
        the sum of available tickets per type`);
        setShowPopUp(true);
        return;
      }
    });
    for (let i = 0; i < data.showings.length; i++) {
      if (data.showings[i].ticketTypeId) {
        for (let j = data.showings[i].ticketTypeId.length - 1; j >= 0; j--) {
          if (data.showings[i].ticketTypeId[j] === 'NaN') {
            data.showings[i].seatsForType.splice(j, 1);
            data.showings[i].ticketTypeId.splice(j, 1);
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
                  action={addeventname} actionType={'onChange'} value={eventname}
                  placeholder={def.eventname ? def.eventname: 'Event Name'} />

                <InputFieldForEvent
                  name={'eventdescription'}
                  id={'eventdescription'} headerText={'Enter Short Event Description'}
                  actionType={'onChange'}
                  action={addEventDesc} value={eventdescription}
                  placeholder={def.eventdescription ? def.eventdescription : 'Event Description'} />

                <div className={'grid grid-cols-5'}>
                  <div className='col-span-3 md:col-span-4'>
                    <InputFieldForEvent
                      name={'imageurl'}
                      id={'imageurl'} headerText={'Upload Image for Event'}
                      action={addURL} actionType={'onChange'} value={imageurl}
                      placeholder={def.imageurl ? def.imageurl : 'image URL'}/>
                  </div>
                  <div className='col-span-2 md:col-span-1 flex flex-col mb-4'>
                    <label
                      htmlFor={'defaultImageUrl'}
                      className={'text-sm text-zinc-600 text-center'}
                    >
                      Use Default Image
                    </label>
                    <input
                      name={'defaultImageUrl'}
                      id={'defaultImageUrl'}
                      type='checkbox'
                      value={'default'}
                      checked={disabledUrl}
                      onChange={ () => {
                        setImageURL((!disabledUrl?'defaultEventImage':''));
                        setDisabledUrl(!disabledUrl);
                      }}
                      className={'appearance-none w-8 h-8 p-2 mx-auto checked:bg-blue-500 rounded-lg border border-zinc-300 my-auto my-aut my-auto'}
                    />
                  </div>
                </div>
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
                  <ShowListController showsData={def.showings.length != 0 ? def.showings : []} eventid={def.eventid} setShowingsHandler={setShowingsHandler}/>
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
