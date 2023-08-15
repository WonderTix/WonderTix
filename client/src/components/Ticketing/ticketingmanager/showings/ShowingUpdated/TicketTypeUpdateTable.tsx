import {Field, useField} from 'formik';
import React from 'react';
import {TicketTypeSelect} from './TicketTypeSelect';
import {InputControl} from './InputControl';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useEvent} from './EventProvider';
import {getTicketTypePrice} from './ShowingUtils';

interface TicketTypeTableProps {
  arrayHelpers;
  eventInstanceID: number;
}

export const TicketTypeUpdateTable = (props: TicketTypeTableProps) => {
  const {arrayHelpers, eventInstanceID} = props;
  const {ticketTypes} = useEvent();
  const [field] = useField('instanceTicketTypes');

  return (
    <div className={'max-h-[100%] flex flex-col'}>
      <table className={'table-fixed'}>
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
            <th className={'font-bold p-2 border-b text-left'}>
            Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {field.value ?
          field.value.map((id, index) => (
            <tr key={eventInstanceID + index +
              'ticketTypeRow'}>
              <td
                key={eventInstanceID + index + 'ticket type select'}
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
              >
                {
                  getTicketTypePrice(field.value[index].typeID,
                      'price', ticketTypes)
                }
              </td>
              <td
                key={eventInstanceID + index +
                  'ticket concession price'}
              >
                {
                  getTicketTypePrice(field.value[index].typeID,
                      'concessions', ticketTypes)
                }
              </td>
              <td
                key={eventInstanceID + index +
                  'ticket type quantity'}
              >
                <Field
                  name={`${field.name}[${index}].typeQuantity`}
                  type={'number'}
                  component={InputControl}
                  hidden={true}
                  label={'Ticket Quantity'}
                  id={eventInstanceID}
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
      <div>
        <Button
          size={'small'}
          variant={'contained'}
          onClick={() => {
            arrayHelpers.push({typeID: 0, typeQuantity: 0});
          }}
          color={'success'}
          startIcon={<AddCircleIcon fontSize={'small'}/>}
        >
        Add Type
        </Button>
      </div>
    </div>);
};
