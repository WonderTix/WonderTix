/* eslint-disable max-len*/
import {Field, useField} from 'formik';
import React from 'react';
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
  const {ticketTypes} = useEvent();
  const [field] = useField('instanceTicketTypes');

  return (
    <div className={'overflow-y-auto overflow-x-auto col-span-12 min-[1350px]:col-span-7 shadow-xl border border-white mx-auto rounded-xl bg-white w-[100%]'}>
      <table className={'table table-fixed text-sm min-w-[100%]'}>
        {/* eslint-disable-next-line max-len */}
        <thead className={'text-left text-zinc-800 whitespace-nowrap bg-blue-200 sticky top-0 '}>
          <tr>
            <th className={'px-2 py-1 border border-white'}>Admission Type</th>
            <th className={'px-2 py-1 border border-white'}>Ticket Price</th>
            <th className={'px-2 py-1 border border-white'}>Concession Price</th>
            <th className={'px-2 py-1 border border-white'}>Quantity</th>
            <th className={'px-2 py-1 border border-white'}>
              <IconButton
                size={'small'}
                aria-label={'delete'}
                onClick={() => arrayHelpers.insert(0, {typeID: 0, typeQuantity: 0})}
              >
                <AddCircleIcon sx={{color: 'white'}} fontSize={'small'}/>
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody className={'text-sm whitespace-nowrap text-zinc-800'}>
          {field.value ?
          field.value.map((id, index) => (
            <tr key={eventInstanceID + index +
              'ticketTypeRow'}>
              <td
                key={eventInstanceID + index + 'ticket type select'}
                className={'px-2'}
              >
                <Field
                  name={`${field.name}[${index}].typeID`}
                  type={'select'}
                  component={TicketTypeSelect}
                  id={eventInstanceID}
                  index={index}
                />
              </td>
              <td
                key={eventInstanceID + index + 'ticket type price'}
                className={'px-2'}
              >
                {
                  getTicketTypePrice(field.value[index].typeID,
                      'price', ticketTypes)
                }
              </td>
              <td
                key={eventInstanceID + index +
                  'ticket concession price'}
                className={'px-2'}
              >
                {
                  getTicketTypePrice(field.value[index].typeID,
                      'concessions', ticketTypes)
                }
              </td>
              <td
                key={eventInstanceID + index +
                  'ticket type quantity'}
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
                  aria-label={'delete'}
                  onClick={() => arrayHelpers.remove(index)}
                >
                  <DeleteIcon fontSize={'small'}/>
                </IconButton>
              </td>
            </tr>
          )) :
          null
          }
        </tbody>
      </table>
    </div>
  );
};
