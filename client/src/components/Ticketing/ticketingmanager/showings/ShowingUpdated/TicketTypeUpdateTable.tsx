import {Field, useField, useFormikContext} from 'formik';
import React, {useState, useEffect} from 'react';
import {TicketTypeSelect} from './TicketTypeSelect';
import {InputControl} from './InputControl';
import {IconButton} from '@mui/material';
import {useEvent} from './EventProvider';
import {getTicketTypePrice} from './ShowingUtils';
import {getNumTickets} from '../../ticketing/ticketingSlice';

interface TicketTypeTableProps {
  arrayHelpers;
  eventInstanceID: number;
}

export const TicketTypeUpdateTable = (props: TicketTypeTableProps) => {
  const {arrayHelpers, eventInstanceID} = props;
  const {ticketTypes, showPopUp} = useEvent();
  const [InstanceTicketTypesField] = useField('instanceTicketTypes');
  const defaultType = InstanceTicketTypesField.value.findIndex(
    (item) => item.tickettypeid_fk === 1,
  );
  const [availableTypes, setAvailableTypes] = useState(
    ticketTypes
      .filter(
        (type) =>
          !InstanceTicketTypesField.value.find(
            (value) => value.tickettypeid_fk === Number(type.id),
          ) && Number(type.id) !== 1,
      )
      .map((value) => Number(value.id)),
  );
  return (
    <div
      className={
        'overflow-y-auto overflow-x-auto col-span-12 min-[1350px]:col-span-7 shadow-xl mx-auto rounded-xl bg-white w-[100%] min-h-[100px]'
      }
    >
      <table className={'table table-fixed text-sm min-w-[100%]'}>
        <thead
          className={`text-left text-zinc-800 whitespace-nowrap bg-gray-300 ${
            showPopUp ? '' : 'sticky'
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
              {availableTypes && (
                <IconButton
                  size={'small'}
                  aria-label={'add ticket type'}
                  onClick={async () => {
                    arrayHelpers.insert(0, {
                      tickettypeid_fk: availableTypes[0],
                      price: getTicketTypePrice(
                        availableTypes[0],
                        'price',
                        ticketTypes,
                      ),
                      concessionprice: getTicketTypePrice(
                        availableTypes[0],
                        'concessions',
                        ticketTypes,
                      ),
                      ticketlimit: 0,
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
                    stroke='white'
                    strokeWidth={1.5}
                    className={`w-[1.5rem] h-[1.5rem] ${
                      availableTypes.length > 0
                        ? 'text-green-500'
                        : 'text-gray-600'
                    }`}
                  >
                    <path
                      fillRule='evenodd'
                      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                      clipRule='evenodd'
                    />
                  </svg>
                </IconButton>
              )}
            </th>
          </tr>
        </thead>
        <tbody className={'text-sm whitespace-nowrap text-zinc-800'}>
          {defaultType >= 0 && (
            <tr className={'bg-gray-200'}>
              <td className={'px-2 border border-white'}>
                {getTicketTypePrice(1, 'description', ticketTypes)}
              </td>
              <td className={'px-2 border border-white'}>
                <Field
                  name={`${InstanceTicketTypesField.name}[${defaultType}].price`}
                  type={'number'}
                  component={InputControl}
                  hidden={true}
                  label={'Ticket Price'}
                  currency={true}
                  id={eventInstanceID}
                  className={{
                    controlClass: '',
                    inputClass: 'w-[75px]',
                    labelClass: '',
                  }}
                />
              </td>
              <td className={'px-2 border border-white'}>
                <Field
                  name={`${InstanceTicketTypesField.name}[${defaultType}].concessionprice`}
                  type={'number'}
                  component={InputControl}
                  hidden={true}
                  label={'Concession Price'}
                  currency={true}
                  id={eventInstanceID}
                  className={{
                    controlClass: '',
                    inputClass: 'w-[75px]',
                    labelClass: '',
                  }}
                />
              </td>
              <td className={'px-2 border border-white'}>
                {InstanceTicketTypesField.value[defaultType].ticketlimit}
              </td>
              <td className={'border border-white'}></td>
            </tr>
          )}
          {InstanceTicketTypesField.value?.length > 0 &&
            InstanceTicketTypesField.value.map((id, index) => {
              if (index === defaultType) return undefined;
              return (
                <tr key={eventInstanceID + index + 'ticketTypeRow'}>
                  <td
                    key={eventInstanceID + index + 'ticket type select'}
                    className={'px-2'}
                  >
                    <Field
                      name={`${InstanceTicketTypesField.name}[${index}].tickettypeid_fk`}
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
                    <Field
                      name={`${InstanceTicketTypesField.name}[${index}].price`}
                      type={'number'}
                      component={InputControl}
                      hidden={true}
                      label={'Ticket Price'}
                      id={eventInstanceID}
                      currency={true}
                      className={{
                        controlClass: '',
                        inputClass: 'w-[75px]',
                        labelClass: '',
                      }}
                    />
                  </td>
                  <td
                    key={eventInstanceID + index + 'ticket concession price'}
                    className={'px-2'}
                  >
                    <Field
                      name={`${InstanceTicketTypesField.name}[${index}].concessionprice`}
                      type={'number'}
                      component={InputControl}
                      hidden={true}
                      label={'Concession Price'}
                      id={eventInstanceID}
                      currency={true}
                      className={{
                        controlClass: '',
                        inputClass: 'w-[75px]',
                        labelClass: '',
                      }}
                    />
                  </td>
                  <td
                    key={eventInstanceID + index + 'ticket type quantity'}
                    className={'px-2'}
                  >
                    <Field
                      name={`${InstanceTicketTypesField.name}[${index}].ticketlimit`}
                      type={'number'}
                      component={InputControl}
                      hidden={true}
                      label={'Ticket Quantity'}
                      id={eventInstanceID}
                      className={{
                        controlClass: '',
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
                          Number(
                            InstanceTicketTypesField.value[index]
                              .tickettypeid_fk,
                          ),
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
                        className='w-4 h-4 text-red-700'
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
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
