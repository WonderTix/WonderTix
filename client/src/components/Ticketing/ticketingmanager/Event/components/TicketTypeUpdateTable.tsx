import {Field, useField} from 'formik';
import React, {useState} from 'react';
import {TicketTypeSelect} from './TicketTypeSelect';
import {InputControl} from './InputControl';
import {IconButton} from '@mui/material';
import {useEvent} from './EventProvider';
import {
  getInstanceTicketType,
  TrashCanIcon,
} from './ShowingUtils';

interface TicketTypeTableProps {
  arrayHelpers;
  eventInstanceID: number;
}
export const TicketTypeUpdateTable = (props: TicketTypeTableProps) => {
  const {arrayHelpers, eventInstanceID} = props;
  const {ticketTypes, showPopUp} = useEvent();
  const [InstanceTicketTypesField] = useField('instanceTicketTypes');
  const [defaulttickettype] = useField('defaulttickettype');
  const defaultTypeIndex = InstanceTicketTypesField.value.findIndex(
    (item) => item.tickettypeid_fk === defaulttickettype.value,
  );
  const [availableTypes, setAvailableTypes] = useState(
    ticketTypes
      .filter(
        (type) =>
          !InstanceTicketTypesField.value.some(
            (res) => res.tickettypeid_fk === +type.tickettypeid_fk,
          ),
      ),
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
                    arrayHelpers.insert(
                      0,
                      getInstanceTicketType(availableTypes[0]),
                    );
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
          {defaultTypeIndex > -1 && (
            <tr className={'bg-gray-200'}>
              <td className={'px-2 border border-white'}>
                {InstanceTicketTypesField.value[defaultTypeIndex].description}
              </td>
              <td className={'px-2 border border-white'}>
                <Field
                  name={`${InstanceTicketTypesField.name}[${defaultTypeIndex}].price`}
                  type={'number'}
                  component={InputControl}
                  hidden={true}
                  label={'Ticket Price'}
                  currency={true}
                  className={{
                    controlClass: '',
                    inputClass: 'w-[75px] bg-gray-200',
                    labelClass: '',
                  }}
                />
              </td>
              <td className={'px-2 border border-white'}>
                <Field
                  name={`${InstanceTicketTypesField.name}[${defaultTypeIndex}].concessionprice`}
                  type={'number'}
                  component={InputControl}
                  hidden={true}
                  label={'Concession Price'}
                  currency={true}
                  className={{
                    controlClass: '',
                    inputClass: 'w-[75px] bg-gray-200',
                    labelClass: '',
                  }}
                />
              </td>
              <td className={'px-2 border border-white'}>
                {InstanceTicketTypesField.value[defaultTypeIndex].ticketlimit}
              </td>
              <td className={'border border-white'}></td>
            </tr>
          )}
          {InstanceTicketTypesField.value?.length > 0 &&
            InstanceTicketTypesField.value.map((type, index) => {
              if (index === defaultTypeIndex) return undefined;
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
                      disabled={
                        InstanceTicketTypesField.value[index].tickettypeid_fk ==
                        0
                      }
                      label={'Ticket Price'}
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
                        const {ticketlimit, ...current}= InstanceTicketTypesField.value[index];
                        setAvailableTypes([
                          ...availableTypes,
                            current,
                        ]);
                        arrayHelpers.remove(index);
                      }}
                    >
                      <TrashCanIcon
                          className='w-4 h-4 text-red-700'
                      />
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
