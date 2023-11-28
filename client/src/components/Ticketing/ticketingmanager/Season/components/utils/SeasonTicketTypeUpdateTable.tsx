import {Field, useField} from 'formik';
import React, {useState, useEffect} from 'react';
import {IconButton} from '@mui/material';
import {useEvent} from '../../../showings/ShowingUpdated/EventProvider';
import {getTicketTypePrice} from '../../../showings/ShowingUpdated/ShowingUtils';

interface SeasonTicketTypeTableProps {
  arrayHelpers;
  eventInstanceID: number;
}

export const SeasonTicketTypeUpdateTable = (props: SeasonTicketTypeTableProps) => {
  const {arrayHelpers, eventInstanceID} = props;
  const seasonTicketTypes = null;
  const [InstanceTicketTypesField] = useField('instanceTicketTypes');
  const [availableTypes, setAvailableTypes] = useState(
    seasonTicketTypes
      .filter(
        (type) =>
          !InstanceTicketTypesField.value.find((value) => value.typeID === Number(type.id)) && Number(type.id) !== 1,
      )
      .map((value) => Number(value.id)),
  );


  return (
    <div className="overflow-y-auto overflow-x-auto col-span-12 min-[1350px]:col-span-7 shadow-xl mx-auto rounded-xl bg-white w-[100%] min-h-[100px]">
      <table className="table table-fixed text-sm min-w-[100%]">
        <thead className="text-left text-zinc-800 whitespace-nowrap bg-gray-300 sticky top-0">
          <tr className="rounded-xl">
            <th className="px-2 py-1 border-b border-r border-white">Admission Type</th>
            <th className="px-2 py-1 border-b border-l border-r border-white">Ticket Price</th>
            <th className="px-2 py-1 border-b border-l border-r border-white">Concession Price</th>
            <th className="px-2 py-1 border-b border-l border-r border-white">Quantity</th>
            <th className="px-2 py-1 border-b border-l border-white">
            {availableTypes && (
                <IconButton
                  size={'small'}
                  aria-label={'add ticket type'}
                  onClick={async () => {
                    console.log('Before insert, ', availableTypes);
                    arrayHelpers.insert(0, {
                      typeID: availableTypes[0],
                      typePrice: getTicketTypePrice(availableTypes[0], 'price', seasonTicketTypes),
                      typeConcessionPrice: getTicketTypePrice(availableTypes[0], 'concessions', seasonTicketTypes),
                      typeQuantity: 0,
                    });
                    console.log('After insert, ', availableTypes);
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
        <tbody className="text-sm whitespace-nowrap text-zinc-800">
          <tr className="bg-gray-200">
            <td className="px-2 border border-white">
              {/* Ticket type description */}
            </td>
            <td className="px-2 border border-white">
              <input className="w-[75px] bg-gray-100" type="text" value="" />
            </td>
            <td className="px-2 border border-white">
              <input className="w-[75px] bg-gray-100" type="text" value="" />
            </td>
            <td className="px-2 border border-white">
              {/* Tickets value */}
            </td>
            <td className="border border-white"></td>
          </tr>
          {/* Instance ticket types rows */}
        </tbody>
      </table>
    </div>
  );
};
