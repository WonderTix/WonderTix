import React from 'react';
import {useEvent} from './EventProvider';
import {useFormikContext} from 'formik';
import {getTicketTypeKeyValue} from './ShowingUtils';

export const TicketTypeSelect = (props: {
  field;
  id;
  index;
  availableTypes;
  setAvailableTypes;
}) => {
  const {field, id, index, availableTypes, setAvailableTypes} = props;
  const {ticketTypes} = useEvent();
  const {setFieldValue} = useFormikContext();

  const handleChange = async (event) => {
    const value = Number(event.target.value);
    setAvailableTypes([
      ...availableTypes.filter((type) => type !== value),
      Number(field.value),
    ]);
    await setFieldValue(field.name, value);
  };
  return (
    <>
      <label hidden htmlFor={`${field.name} ${id} ${index} select`}>
        Ticket Type Select number {index}
      </label>
      <select
        name={field.name}
        onChange={handleChange}
        value={field.value}
        className={'w-full'}
      >
        <option value={Number.parseInt(field.value)}>
          {getTicketTypeKeyValue(Number(field.value), 'description', ticketTypes)}
        </option>
        {availableTypes &&
          availableTypes.map((ticketTypeID: any) => (
            <option
              key={id + index + ticketTypeID + 'ticket type description'}
              value={Number.parseInt(ticketTypeID)}
            >
              {getTicketTypeKeyValue(
                Number(ticketTypeID),
                'description',
                ticketTypes,
              )}
            </option>
          ))}
      </select>
    </>
  );
};
