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
  const {field, index, availableTypes, setAvailableTypes} = props;
  const {ticketTypes} = useEvent();
  const {setFieldValue} = useFormikContext();

  const handleChange = async (event) => {
    const value = event.target.value;
    setAvailableTypes([
      ...availableTypes.filter((type) => type !== +value),
      field.value,
    ]);
    await setFieldValue(field.name, +value);
    await setFieldValue(`instanceTicketTypes[${index}].seasontickettypepricedefaultid_fk`, getTicketTypeKeyValue(+value, 'seasontickettypepricedefaultid_fk', ticketTypes));
    await setFieldValue(`instanceTicketTypes[${index}].price`, getTicketTypeKeyValue(+value, 'price', ticketTypes));
    await setFieldValue(`instanceTicketTypes[${index}].concessionprice`, getTicketTypeKeyValue(+value, 'concessionprice', ticketTypes));
  };
  return (
    <>
      <label hidden htmlFor={`${field.name} ${index} select`}>
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
          availableTypes.map((ticketType) => (
            <option
              key={ticketType+ 'ticket type description'}
              value={Number.parseInt(ticketType)}
            >
              {getTicketTypeKeyValue(ticketType, 'description', ticketTypes)}
            </option>
          ))}
      </select>
    </>
  );
};
