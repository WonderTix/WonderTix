import {UpdatedShowing} from '../../../../../interfaces/showing.interface';
import React from 'react';
import format from 'date-fns/format';
import {toDateStringFormat} from './util/EventsUtil';
import {useEvent} from './EventProvider';
import {getTicketTypeKeyValue} from './ShowingUtils';

import {LineItem} from './LineItem';

interface EventInstanceViewProps {
  showing: UpdatedShowing;
  setEdit: () => void;
}

export const EventShowingView = (props: EventInstanceViewProps) => {
  const {showing, setEdit} = props;
  const {ticketTypes, editing, showPopUp} = useEvent();
  const formatUSD = new Intl.NumberFormat('en-us', {
    currency: 'USD',
    style: 'currency',
  });
  const showingDate = new Date(
    `${toDateStringFormat(showing.eventdate)} ${showing.eventtime
      .split('T')[1]
      .slice(0, 8)}`,
  );

  return (
    <div className={'bg-gray-300 rounded-xl p-2'}>
      <div
        className={`bg-gray-200 grid grid-cols-12 p-4 rounded-lg min-[1350px]:h-[175px] gap-2`}
        data-testid='showing-card'
      >
        <div
          className={`flex flex-col justify-center bg-white m-auto col-span-12 min-[1350px]:col-span-4 rounded-lg p-3 w-[100%] h-[100%] shadow-xl`}
        >
          <LineItem
            label={'Showing ID'}
            information={showing.eventinstanceid}
          />
          <LineItem
            label={'Date'}
            information={format(showingDate, 'eee, MMM dd yyyy')}
          />
          <LineItem
            label={'Time'}
            information={format(showingDate, 'hh:mm a')}
          />
          <LineItem label={'Total Tickets'} information={showing.totalseats} />
          <LineItem
            label={'Available Tickets'}
            information={showing.availableseats}
          />
        </div>
        <div
          className={
            'overflow-y-auto overflow-x-auto col-span-12 min-[1350px]:col-span-7 shadow-xl border border-white rounded-xl bg-white w-[100%] min-h-[100px]'
          }
        >
          <table className={'table table-fixed text-sm min-w-[100%]'}>
            <thead
              className={`text-left text-zinc-800 whitespace-nowrap bg-gray-300 ${
                showPopUp ? '' : 'sticky'
              } top-0 `}
            >
              <tr>
                <th className={'px-2 py-1 border border-white'}>
                  Admission Type
                </th>
                <th className={'px-2 py-1 border border-white'}>
                  Ticket Price
                </th>
                <th className={'px-2 py-1 border border-white'}>
                  Concession Price
                </th>
                <th className={'px-2 py-1 border border-white'}>Quantity</th>
              </tr>
            </thead>
            <tbody className={'whitespace-nowrap'}>
              {showing.ticketrestrictions.length !== 0 &&
                ticketTypes &&
                showing.ticketrestrictions
                  .sort((a, b) => (a.tickettypeid_fk === 1 ? -1 : 1))
                  .map((type, index) => (
                    <tr
                      key={`${showing.eventinstanceid} ${type.tickettypeid_fk} ${index}`}
                    >
                      <td className={'px-2'}>
                        {getTicketTypeKeyValue(
                          type.tickettypeid_fk,
                          'description',
                          ticketTypes,
                        )}
                      </td>
                      <td className={'px-2'}>{formatUSD.format(type.price)}</td>
                      <td className={'px-2'}>
                        {formatUSD.format(type.concessionprice)}
                      </td>
                      <td className={'px-2'}>{type.ticketlimit}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div
          className={
            'grid content-center mx-auto col-span-12 min-[1350px]:col-span-1'
          }
        >
          <button
            disabled={editing || showPopUp}
            type={'button'}
            onClick={setEdit}
            className={
              ' bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold p-2 px-4 rounded-xl'
            }
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
