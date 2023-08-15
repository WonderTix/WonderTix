import {Showing} from '../../../../../interfaces/showing.interface';
import React from 'react';
import format from 'date-fns/format';
import {toDateStringFormat} from '../../Events/showingInputContainer';

import {useEvent} from './EventProvider';
import {getTicketTypeArray, getTicketTypePrice} from './ShowingUtils';
import {Item} from './InputControl';

interface EventInstanceViewProps {
  showing: Showing;
}

export const EventShowingView = (props: EventInstanceViewProps) => {
  const {showing} = props;
  const {ticketTypes} = useEvent();
  /* eslint-disable max-len */
  return (
    <div key={showing.eventinstanceid}>
      <div className='bg-zinc-900/60 text-zinc-100 p-7
                grid grid-cols-2 rounded-xl gap-1'>
        <div className={'col-span-1 flex flex-row justify-between'}>
          <div className='flex flex-col gap-2'>
            <Item label={'Showing ID'} information={showing.eventinstanceid}/>
            <Item
              label={'Showing Date'}
              information={format(new Date(toDateStringFormat(showing.eventdate)),
                  'eee, MMM dd yyyy')}
            />
            <Item
              label={'Showing Time'}
              information=
                {format(new Date(`${toDateStringFormat(showing.eventdate)} ${showing.eventtime.slice(0, 8)}`), 'hh:mm a')}
            />
          </div>
          <div className='flex flex-col gap-2 justify-center'>
            <Item
              label={'Total Ticket Quantity'}
              information={showing.totalseats}
            />
            <Item
              label={'Available Ticket Quantity'}
              information={showing.availableseats}
            />
          </div>
        </div>
        <div className={'col-span-1 w-[50%] max-h-[100%]'}>
          <table className={'table table-fixed'}>
            <thead>
              <tr>
                <th className={'font-bold p-2 border-b text-left'}>
              Admission Type
                </th>
                <th className={'font-bold p-2 border-b text-left'}>
              Ticket Price
                </th>
                <th className={'font-bold p-2 border-b text-left'}>
              Concession Price
                </th>
                <th className={'font-bold p-2 border-b text-left'}>
              Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {
                showing.ticketTypeId?
                getTicketTypeArray(showing.ticketTypeId, showing.seatsForType).map((type, index)=>(
                  <tr key={`${showing.eventinstanceid} ${type.typeID} ${index}`}>
                    <td>{getTicketTypePrice(type.typeID, 'description', ticketTypes)}</td>
                    <td>{getTicketTypePrice(type.typeID, 'price', ticketTypes)}</td>
                    <td>{getTicketTypePrice(type.typeID, 'concessions', ticketTypes)}</td>
                    <td>{type.typeQuantity}</td>
                  </tr>
                )):
                  null
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
