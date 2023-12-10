import {IconButton, Tooltip} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {SeasonTicketValues, seasonTicketDefaultValues} from './seasonCommon';
import {useFetchToken} from '../../../Event/components/ShowingUtils';

interface SeasonTicketTypeUpdateTableProps {
  seasonTicketTypeData: SeasonTicketValues[];
  onUpdate: (updatedData: SeasonTicketValues[]) => void;
}

export const SeasonTicketTypeUpdateTable = (props: SeasonTicketTypeUpdateTableProps) => {
  const {seasonTicketTypeData} = props;
  const [currentSeasonTicketTypeData, setCurrentSeasonTicketTypeData] = useState<SeasonTicketValues[]>([...seasonTicketTypeData]);
  const [availableTicketTypes, setAvailableTicketTypes] = useState([]);
  const [ticketTypeList, setTicketTypeList] = useState([]);

  const {token} = useFetchToken();

  useEffect(() => {
    if (token) {
      const handleGetAllTicketTypes = async () => {
        try {
          const seasonTicketTypeRes = await fetch(
            process.env.REACT_APP_API_2_URL + `/ticket-type/valid`,
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
            console.log('Ticket Types (seasonTicketTypes):', seasonTicketTypes);
            setAvailableTicketTypes(seasonTicketTypes);
            if (seasonTicketTypeData && seasonTicketTypeData.length > 0 && seasonTicketTypes.length > 0) {
              removeFromAvailable(seasonTicketTypeData, seasonTicketTypes);
            }
            setTicketTypeList([...seasonTicketTypes]);

            console.log('(UseEffect) After IF Avail TT Data:', availableTicketTypes);
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
    setCurrentSeasonTicketTypeData(seasonTicketTypeData);
    if (availableTicketTypes.length > 0) {
      removeFromAvailable(seasonTicketTypeData, availableTicketTypes);
    }
  }, [seasonTicketTypeData]);

  useEffect(() => {
    props.onUpdate(currentSeasonTicketTypeData);
  }, [currentSeasonTicketTypeData]);

  const removeFromAvailable = (ticketTypeData: SeasonTicketValues[], availableTypes) => {
    const filteredAvailableTicketTypes = availableTypes.filter((ticketType) => {
      return ticketTypeData.every((seasonTicketType) => seasonTicketType.tickettypeid_fk != ticketType.tickettypeid);
    });
    console.log('(removeFromAvailable) filteredAvail:', filteredAvailableTicketTypes);
    console.log('TT Data:', ticketTypeData);
    console.log('Avail T Data:', availableTypes);
    setAvailableTicketTypes(filteredAvailableTicketTypes);
  };

  const handleUpdateTicketTypeData = (newValue, tickettypeid, field) => {
    const toUpdateHelperCopy = [...currentSeasonTicketTypeData];
    const ticketIndex = toUpdateHelperCopy.findIndex((ticketType) => tickettypeid === ticketType.tickettypeid_fk);
    toUpdateHelperCopy[ticketIndex][field] = newValue;
    setCurrentSeasonTicketTypeData(toUpdateHelperCopy);
  };

  const handleAddTicketType = () => {
    const ticketTypeToAdd = availableTicketTypes.shift();
    const seasonTicketPageStructure: SeasonTicketValues = {
      tickettypeid_fk: ticketTypeToAdd.tickettypeid,
      description: ticketTypeToAdd.description,
      price: ticketTypeToAdd.price,
      concessionprice: ticketTypeToAdd.concessions,
    };
    setCurrentSeasonTicketTypeData((prevData) => [
      ...prevData,
      seasonTicketPageStructure,
    ]);
  };

  const handleDeleteTicketType = (tickettypeid) => {
    setCurrentSeasonTicketTypeData((prevData) => {
      const filteredList = prevData.filter((tickettype) => tickettype.tickettypeid_fk != tickettypeid);
      return filteredList;
    });

    const ticketTypeToAdd = ticketTypeList.find((tickettype) => tickettype.tickettypeid === tickettypeid);
    setAvailableTicketTypes((prevData) => [
      ...prevData,
      ticketTypeToAdd,
    ]);
  };
/*
*/
  const handleTicketTypeChange = (targetTicketTypeId, prevTicketTypeId) => {
    const filteredList = availableTicketTypes.filter((ticketType) => targetTicketTypeId !== ticketType.tickettypeid);
    setAvailableTicketTypes(filteredList);

    const ticketTypeToAdd = ticketTypeList.find((ticketType) => prevTicketTypeId === ticketType.tickettypeid);

    setAvailableTicketTypes((prevData) => [
      ...prevData,
      ticketTypeToAdd,
    ]);

    const toUpdateHelperCopy = [...currentSeasonTicketTypeData];
    const prevIndex = toUpdateHelperCopy.findIndex((ticketType) => prevTicketTypeId === ticketType.tickettypeid_fk);
    const newValues = ticketTypeList.find((ticketType) => targetTicketTypeId === ticketType.tickettypeid);

    toUpdateHelperCopy[prevIndex] = {
      tickettypeid_fk: newValues.tickettypeid,
      description: newValues.description,
      price: newValues.price,
      concessionprice: newValues.concessions,
    };

    setCurrentSeasonTicketTypeData(toUpdateHelperCopy);
  };

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
                <Tooltip title="Add Ticket Type Price Default" arrow>
                  <IconButton
                    size={'small'}
                    aria-label={'add ticket type'}
                    onClick={handleAddTicketType}
                    disabled={availableTicketTypes.length === 0}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      stroke='white'
                      strokeWidth={1.5}
                    className={`w-[1.5rem] h-[1.5rem] ${
                      availableTicketTypes.length > 0
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
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody className='text-sm whitespace-nowrap text-zinc-800'>
            {currentSeasonTicketTypeData && currentSeasonTicketTypeData.length > 0 ? (
                currentSeasonTicketTypeData.map((type) =>(
                <tr key={type.tickettypeid_fk} className='bg-gray-200'>
                  <td className={'px-2'}>
                    <select
                      value={type.tickettypeid_fk}
                      onChange={(e) =>
                        handleTicketTypeChange(Number(e.target.value), type.tickettypeid_fk)
                      }
                      className='w-full'
                    >
                      <option value='' disabled>Select Ticket Type</option>
                      <option value={type.tickettypeid_fk}>{type.description}</option>
                      {availableTicketTypes
                      .map((ticketType) => (
                        <option key={ticketType.tickettypeid} value={ticketType.tickettypeid}>
                          {ticketType.description}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className='px-2 border border-white'><span className='pr-1'>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='number'
                      value={type.price}
                      disabled={type.description === 'Pay What You Can'}
                      onChange={(e) =>
                        handleUpdateTicketTypeData(
                          Number(e.target.value),
                          type.tickettypeid_fk,
                          'price',
                        )
                      }
                    />
                  </td>
                  <td className='px-2 border border-white'><span className='pr-1'>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='number'
                      value={type.concessionprice}
                      onChange={(e) =>
                        handleUpdateTicketTypeData(
                          Number(e.target.value),
                          type.tickettypeid_fk,
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
                        onClick={() => handleDeleteTicketType(type.tickettypeid_fk)}
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
                <td colSpan={4} className={'px-2 text-center'}>No Current Ticket Types</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
