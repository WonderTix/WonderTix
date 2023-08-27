import {Field, useField} from 'formik';
import React, {useState} from 'react';
import {TicketTypeSelect} from './TicketTypeSelect';
import {InputControl} from './InputControl';
import {IconButton} from '@mui/material';
import {useEvent} from './EventProvider';
import {getTicketTypePrice} from './ShowingUtils';

interface TicketTypeTableProps {
  arrayHelpers;
  eventInstanceID: number;
}

export const TicketTypeUpdateTable = (props: TicketTypeTableProps) => {
  const {arrayHelpers, eventInstanceID} = props;
  const {ticketTypes, showPopUp} = useEvent();
  const [field] = useField('instanceTicketTypes');
  const [availableTypes, setAvailableTypes] = useState(
    ticketTypes
      .filter(
        (type) =>
          !field.value.find((value) => value.typeID == type.id) && type.id != 1,
      )
      .map((value) => value.id),
  );

  return (
    <div
      className={
        'overflow-y-auto overflow-x-auto col-span-12 min-[1350px]:col-span-7 ' +
        'shadow-xl border-4 border-gray-300 mx-auto rounded-xl bg-white w-[100%] min-h-[100px]'
      }
    >
      <table className={'table table-fixed text-sm min-w-[100%]'}>
        <thead
          className={`text-left text-zinc-800 whitespace-nowrap bg-gray-300 ${
            showPopUp ? '' : 'sticky z-50'
          } top-0`}
        >
          <tr className={'rounded-xl'}>
            <th className={'px-2 py-1 border-b border-r border-white'}>
              Admission Type
            </th>
            <th className={'px-2 py-1 border-b border-l border-r border-white'}>
              Ticket Price
            </th>
            <th className={'px-2 py-1 border-b border-l border-r border-white'}>
              Concession Price
            </th>
            <th className={'px-2 py-1 border-b border-l border-r border-white'}>
              Quantity
            </th>
            <th className={'px-2 py-1 border-b border-l border-white'}>
              {availableTypes ? (
                <IconButton
                  size={'small'}
                  aria-label={'add ticket type'}
                  onClick={async () => {
                    arrayHelpers.insert(0, {
                      typeID: availableTypes[0],
                      typeQuantity: 0,
                    });
                    setAvailableTypes(
                      availableTypes.slice(1, availableTypes.length),
                    );
                  }}
                  disabled={availableTypes.length === 0}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={`w-5 h-5 ${
                      availableTypes.length > 0
                        ? 'text-zinc-900'
                        : 'text-gray-300'
                    }`}
                  >
                    <path
                      fillRule='evenodd'
                      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                      clipRule='evenodd'
                    />
                  </svg>
                </IconButton>
              ) : null}
            </th>
          </tr>
        </thead>
        <tbody className={'text-sm whitespace-nowrap text-zinc-800'}>
          {field.value && field.value.length > 0 ? (
            field.value.map((id, index) => (
              <tr key={eventInstanceID + index + 'ticketTypeRow'}>
                <td
                  key={eventInstanceID + index + 'ticket type select'}
                  className={'px-2'}
                >
                  <Field
                    name={`${field.name}[${index}].typeID`}
                    type={'select'}
                    component={TicketTypeSelect}
                    availableTypes={availableTypes}
                    setAvailableTypes={setAvailableTypes}
                    id={eventInstanceID}
                    index={index}
                  />
                </td>
                <td
                  key={eventInstanceID + index + 'ticket type price'}
                  className={'px-2'}
                >
                  {getTicketTypePrice(
                    field.value[index].typeID,
                    'price',
                    ticketTypes,
                  )}
                </td>
                <td
                  key={eventInstanceID + index + 'ticket concession price'}
                  className={'px-2'}
                >
                  {getTicketTypePrice(
                    field.value[index].typeID,
                    'concessions',
                    ticketTypes,
                  )}
                </td>
                <td
                  key={eventInstanceID + index + 'ticket type quantity'}
                  className={'px-2'}
                >
                  <Field
                    name={`${field.name}[${index}].typeQuantity`}
                    type={'number'}
                    component={InputControl}
                    hidden={true}
                    label={'Ticket Quantity'}
                    id={eventInstanceID}
                    className={{
                      controlClass: 'px-2',
                      inputClass: 'w-[50px]',
                      labelClass: '',
                    }}
                  />
                </td>
                <td>
                  <IconButton
                    size={'small'}
                    aria-label={'delete ticket type'}
                    onClick={() => {
                      setAvailableTypes([
                        ...availableTypes,
                        field.value[index].typeID,
                      ]);
                      arrayHelpers.remove(index);
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4 text-zinc-900'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                      />
                    </svg>
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className='px-2 text-zinc-800 font-semibold min-[650px]:text-center'
                colSpan={4}
              >
                No Ticket Types Selected For Showing
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
