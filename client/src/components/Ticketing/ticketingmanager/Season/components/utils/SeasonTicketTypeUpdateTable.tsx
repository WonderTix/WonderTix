import {IconButton, Tooltip} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {SeasonTicketValues} from './seasonCommon';
import {CirclePlusIcon, TrashCanIcon} from '../../../../Icons';

interface SeasonTicketTypeUpdateTableProps {
  seasonTicketTypeData: SeasonTicketValues[];
  onUpdate: (updatedData: SeasonTicketValues[]) => void;
}

export const SeasonTicketTypeUpdateTable = (props: SeasonTicketTypeUpdateTableProps) => {
  const {seasonTicketTypeData, onUpdate} = props;

  const [currentSeasonTicketTypeData, setCurrentSeasonTicketTypeData] = useState<SeasonTicketValues[]>(seasonTicketTypeData);
  const [availableTicketTypes, setAvailableTicketTypes] = useState([]);
  const [ticketTypeList, setTicketTypeList] = useState([]);


  useEffect(() => {
    const handleGetAllTicketTypes = async () => {
      try {
        const seasonTicketTypeRes = await fetch(
          process.env.REACT_APP_API_2_URL + `/ticket-type/valid`,
          {
            credentials: 'omit',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (seasonTicketTypeRes.ok) {
          const seasonTicketTypes = await seasonTicketTypeRes.json();
          if (seasonTicketTypeData && seasonTicketTypeData.length > 0) {
            const availableTypesWithoutSeasonTypes = removeSeasonTypesFromAvailableTypes(seasonTicketTypeData, seasonTicketTypes);
            setAvailableTicketTypes(availableTypesWithoutSeasonTypes);
          } else {
            setAvailableTicketTypes(seasonTicketTypes);
          }
          setTicketTypeList([...seasonTicketTypes]);
        } else {
          throw new Error('Failed to get all ticket type description info');
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetAllTicketTypes();
  }, []);

  useEffect(() => {
    setCurrentSeasonTicketTypeData(seasonTicketTypeData);
    if (availableTicketTypes.length > 0) {
      const availableTypesWithoutSeasonTypes = removeSeasonTypesFromAvailableTypes(seasonTicketTypeData, availableTicketTypes);
      setAvailableTicketTypes(availableTypesWithoutSeasonTypes);
    }
  }, [seasonTicketTypeData]);

  useEffect(() => {
    onUpdate(currentSeasonTicketTypeData);
  }, [currentSeasonTicketTypeData]);

  const removeSeasonTypesFromAvailableTypes = (seasonTicketTypes: SeasonTicketValues[], availableTypes) => {
    const filteredAvailableTicketTypes = availableTypes.filter((availType) => {
      return seasonTicketTypes.every((seasonTicketType) => seasonTicketType.tickettypeid_fk !== availType.tickettypeid);
    });
    return filteredAvailableTicketTypes;
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

const updateAvailableTicketTypes = (targetId, prevId, currentList, allTicketTypes) => {
  const filteredList = currentList.filter((type) => targetId !== type.tickettypeid);
  const typeToAdd = allTicketTypes.find((type) => prevId === type.tickettypeid);

  return [...filteredList, typeToAdd];
};

const updateCurrentSeasonTicketTypeData = (targetId, prevId, currentData, allTicketTypes) => {
  const newData = [...currentData];
  const index = newData.findIndex((type) => prevId === type.tickettypeid_fk);
  const newValues = allTicketTypes.find((type) => targetId === type.tickettypeid);

  newData[index] = {
    tickettypeid_fk: newValues.tickettypeid,
    description: newValues.description,
    price: newValues.price,
    concessionprice: newValues.concessions,
  };

  return newData;
};

  const handleTicketTypeChange = (targetId, prevId) => {
    setAvailableTicketTypes((prevData) =>
      updateAvailableTicketTypes(targetId, prevId, prevData, ticketTypeList),
    );

    setCurrentSeasonTicketTypeData((prevData) =>
      updateCurrentSeasonTicketTypeData(targetId, prevId, prevData, ticketTypeList),
    );
  };

  return (
    <div className='bg-gray-300 rounded-xl p-1 h-[100%]'>
      <div className='overflow-y-auto overflow-x-auto shadow-xl border-l border-r border-t border-white rounded-xl bg-white w-[100%] h-[100%] min-h-[101px]'>
        <table className='table table-fixed text-sm min-w-[100%]'>
          <thead className='text-left text-zinc-800 whitespace-nowrap bg-gray-300 sticky top-0'>
            <tr className='rounded-xl'>
              <th className='px-2 py-1 border-b border-r border-white'>
                Admission Type
              </th>
              <th className='px-2 py-1 border-b border-l border-r border-white'>
                Ticket Price
              </th>
              <th className='px-2 py-1 border-b border-l border-r border-white'>
                Concession Price
              </th>
              <th className='px-2 py-1 border-b border-l border-white'>
                <Tooltip
                  title='Add Ticket Type Price Default'
                  placement='top'
                  arrow
                >
                  <span>
                    <IconButton
                      size='small'
                      aria-label='add ticket type'
                      onClick={handleAddTicketType}
                      disabled={availableTicketTypes.length === 0}
                    >
                      <CirclePlusIcon className = {`w-[1.5rem] h-[1.5rem] ${
                        availableTicketTypes.length > 0
                          ? 'text-green-500'
                          : 'text-gray-600'
                        }`}
                      />
                    </IconButton>
                  </span>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody className='text-sm whitespace-nowrap text-zinc-800'>
            {currentSeasonTicketTypeData && currentSeasonTicketTypeData.length > 0 ? (
              currentSeasonTicketTypeData.map((type) => (
                <tr key={type.tickettypeid_fk} className='bg-gray-200'>
                  <td className='px-2'>
                    <select
                      value={type.tickettypeid_fk}
                      onChange={(e) =>
                        handleTicketTypeChange(
                          Number(e.target.value),
                          type.tickettypeid_fk,
                        )
                      }
                      className='w-full'
                    >
                      <option value='' disabled>
                        Select Ticket Type
                      </option>
                      <option value={type.tickettypeid_fk}>
                        {type.description}
                      </option>
                      {availableTicketTypes.map((ticketType) => (
                        <option
                          key={ticketType.tickettypeid}
                          value={ticketType.tickettypeid}
                        >
                          {ticketType.description}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className='px-2 border border-white'>
                    <span className='pr-1'>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='number'
                      value={type.price}
                      disabled={type.description === 'Pay What You Can'}
                      onChange={(e) =>
                        handleUpdateTicketTypeData(
                          e.target.value,
                          type.tickettypeid_fk,
                          'price',
                        )
                      }
                    />
                  </td>
                  <td className='px-2 border border-white'>
                    <span className='pr-1'>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='number'
                      value={type.concessionprice}
                      onChange={(e) =>
                        handleUpdateTicketTypeData(
                          e.target.value,
                          type.tickettypeid_fk,
                          'concessionprice',
                        )
                      }
                    />
                  </td>
                  <td className='px-2 border border-white'>
                    <Tooltip title='Delete Ticket Type' placement='top'>
                      <IconButton
                        size='small'
                        aria-label='delete ticket type'
                        onClick={() =>
                          handleDeleteTicketType(type.tickettypeid_fk)
                        }
                      >
                        <TrashCanIcon className='h-4 w-4 text-red-700' />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className='px-2 text-center'>
                  No Current Ticket Types
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
