import {Field, useField} from 'formik';
import React, {useState} from 'react';
import {TicketTypeSelect} from './TicketTypeSelect';
import {InputControl} from './InputControl';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEvent} from './EventProvider';
import {getTicketTypePrice} from './ShowingUtils';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
              {availableTypes && availableTypes.length > 0 ? (
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
                >
                  <AddCircleIcon sx={{color: 'black'}} fontSize={'small'} />
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
                    onClick={async () => {
                      setAvailableTypes([
                        ...availableTypes,
                        field.value[index].typeID,
                      ]);
                      arrayHelpers.remove(index);
                    }}
                  >
                    <DeleteIcon fontSize={'small'} />
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
