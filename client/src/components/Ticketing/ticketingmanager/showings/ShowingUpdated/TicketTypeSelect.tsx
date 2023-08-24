import React from 'react';
import {useEvent} from './EventProvider';

export const TicketTypeSelect = (props: { field, id, index }) => {
  const {field, id, index} = props;
  const {ticketTypes} = useEvent();

  return (
    <>
      <label
        hidden
        htmlFor={`${field.name} ${id} ${index} select`}
      >
      Ticket Type Select number {index}
      </label>
      <select
        name={field.name}
        onChange={field.onChange}
        value={field.value}
        className={'w-full'}
      >
        {
          ticketTypes ?
            ticketTypes
              // .filter((ticketType) =>
              //   !currentTypes
              //       .value
              //       .slice(index, 1)
              //       .find((type) => type.typeID == ticketType.id))
              .map((ticketType: any) =>(
                <option
                  key={id + index + ticketType.id +
                    'ticket type description'}
                  value={Number.parseInt(ticketType.id)}
                >
                  {ticketType.description}
                </option>
              )) :
            null
        }
      </select>
    </>
  );
};
