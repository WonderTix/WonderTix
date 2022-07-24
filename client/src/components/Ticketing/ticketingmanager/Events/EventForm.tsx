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
import {useCallback, useState} from 'react';
import CreateShowing from './Add_event/createShowing';
import {useSelector} from 'react-redux';


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
  const [eventName, setventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [imageUrl, setImageURL] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [showings, setShowings] = useState([]);
  const [showList, setShowList] = useState([]);
  const [showBoxID, setShowBoxID] = useState(0);

  console.log(showings);
  // Callback to get new show from child component to the parent
  const addShow = useCallback((show) =>{
    setShowings([...showings, show]);
  }, [showings]);

  // Wrapper for callback to add new show to the list of showings
  const addShowSection = (event) => {
    // Update id for new Show box appended to the list
    setShowBoxID(showBoxID +1);
    // Insert new box to the Event form
    setShowList(showList.concat(
        <CreateShowing key={showBoxID} showings={showings}
          addShow={addShow} />));
  };

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
        // <form onSubmit={handleSubmit}>
        //   <div className='bg-white flex flex-col  p-6 rounded-xl shadow-xl'>
        //     <div className='text-3xl font-semibold mb-5'>
        //         Event Information
        //     </div>
        //     <div className='w-full flex flex-col '>
        //       <h3 className='text-sm text-zinc-600 '>Enter Event Name</h3>
        //       <input
        //         type="input"
        //         id="eventName"
        //         name='eventName'
        //         onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
        //           seteventName(ev.target.value)
        //         }
        //         className='w-full p-2 rounded-lg border border-zinc-300 mb-4'
        //         placeholder='Event Name'
        //       />
        //       <h3 className='text-sm text-zinc-600 '>Enter Short Event Description</h3>
        //       <input
        //         type="input"
        //         name='eventDesc'
        //         id="eventDesc"
        //         onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
        //           setEventDesc(ev.target.value)
        //         }
        //         className='w-full p-2 rounded-lg border border-zinc-300 mb-4'
        //         placeholder='Event Description'
        //       />
        //       <h3 className='text-sm text-zinc-600 '>Upload Image for Event</h3>
        //       <input
        //         type="input"
        //         name='imageUrl'
        //         id="imageUrl"
        //         onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
        //           setImageURL(ev.target.value)
        //         }
        //         className='w-full p-2 rounded-lg border border-zinc-300 mb-4'
        //         placeholder='image URL'
        //       />
        //     </div>
        //     <div className='text-3xl font-semibold mt-5'>
        //         Showings
        //     </div>
        //     <div className='mb-3 text-sm text-zinc-600'>
        //         You can configure occurances of this event below. To add more, click the "Add Showing" button.
        //     </div>
        //     <div>
        //       <CreateShowing
        //     shows={showings} ticketTypes={ticketTypes}
        //     initialValues={initialValues} addShow={addShow}
        //       // during add you add new Create Showing
        //       />
        //     </div>
        //
        //     <div>
        //       <button
        //         className='px-3 py-2 bg-green-500 text-white rounded-xl  '
        //         type='button'
        //         onClick={() => push('showings', undefined)}
        //         disabled={editMode}
        //       >
        //         Add Showing
        //       </button>
        //     </div>
        //   </div>
        //
        //   <button
        //     className='px-3 py-2 bg-blue-600 text-white rounded-xl mt-5'
        //     type='submit'
        //     disabled={!editMode && (submitting || pristine)}
        //   >
        //     {editMode ? 'Save Changes' : 'Save New Event'}
        //   </button>
        // </form>
        <>
          <div id="show-table">
            {showList}
          </div>
          <div>
            <button
              className='px-3 py-2 bg-green-500 text-white rounded-xl'
              type='button'
              onClick={addShowSection}
              disabled={editMode}
            >
          Add Showing
            </button>
          </div>
        </>
      )}
    />
  );
};

export default EventForm;
