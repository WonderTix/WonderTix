/* eslint-disable max-len */
import {Showing} from '../../../../../interfaces/showing.interface';
import React from 'react';
import format from 'date-fns/format';
import {toDateStringFormat} from '../../Events/showingInputContainer';
import {useEvent} from './EventProvider';
import {getTicketTypeArray, getTicketTypePrice} from './ShowingUtils';
import {LineItem} from './InputControl';
import {Button} from '@mui/material';

interface EventInstanceViewProps {
  showing: Showing;
  setEdit: (value) => void;
}

export const EventShowingView = (props: EventInstanceViewProps) => {
  const {showing, setEdit} = props;
  const {ticketTypes, setEditing, editing, showPopUp} = useEvent();

  return (
    <div className={'bg-blue-100 rounded-xl p-2'}>
      <div
        className={`bg-blue-400 grid grid-cols-12 p-4 rounded-lg h-[300px] min-[1350px]:h-[175px] gap-2`}
      >
        <div className={'col-span-12 min-[1350px]:col-span-4 rounded-lg p-2 w-[100%] bg-blue-200'}>
          <div className={`flex flex-col justify-center bg-white m-auto col-span-12 min-[1350px]:col-span-4 rounded-lg p-3 w-[100%] h-[100%]`}>
            <LineItem
              label={'Showing ID'}
              information={showing.eventinstanceid}
            />
            <LineItem
              label={'Date'}
              information={format(new Date(toDateStringFormat(showing.eventdate)), 'eee, MMM dd yyyy')}
            />
            <LineItem
              label={'Time'}
              information=
                {format(new Date(`${toDateStringFormat(showing.eventdate)} ${showing.eventtime.slice(0, 8)}`), 'hh:mm a')}
            />
            <LineItem
              label={'Total Tickets'}
              information={showing.totalseats}
            />
            <LineItem
              label={'Available Tickets'}
              information={showing.availableseats}
            />
          </div>
        </div>
        <div className={'overflow-y-auto overflow-x-auto col-span-12 min-[1350px]:col-span-7 shadow-xl border border-white mx-auto rounded-xl bg-white w-[100%]'}>
          <table className={'table table-fixed text-sm min-w-[100%]'}>
            <thead className={`text-left text-zinc-800 whitespace-nowrap bg-blue-200 ${showPopUp?'':'sticky'} top-0 `}>
              <tr>
                <th className={'px-2 py-1 border border-white'}>Admission Type</th>
                <th className={'px-2 py-1 border border-white'}>Ticket Price</th>
                <th className={'px-2 py-1 border border-white'}>Concession Price</th>
                <th className={'px-2 py-1 border border-white'}>Quantity</th>
              </tr>
            </thead>
            <tbody className={'whitespace-nowrap'}>
              {
                showing.ticketTypeId&&showing.ticketTypeId.length>0?
                getTicketTypeArray(showing.ticketTypeId, showing.seatsForType).map((type, index)=>(
                  <tr key={`${showing.eventinstanceid} ${type.typeID} ${index}`}>
                    <td className={'px-2'}>{getTicketTypePrice(type.typeID, 'description', ticketTypes)}</td>
                    <td className={'px-2'}>{getTicketTypePrice(type.typeID, 'price', ticketTypes)}</td>
                    <td className={'px-2'}>{getTicketTypePrice(type.typeID, 'concessions', ticketTypes)}</td>
                    <td className={'px-2'}>{type.typeQuantity}</td>
                  </tr>
                )):
                  <tr>
                    <td className='px-2 text-zinc-800 font-semibold min-[1350px]:text-center' colSpan={4}>No Ticket Types Selected For Showing</td>
                  </tr>
              }
            </tbody>
          </table>
        </div>
        <div className={'grid content-center mx-auto col-span-12 min-[1350px]:col-span-1'}>
          <Button
            color={'success'}
            variant={'contained'}
            disabled={editing}
            onClick={async () => {
              setEdit((edit) => !edit);
              setEditing((edit) => !edit);
            }}
            sx={{maxHeight: '30px'}}
          >
      Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
