/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unescaped-entities */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {Form} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {FieldArray} from 'react-final-form-arrays';
import {ValidationErrors} from 'final-form';
import {useCallback, useEffect, useState} from 'react';
import ShowingInputContainer from './Add_event/showingInputContainer';
import InputFieldForEvent from '../../../InputField';
import React from 'react';

interface TicketType {
    id: number,
    name: string,
    price: number,
    concessions: number,
}

export interface NewEventData {
    eventName: string,
    eventDesc: string,
    isPublished: boolean,
    imageUrl: string,
    showings: Showing []
}

export interface Showing {
  id?: number,
  starttime: Date,
  eventdate: Date,
  ticketTypeId: string,
  totalseats: number
}

function validate(formData: any): ValidationErrors {
  return (formData.showings?.length > 0) ? undefined : {error: 'Need one or more showings added'};
}

const initialState = {
  showings: [{
    DateTime: undefined,
    ticketType: undefined,
    ticketTypeId: undefined,
  }],
};


interface EventFormProps {
    onSubmit: (formData: NewEventData) => void
    ticketTypes: TicketType[],
    initialValues?: Partial<NewEventData>,
    editMode?: boolean
}

const EventForm = ({onSubmit, ticketTypes, initialValues, editMode}: EventFormProps) => {
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [imageUrl, setImageURL] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [showings, setShowings] = useState([]);
  const [showList, setShowList] = useState([]);
  const [showBoxID, setShowBoxID] = useState(0);
  console.log(showList);
  // FIELDS CALLBACK
  // Set event name
  const addEventName = useCallback((eventName) => {
    setEventName(eventName.target.value);
  }, [eventName]);
  // Set description
  const addEventDesc = useCallback((event) => {
    setEventDesc(event.target.value);
  }, [eventDesc]);
  // Set url
  const addURL = useCallback((url) => {
    setImageURL(url.target.value);
  }, [imageUrl]);

  // Callback to get new show from child component to the parent
  const addShowData = useCallback((show) =>{
    setShowings([...showings, show]);
  }, [showings]);

  // SHOWINGS ACTIONS:
  const deleteShowing = useCallback((id: number) => {
    console.log(id);
    if (showBoxID >= 1) {
      setShowBoxID(showBoxID - 1);
    } else {
      setShowBoxID(0);
    }
    //  find show box that has to be removed

    // console.log(showList.filter((item: React.ReactElement) => item.props.id !== id));
    setShowList((showList: any) => showList.filter((item: React.ReactElement) => item.props.id !== id));
  }, [showList, showBoxID]);

  // Wrapper for callback to add new show to the list of showings
  const addShowSection = useCallback((event) => {
    // Update id for new Show box appended to the list
    // Insert new box to the Event form
    const newShowBoxList = [...showList,
      <ShowingInputContainer key={showBoxID} id={showBoxID} showings={showings} deleteShow={deleteShowing} addShow={addShowData} />];
    setShowBoxID(showBoxID + 1);
    setShowList(newShowBoxList);
    console.log(showList);
  }, [showList]);


  // Handle new play and the show options
  const handleSubmit = () => {
    const data: NewEventData = {
      eventName,
      eventDesc,
      isPublished,
      imageUrl,
      showings,
    };
    onSubmit(data);
  };


  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues ?? initialState}
      mutators={{...arrayMutators}}
      validate={validate}
      render={({
        handleSubmit,
        form: {mutators: {push, pop}},
        pristine,
        submitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className='bg-white flex flex-col  p-6 rounded-xl shadow-xl'>
            <div className='text-3xl font-semibold mb-5'>
                Event Information
            </div>
            <div className='w-full flex flex-col '>
              <InputFieldForEvent
                name={'eventName'}
                id={'eventName'} headerText={'Enter Event Name'}
                action={addEventName} actionType={'onChange'}
                placeholder={'Event Name'} />

              <InputFieldForEvent
                name={'eventDesc'}
                id={'eventDesc'} headerText={'Enter Short Event Description'}
                actionType={'onChange'}
                action={addEventDesc}
                placeholder={'Event Description'} />

              <InputFieldForEvent
                name={'imageUrl'}
                id={'imageUrl'} headerText={'Upload Image for Event'}
                action={addURL} actionType={'onChange'}
                placeholder={'image URL'} />
            </div>
            {/* Showings container*/}
            <div className='text-3xl font-semibold mt-5'>
                Showings
            </div>
            <div className='mb-3 text-sm text-zinc-600'>
                You can configure occurances of this event below.
                To add more, click the "Add Showing" button.
            </div>
            <div>
              <div id="show-table">
                {showList}
              </div>
              {/*  Button to trigger add of new show*/}
              <div>
                <button
                  className='px-3 py-2 bg-green-500 text-white rounded-xl'
                  type='button' onClick={addShowSection}
                  disabled={editMode}>
                    Add Showing
                </button>
              </div>
            </div>
          </div>

          <button
            className='px-3 py-2 bg-blue-600 text-white rounded-xl mt-5'
            type='submit'
            disabled={!editMode && (submitting || pristine)}
          >
            {editMode ? 'Save Changes' : 'Save New Event'}
          </button>
        </form>
      )}
    />
  );
};

export default EventForm;
