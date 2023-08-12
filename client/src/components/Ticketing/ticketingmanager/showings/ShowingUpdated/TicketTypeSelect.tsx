import React from 'react';

export const TicketTypeSelect = (props: { field, ticketTypes, id, index }) => {
  const {ticketTypes, field, id, index} = props;
  return (
    <select
      name={field.name}
      onChange={field.onChange}
      value={field.value}
    >
      {
        ticketTypes ?
          ticketTypes
              .map((ticketType: any) => (
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
  );
};
