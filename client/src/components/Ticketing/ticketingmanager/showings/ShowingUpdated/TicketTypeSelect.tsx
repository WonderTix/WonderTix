import React from 'react';
import {useEvent} from './EventProvider';
import {useField, useFormikContext} from 'formik';
import {getTicketTypeKeyValue} from './ShowingUtils';

export const TicketTypeSelect = (props: {
  field;
  index;
  availableTypes;
  setAvailableTypes;
}) => {
  const {field, index, availableTypes, setAvailableTypes} = props;
  const [currentValue] = useField(`instanceTicketTypes[${index}]`);
  const {setFieldValue} = useFormikContext();

  const handleChange = async (event) => {
    const value = +event.target.value;
    const {ticketlimit, ...toAddToAvailableTypes} = currentValue.value;
    await setFieldValue(field.name, value);
    await setFieldValue(
      `instanceTicketTypes[${index}].price`,
      getTicketTypeKeyValue(+value, 'price', availableTypes),
    );
    await setFieldValue(
      `instanceTicketTypes[${index}].concessionprice`,
      getTicketTypeKeyValue(+value, 'concessionprice', availableTypes),
    );
    await setFieldValue(
        `instanceTicketTypes[${index}].description`,
        getTicketTypeKeyValue(+value, 'description', availableTypes),
    );
    setAvailableTypes([
      ...availableTypes.filter((type) => type.tickettypeid_fk !== value),
      toAddToAvailableTypes,
    ]);
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
          {currentValue.value.description}
        </option>
        {availableTypes &&
          availableTypes.map((ticketType) => (
            <option
              key={ticketType + 'ticket type description'}
              value={Number.parseInt(ticketType.tickettypeid_fk)}
            >
              {ticketType.description}
            </option>
          ))}
      </select>
    </>
  );
};
