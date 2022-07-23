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
// import DateFnsUtils from '@date-io/date-fns';
import {ValidationErrors} from 'final-form';
// import {KeyboardDateTimePicker} from '@material-ui/pickers';
// import DateFnsUtils from '@mui/lab/AdapterDateFns';


interface TicketType {
    id: number,
    name: string,
    price: number,
    concessions: number,
}

export interface NewEventData {
    eventname: string,
    eventdescription: string,
    isPublished: boolean,
    image_url: string,
    showings: {
        id?: number,
        DateTime: Date,
        ticketTypeId: string,
        totalseats: number
    }[]
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
  return (
    <Form
      onSubmit={onSubmit}
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
            <div className='w-full flex flex-col gap-2'>
              <h3 className='text-sm text-zinc-600 mb-1'>Enter Event Name</h3>
              <input
                type="input"
                id="Event"
                name='eventname'
                className='w-full p-2 rounded-lg border border-zinc-300 mb-3'
                placeholder='Event Name'
              />
              <h3 className='text-sm text-zinc-600 mb-1'>Enter Short Event Description</h3>
              <input
                type="input"
                name='eventdescription'
                id="EventDescription"
                className='w-full p-2 rounded-lg border border-zinc-300 mb-3'
                placeholder='Event Description'
              />
              <h3 className='text-sm text-zinc-600 mb-1'>Upload Image for Event</h3>
              <div className='mb-7'>
                <div className="mt-1 flex justify-center
                       px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed
                        rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12
                           text-gray-400" stroke="currentColor"
                    fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0
                             0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8
                              32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="image_url" type="file" accept="image/*" className="sr-only"/>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-3xl font-semibold mt-5'>
                Showings
            </div>
            <div className='mb-3 text-sm text-zinc-600'>
                You can configure occurances of this event below. To add more, click the "Add Showing" button.
            </div>

            <div className='bg-violet-200 rounded-xl p-5 shadow-md mb-4'>
              <FieldArray name='showings'>
                {({fields}) =>
                  fields.map((name, i) => (
                    <div key={name} className='shadow-xl p-5 rounded-xl mb-4 bg-violet-700'>
                      <label className='font-semibold text-white mb-7 mt-7  '>Show # {i + 1}</label>
                      <div className='flex flex-col gap-5 mt-5 pr-20'>
                        <input
                          className='input rounded-lg p-2 bg-violet-100'
                          name={`${name}.totalseats`}
                          type='number'
                          required
                          placeholder='# of Seats'
                          disabled={editMode}
                        />
                        <select
                          className='p-2 rounded-lg bg-violet-100'
                          name={`${name}.ticketTypeId`}
                          required
                          placeholder='Select Ticket Type'
                        >
                          <option className='text-sm text-zinc-700 '>Select Ticket Type</option>
                          {ticketTypes.map((t) =>
                            <option key={t.id} value={t.id}>
                              {`${t.name}: ${t.price} (+ ${t.concessions} concessions)`}
                            </option >,
                          )}
                        </select>
                        <div className="flex flex-row gap-10">
                          <div>
                            <h3 className='font-semibold text-white'>Enter Date</h3>
                            <input type="date" name={`${name}.DateTime`} className='input w-full p-2 rounded-lg bg-violet-100 mb-7 '/>
                          </div>
                          <div >
                            <h3 className='font-semibold text-white'>Enter time</h3>
                            <input type="time" name="eventtime" className='w-full p-2 rounded-lg bg-violet-100  mb-7 '/>
                          </div>
                        </div>
                      </div>
                      <button
                        className='px-2 py-1 bg-red-500 mt-2 mb-4 text-white rounded-lg text-sm'
                        onClick={() => fields.remove(i)}
                        disabled={editMode}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                }
              </FieldArray>
            </div>

            <div>
              <button
                className='px-3 py-2 bg-green-500 text-white rounded-xl  '
                type='button'
                onClick={() => push('showings', undefined)}
                disabled={editMode}
              >
                Add Showing
              </button>
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
