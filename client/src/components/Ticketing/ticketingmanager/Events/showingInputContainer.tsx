/* eslint-disable max-len */
import React, { useEffect } from "react";
import { useState } from "react";
import { Showing } from "../../../../interfaces/showing.interface";

/**
 * Used to map props to input container correctly
 *
 * @module
 * @param {initialData} object
 * @param {number} id
 * @param {Function} handleSetShow
 */
/*interface InitialData {
  availableseats?: number;
  defaulttickettype?: number;
  eventdate: string;
  eventid: number;
  index: number;
  ispreview?: boolean;
  purchaseuri?: string;
  salestatus?: boolean;
  totalseats?: number;
  starttime: string;
}*/

export interface MapPropsToShowingInputContainer {
  showingData: Showing;
  id: number;
  index: number,
  handleSetShow: (show: Showing) => void;
  handleDeleteShow: (e: any) => void;
}

/**
 *
 * @param {MapPropsToShowingInputContainer} {initialData, id, handleSetShow}
 * @returns {ReactElement}
 */
// eslint-disable-next-line react/prop-types

const toDateStringFormat = (date) => {
  console.log(date);
  if (date === undefined || date === "") return null;
  const dateString = String(date);
  if (dateString.split("-").length === 3) {
    const [year, month, day] = dateString.split("-").map(Number);
    const Dateobject = new Date(year, month - 1, day);
    return Dateobject.getTime();
  }
  return date;
};

const toTimeStringFormat = (time) => {
  if (time === undefined || time === "") return "";
  const timeString = String(time);
  if (timeString.split(/[+-]/).length === 1) return timeString;
  return timeString.split(/[+-]/)[0];
};

const ShowingInputContainer = ({
  showingData,
  id,
  index,
  handleSetShow,
  handleDeleteShow,
}: MapPropsToShowingInputContainer) => {
  const [starttime, setStartTime] = useState(
    showingData.starttime !== undefined ? showingData.starttime.slice(0, 8) : ""
  );
  const [eventdate, setEventDate] = useState(showingData.eventdate);
  const [ticketTypeId, setTicketTypeId] = useState(showingData.tickettypeids ? showingData.tickettypeids : []); // TODO: Fill this initial data out to properly load
  const [seatsForType, setSeatsForType] = useState(showingData.seatsForType ? showingData.seatsForType : []); // TODO: Fill this initial data out to properly load
  const [availableSeats, setAvailableSeats] = useState(
    showingData.availableseats !== undefined ? showingData.availableseats : 0
  );
  const [totalSeats, setTotalSeats] = useState(
    showingData.totalseats !== undefined ? showingData.totalseats : 0
  );

  const [ticketTypes, setTicketTypes] = useState([]);

  const fetchTicketTypes = async () => {
    const res = await fetch(
      process.env.REACT_APP_ROOT_URL + "/api/tickets/allTypes"
    );
    const data = await res.json();
    setTicketTypes(data.data);
  };

  useEffect(() => {
    fetchTicketTypes();
  }, [showingData]);

  useEffect(() => {
    const showing: Showing = {
      eventdate: eventdate,
      starttime: starttime,
      salestatus: true,
      totalseats: totalSeats,
      tickettypeids: ticketTypeId,
      seatsForType: seatsForType,
      availableseats: availableSeats ? availableSeats : totalSeats,
      eventid: showingData.eventid,
      id: id,
      index: index,
      ispreview: false,
    };
    handleSetShow(showing);
  }, [
    starttime,
    eventdate,
    ticketTypeId,
    totalSeats,
    availableSeats,
    seatsForType,
  ]);

  const handleAddTicketOption = (e) => {
    setSeatsForType((data) => [...data, 0]);
    setTicketTypeId((data) => [...data, 0]);
  };

  const handleSeatChange = (e) => {
    const newSeats = [...seatsForType];
    newSeats[parseInt(e.target.id)] = parseInt(e.target.value);
    setSeatsForType(newSeats);
  };

  const handleRemoveOption = (e) => {
    const newSeats = seatsForType.filter(
      (_, i) => i !== parseInt(e.target.value)
    );
    const newTypes = ticketTypeId.filter(
      (_, i) => i !== parseInt(e.target.value)
    );
    setSeatsForType(newSeats);
    setTicketTypeId(newTypes);
  };

  const handleChangeOption = (e) => {
    const newList = [...ticketTypeId];
    newList[e.target.id] = parseInt(e.target.value);
    setTicketTypeId(newList);
  };

  return (
    <div className="bg-violet-200 rounded-xl p-10 shadow-md mb-4" key={id}>
      <div key={id} className="shadow-xl p-5 rounded-xl mb-9 bg-violet-700">
        <label className="font-semibold text-white mb-7 mt-7  ">
          Show # {id + 1}
        </label>
        <div className="flex flex-col gap-5 mt-5 md:pr-20">
          <h3 className="font-semibold text-white">
            Total Tickets For Showing
          </h3>
          <input
            className="input rounded-lg p-2 bg-violet-100 w-full md:w-7/8"
            value={showingData.totalseats}
            type="number"
            required
            key={id}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
              if (isNaN(parseInt(ev.target.value))) setTotalSeats(0);
              if (parseInt(ev.target.value) >= 0)
                setTotalSeats(parseInt(ev.target.value));
            }}
          />
          <div className="w-full">
            <div
              className="toAdd flex flex-col gap-5 md:pr-20 w-full"
              id="toAdd"
            ></div>
            {seatsForType.map((seats, i) => (
              <div
                key={i}
                className="flex flex-col gap-5 mt-2 md:pr-20 bg-violet-800 rounded-xl p-2 pt-5"
              >
                <input
                  id={String(i)}
                  className="input rounded-lg p-2 bg-violet-100 w-full flex flex-col"
                  name="numInput"
                  type="number"
                  placeholder="# of Seats"
                  onChange={handleSeatChange}
                  value={seatsForType[i]}
                ></input>
                <select
                  className="p-2 rounded-lg bg-violet-100"
                  name="typeSelect"
                  onChange={handleChangeOption}
                  id={String(i)}
                  value={ticketTypeId[i]}
                >
                  <option className="text-sm text-zinc-700">
                    Select Ticket Type
                  </option>
                  {ticketTypes.map((ticketType, j) => (
                    <option
                      key={j}
                      className="text-sm text-zinc-700"
                      value={ticketType.id}
                    >
                      {ticketType.description}: {ticketType.price} (+
                      {ticketType.concessions} concessions)
                    </option>
                  ))}
                </select>
                <button
                  className="w-min block px-2 py-1 bg-red-500 disabled:opacity-30 mb-4 text-white rounded-lg text-sm"
                  type="button"
                  onClick={handleRemoveOption}
                  value={i}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="block px-2 py-1 bg-blue-500 disabled:opacity-30
              mt-4 mb-2 text-white rounded-lg text-sm"
              type="button"
              onClick={handleAddTicketOption}
            >
              Add Ticket Option
            </button>
          </div>
          <div className="flex md:flex-row gap-10 flex-col">
            <div>
              <h3 className="font-semibold text-white">Enter Date</h3>
              <input
                type="date"
                id="date"
                className="input w-full p-2 rounded-lg bg-violet-100 mb-7"
                value={showingData.eventdate}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                  console.log(ev.target.value);
                  setEventDate(ev.target.value);
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-white">Enter time</h3>
              <input
                type="time"
                id="time"
                name="starttime"
                placeholder="00:00:00"
                className="w-full p-2 rounded-lg bg-violet-100 mb-7 "
                value={toTimeStringFormat(
                  showingData.starttime
                    ? showingData.starttime
                    : showingData.starttime
                )}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                  setStartTime(ev.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <button
          className="px-2 py-1 bg-red-500 disabled:opacity-30  mt-2 mb-4 text-white rounded-lg text-sm"
          type="button"
          onClick={handleDeleteShow}
          id={String(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShowingInputContainer;
