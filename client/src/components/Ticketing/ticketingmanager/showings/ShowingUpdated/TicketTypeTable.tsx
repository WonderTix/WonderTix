import {Field, useField} from 'formik';
import React, {useEffect, useState} from 'react';
import {TicketTypeSelect} from './TicketTypeSelect';
import {InputControl} from './InputControl';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {green} from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {getTicketTypePrice} from './EventInstanceForm';

interface TicketTypeTableProps {
  arrayHelpers;
  eventInstanceID: number;
  ticketTypes: any[];
}

export const TicketTypeTable = (props: TicketTypeTableProps) => {
  const {ticketTypes, arrayHelpers, eventInstanceID} = props;
  const [field] = useField('instanceTicketTypes');

  return (
    <>
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
                  ticketTypes={ticketTypes}
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
      <IconButton
        size={'small'}
        aria-label={'add ticket type'}
        onClick={() => {
          arrayHelpers.push({typeID: 0, typeQuantity: 0});
        }}
        style={{color: green[500]}}
      >
        <AddCircleIcon fontSize={'small'}/>
      </IconButton>
    </>);
};
