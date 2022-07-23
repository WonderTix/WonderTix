/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import {FieldArray} from 'react-final-form-arrays';
import {useState} from 'react';

interface TicketType {
    id: number,
    name: string,
    price: number,
    concessions: number,
}

interface Showing {
    id?: number,
    starttime: Date,
    eventdate: Date,
    ticketTypeId: string,
    totalseats: number
}
const CreateShowing = (ticketTypes, initialValues, editMode) => {
  const [starttime, setStarttime] = useState(Date);
  const [eventdate, setEventdate] = useState(Date);
  const [ticketTypeId, setTicketTypeId] = useState('');
  const [totalseats, setTotalseats] = useState(Number);

  console.log(ticketTypes);
  return (
    <div className='bg-violet-200 rounded-xl p-10 shadow-md mb-4'>
      <FieldArray name='showings'>
        {({fields}) =>
          fields.map((name, i) => (
            <div key={name} className='shadow-xl p-5 rounded-xl mb-9 bg-violet-700'>
              <label className='font-semibold text-white mb-7 mt-7  '>Show # {i + 1}</label>
              <div className='flex flex-col gap-5 mt-5 pr-20'>
                <input
                  className='input rounded-lg p-2 bg-violet-100'
                  name={`${name}.totalseats`}
                  type='number'
                  required
                  placeholder='# of Seats'
                  disabled={editMode}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setTotalseats(parseInt(ev.target.value))
                  }
                />
                <select
                  className='p-2 rounded-lg bg-violet-100'
                  name={`${name}.ticketTypeId`}
                  required
                  placeholder='Select Ticket Type'
                  onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                    setTicketTypeId(ev.target.value)
                  }
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
                    <input type="date" name={`${name}.DateTime`} className='input w-full p-2 rounded-lg bg-violet-100 mb-7 '
                      onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                        setEventdate(ev.target.value)
                      }/>
                  </div>
                  <div >
                    <h3 className='font-semibold text-white'>Enter time</h3>
                    <input type="time" name="eventtime" className='w-full p-2 rounded-lg bg-violet-100  mb-7 '
                      onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                        setStarttime(ev.target.value)
                      }/>
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

  );
};

export default CreateShowing;
