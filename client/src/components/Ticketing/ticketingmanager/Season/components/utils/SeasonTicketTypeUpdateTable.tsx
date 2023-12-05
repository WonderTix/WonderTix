import {IconButton, Tooltip} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {SeasonTicketValues, seasonTicketDefaultValues} from './seasonCommon';
import {useFetchToken} from '../../../showings/ShowingUpdated/ShowingUtils';

interface SeasonTicketTypeUpdateTableProps {
  seasonTicketTypeData: SeasonTicketValues[];
  onUpdate: (updatedData: SeasonTicketValues[]) => void;
}
/*
const getTicketTypeKeyValue = (
  id: number,
  key: string,
  ticketTypes: any[],
) => {
  const foundType = ticketTypes?.find((type) => +type.tickettypeid_fk === id);
  if (!foundType) return 0;
  return typeof foundType[key] === 'string'
    ? foundType[key].replace('$', '')
    : foundType[key];
};

const getInstanceTicketType = (id: number, ticketTypes: any[]) => {
  if (!ticketTypes) return {};
  const {description, ...type} = ticketTypes.find(
    (type) => Number(type.tickettypeid_fk) === id,
  );
  return {
    ...type,
  };
};
*/

const getPriceForDescription = (
  description: string,
  key: string,
  availableTicketTypes: any[],
) => {
  const foundType = availableTicketTypes?.find(
    (type) => type.description === description,
  );
  if (!foundType) return 0;
  return typeof foundType[key] === 'string'
    ? foundType[key].replace('$', '')
    : foundType[key];
};

export const SeasonTicketTypeUpdateTable = (props: SeasonTicketTypeUpdateTableProps) => {
  const {seasonTicketTypeData} = props;
  const [currentSeasonTicketTypeData, setCurrentSeasonTicketTypeData] = useState<SeasonTicketValues[]>([...seasonTicketTypeData]);
  const [availableTicketTypes, setAvailableTicketTypes] = useState([]);
  const [selectedDescriptions, setSelectedDescriptions] = useState<string[]>([]);

  const {token} = useFetchToken();

  useEffect(() => {
    if (token) {
      const handleGetAllTicketTypes = async () => {
        try {
          const seasonTicketTypeRes = await fetch(
            process.env.REACT_APP_API_2_URL + `/ticket-type`,
            {
              credentials: 'omit',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            },
          );

          if (seasonTicketTypeRes.ok) {
            const seasonTicketTypes = await seasonTicketTypeRes.json();
            console.log('Ticket Types', seasonTicketTypes);
            setAvailableTicketTypes(seasonTicketTypes);
          } else {
            throw new Error('Failed to get all ticket type description info');
          }
        } catch (error) {
          console.error(error);
        }
      };
      handleGetAllTicketTypes();
    }
  }, [token]);

  useEffect(() => {
    // todo
  }, []);

  useEffect(() => {
    setCurrentSeasonTicketTypeData(seasonTicketTypeData);
    setSelectedDescriptions(seasonTicketTypeData.map((ticket) => ticket.description || ''));
  }, [seasonTicketTypeData]);

  useEffect(() => {
    // console.log('Updated Data Before Route Call:', currentSeasonTicketTypeData);
    props.onUpdate(currentSeasonTicketTypeData);
  }, [currentSeasonTicketTypeData]);

  const handleUpdateTicketTypeData = (newValue, index, field) => {
    setCurrentSeasonTicketTypeData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {...updatedData[index], [field]: newValue};
      return updatedData;
    });
  };

  const handleAddTicketType = () => {
    setCurrentSeasonTicketTypeData((prevData) => [
      ...prevData,
      seasonTicketDefaultValues,
    ]);
    setSelectedDescriptions((prevSelected) => [...prevSelected, '']);
  };

  const handleDeleteTicketType = (index) => {
    setCurrentSeasonTicketTypeData((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });

    setSelectedDescriptions((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected.splice(index, 1);
      return updatedSelected;
    });
  };

  const handleDescriptionChange = (index, newValue) => {
    setSelectedDescriptions((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = newValue;
      return updatedSelected;
    });
  };

  const getPriceForSelectedDescription = (description, priceType) => {
    return getPriceForDescription(
      description,
      priceType,
      availableTicketTypes,
    );
  };

  console.log('Selected Descriptions:', selectedDescriptions);

  return (
    <div className={'bg-gray-300 grid grid-cols-12 rounded-xl p-1 h-[100%]'}>
      <div className={'overflow-y-auto overflow-x-auto col-span-12 shadow-xl border border-white rounded-xl bg-white w-[100%] min-h-[100px]'}>
        <table className='table table-fixed text-sm min-w-[100%]'>
          <thead className='text-left text-zinc-800 whitespace-nowrap bg-gray-300 sticky top-0'>
            <tr className='rounded-xl'>
              <th className='px-2 py-1 border-b border-r border-white'>Admission Type</th>
              <th className='px-2 py-1 border-b border-l border-r border-white'>Ticket Price</th>
              <th className='px-2 py-1 border-b border-l border-r border-white'>Concession Price</th>
              <th className='px-2 py-1 border-b border-l border-white'>
                <Tooltip title="Add Ticket Type" arrow>
                  <IconButton
                    size={'small'}
                    aria-label={'add ticket type'}
                    onClick={handleAddTicketType}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      stroke='white'
                      strokeWidth={1.5}
                      className={'w-[1.5rem] h-[1.5] text-green-500'}
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody className='text-sm whitespace-nowrap text-zinc-800'>
            {currentSeasonTicketTypeData && currentSeasonTicketTypeData.length > 0 ? (
                currentSeasonTicketTypeData.map((id, index) =>(
                <tr key={index} className='bg-gray-200'>
                  <td className={'px-2'}>
                    <select
                      value={selectedDescriptions[index]}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                    >
                      <option value="">Select Ticket Type</option>
                      {availableTicketTypes
                      .filter((ticketType) => !selectedDescriptions.includes(ticketType.description))
                      .map((ticketType) => (
                        <option key={ticketType.tickettypeid} value={ticketType.description}>
                          {ticketType.description}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className='px-2 border border-white'><span className='pr-1'>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='number'
                      value={getPriceForSelectedDescription(
                        selectedDescriptions[index],
                        'price',
                      )}
                      onChange={(e) =>
                        handleUpdateTicketTypeData(
                          Number(e.target.value),
                          index,
                          'price',
                        )
                      }
                    />
                  </td>
                  <td className='px-2 border border-white'><span className='pr-1'>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='number'
                      value={getPriceForSelectedDescription(
                        selectedDescriptions[index],
                        'concession',
                      )}
                      onChange={(e) =>
                        handleUpdateTicketTypeData(
                          Number(e.target.value),
                          index,
                          'concessionprice',
                        )
                      }
                    />
                  </td>
                  <td className='px-2 border border-white'>
                    <Tooltip title='Delete Ticket Type'>
                      <IconButton
                        size={'small'}
                        aria-label={'delete ticket type'}
                        onClick={() => handleDeleteTicketType(index)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-4 h-4 text-red-700'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
            ))
            ) : (
              <tr>
                <td></td>
                <td className={'px-2'}><span>No Current Ticket Types</span></td>
                <td></td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
