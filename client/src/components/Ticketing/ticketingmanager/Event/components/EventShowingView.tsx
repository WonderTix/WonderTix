import {UpdatedShowing} from '../../../../../interfaces/showing.interface';
import React from 'react';
import format from 'date-fns/format';
import {toDateStringFormat} from './util/EventsUtil';
import {useEvent} from './EventProvider';
import {
    cloneShowing,
    createSubmitFunction,
    CloneIcon,
    EditIcon,
    TrashCanIcon,
} from './ShowingUtils';
import {LineItem} from './LineItem';
import {FormButton} from './FormButton';
import {FormDeleteButton} from './FormDeleteButton';

interface EventInstanceViewProps {
  showing: UpdatedShowing;
  setEdit: () => void;
  onDelete: () => void;
}

export const EventShowingView = (props: EventInstanceViewProps) => {
  const {showing, setEdit, onDelete} = props;
  const {
    editing,
    showPopUp,
    setReloadShowing,
    setEditing,
    setPopUpProps,
    token,
  } = useEvent();
  const formatUSD = new Intl.NumberFormat('en-us', {
    currency: 'USD',
    style: 'currency',
  });
  const showingDate = new Date(
    `${toDateStringFormat(showing.eventdate)} ${showing.eventtime
      .split('T')[1]
      .slice(0, 8)}`,
  );

  const onCloneSuccess = async (res) => {
    const data = await res.json();
    setReloadShowing((reload) => !reload);
    setPopUpProps(
      'Success',
      'Showing successfully cloned',
      true,
      `clone-modal-showing-id-${data.eventinstanceid}`,
    );
    setEditing((editing) => !editing);
  };
  const onCloneError = async () => {
    setReloadShowing((reload) => !reload);
    setPopUpProps(
      'Failure',
      'Showing clone failed',
      false,
      'clone-modal-failure',
    );
    setEditing((editing) => !editing);
  };
  const submitClone = createSubmitFunction(
    'POST',
    `${process.env.REACT_APP_API_2_URL}/event-instance`,
    token,
    onCloneSuccess,
    onCloneError,
  );
  return (
    <div className='bg-gray-300 rounded-xl p-2'>
      <div
        className='bg-gray-200 grid grid-cols-12 p-4 rounded-lg gap-2'
        data-testid='showing-card'
      >
        <div className='flex flex-col justify-center bg-white m-auto col-span-12 min-[1350px]:col-span-4 rounded-lg p-3 w-[100%] h-[100%] shadow-xl'>
          <LineItem label='Showing ID' information={showing.eventinstanceid}/>
          <LineItem label='Date' information={format(showingDate, 'eee, MMM dd yyyy')}/>
          <LineItem label='Time' information={format(showingDate, 'h:mm a')}/>
          {showing.detail && showing.detail !== '' && (
            <LineItem
              label='Detail'
              information={showing.detail}
              onClickMethod={(
                set: React.Dispatch<React.SetStateAction<string>>,
                current: string,
              ) => set(current.includes('truncate') ? '' : 'truncate')}
            />
          )}
          <LineItem label='Total Tickets' information={showing.totalseats} />
          <LineItem label='Available Tickets' information={showing.availableseats}/>
        </div>
        <div className='overflow-y-auto overflow-x-auto col-span-12 min-[1350px]:col-span-7 shadow-xl border border-white rounded-xl bg-white w-[100%] min-h-[100px]'>
          <table className='table table-fixed text-sm min-w-[100%]'>
            <thead
              className={`text-left text-zinc-800 whitespace-nowrap bg-gray-300 ${
                showPopUp ? '' : 'sticky'
              } top-0 `}
            >
              <tr>
                <th className='px-2 py-1 border border-white'>
                  Admission Type
                </th>
                <th className='px-2 py-1 border border-white'>Ticket Price</th>
                <th className='px-2 py-1 border border-white'>
                  Concession Price
                </th>
                <th className='px-2 py-1 border border-white'>Quantity</th>
                <th className='px-2 py-1 border border-white'>Sold</th>
              </tr>
            </thead>
            <tbody className='whitespace-nowrap'>
              {showing.ticketrestrictions.length !== 0 &&
                showing.ticketrestrictions
                  .sort((a) => (a.tickettypeid_fk === 1 ? -1 : 1))
                  .map((type, index) => (
                    <tr
                      key={`${showing.eventinstanceid} ${type.tickettypeid_fk} ${index}`}
                    >
                      <td className='px-2'>{type.description}</td>
                      <td className='px-2'>{formatUSD.format(type.price)}</td>
                      <td className='px-2'>
                        {formatUSD.format(type.concessionprice)}
                      </td>
                      <td className='px-2'>{type.ticketlimit}</td>
                      <td className='px-2'>{type.ticketssold}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className='flex flex-row min-[1350px]:grid content-center min-[1350px]:grid-cols-1 gap-3 mx-auto col-span-12 min-[1350px]:col-span-1'>
          <FormButton
            title='Edit'
            testID={`${showing.eventinstanceid}-showing-edit-button`}
            className='flex items-center justify-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white rounded-xl p-2 font-bold shadow-xl'
            disabled={editing || showPopUp}
            onClick={setEdit}
          >
            <EditIcon className='h-6 w-6' />
          </FormButton>
          <FormButton
              title='Clone'
              testID={`${showing.eventinstanceid}-showing-clone-button`}
              className='flex justify-center items-center bg-white hover:bg-gray-50 disabled:bg-gray-500 text-white rounded-xl p-2 font-bold shadow-xl'
              disabled={editing || showPopUp}
              onClick={() => {
                setEditing((editing) => !editing);
                return submitClone(cloneShowing(showing));
              }}
          >
            <CloneIcon className={`h-6 w-6 ${!editing?'fill-blue-500':''}`}/>
          </FormButton>
          <FormDeleteButton
            onDelete={onDelete}
            testID={`${showing.eventinstanceid}-showing-delete-button`}
            className='flex justify-center items-center bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white rounded-xl p-2 font-bold shadow-xl'
          >
            <TrashCanIcon className='h-6 w-6' />
          </FormDeleteButton>
        </div>
      </div>
    </div>
  );
};
