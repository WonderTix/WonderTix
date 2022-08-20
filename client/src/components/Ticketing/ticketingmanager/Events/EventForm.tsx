/* eslint-disable max-len */
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
// import {FieldArray} from 'react-final-form-arrays';
import {ValidationErrors} from 'final-form';
import React, {useCallback, useState} from 'react';
import InputFieldForEvent from './InputField';
import ShowListController from '../Events/showListController';
import {Showing} from '../../../../interfaces/showing.interface';

interface TicketType {
    id: number,
    name: string,
    price: number,
    concessions: number,
}

export interface NewEventData {
    seasonID?: number,
    eventID?: number,
    eventName: string,
    eventDesc: string,
    isPublished: boolean,
    imageUrl: string,
    showings: Showing []
}

/**
 * Validates form data
 * @param {any} formData Data retrieved from form
 * @return {ValidationErrors}
 */
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
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventForm = ({onSubmit, ticketTypes, initialValues}: EventFormProps) => {
  const def = (initialValues !== undefined) ? {
    eventName: initialValues.eventName,
    eventDesc: initialValues.eventDesc,
    imageUrl: initialValues.imageUrl,
    isPublished: initialValues.isPublished,
    showings: initialValues.showings,
  }:
  {
    eventName: '',
    eventDesc: '',
    imageUrl: '',
    isPublished: false,
    showings: [],
  };
  const [eventName, setEventName] = useState(def.eventName);
  const [eventDesc, setEventDesc] = useState(def.eventDesc);
  const [imageUrl, setImageURL] = useState(def.imageUrl);
  const isPublished = def.isPublished;
  const [showings, setShowings] = useState(def.showings);

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
  const addShowData = useCallback((show) => {
    const isInShowList = showings.some((element) => element.id === show.id);
    if (isInShowList) {
      const newShowList = showings.filter(((element) => element.id !== show.id));
      newShowList.push(show);
      setShowings(newShowList);
    } else {
      setShowings([...showings, show]);
    }
  }, [showings]);

  const updateShows = useCallback((shows: Showing[]) => {
    setShowings(shows);
  }, [showings]);

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

  console.log(def);

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues ?? initialState}
      mutators={{...arrayMutators}}
      validate={validate}
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
                name={'eventName'}
                id={'eventName'} headerText={'Enter Event Name'}
                action={addEventName} actionType={'onChange'} value={def.eventName}
                placeholder={def.eventName ? def.eventName: 'Event Name'} />

              <InputFieldForEvent
                name={'eventDesc'}
                id={'eventDesc'} headerText={'Enter Short Event Description'}
                actionType={'onChange'}
                action={addEventDesc} value={def.eventDesc}
                placeholder={def.eventDesc ? def.eventDesc : 'Event Description'} />

              <InputFieldForEvent
                name={'imageUrl'}
                id={'imageUrl'} headerText={'Upload Image for Event'}
                action={addURL} actionType={'onChange'} value={def.imageUrl}
                placeholder={def.imageUrl ? def.imageUrl : 'image URL'}/>
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
                <ShowListController showsData={def.showings.length != 0 ? def.showings: []} addShowData = {addShowData} updateShows={updateShows}/>
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
  );
};

export default EventForm;
