/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, { useState, useCallback, useEffect } from "react";
import { Showing } from "../../../../interfaces/showing.interface";
// import EventForm from './EventForm';
import ShowingInputContainer from "./showingInputContainer";
import { fetchEventInstanceData } from "./events_pages/eventsSlice";

/**
 * Used to help process shows correctly
 *
 * @param {Showing[]} showsData
 * @param {Showing} show
 * @param {Showing[]} shows
 * @param {Function} updateShows
 * @param {number} eventid
 * @param {Function} setShowingsHandler
 */
interface ShowListControllerProps {
  showsData?: Showing[];
  eventid: number;
  setShowingsHandler: (show) => void;
}

/**
 * The shows handler
 *
 * @param {ShowListControllerProps} showsData, updateShows, eventid, setShowingsHandler
 * @returns {ReactElement} and {ShowingInputContainer}
 */
const ShowListController = ({
  showsData,
  eventid,
  setShowingsHandler,
}: ShowListControllerProps) => {
  const [shows, setShow] = useState(showsData ? showsData : []);
  const [numOfShowings, setNumoOfShowings] = useState(
    showsData ? showsData.length : 0
  );

  // SHOWINGS ACTIONS:
  const addShowBox = (event) => {
    event.preventDefault();
    setNumoOfShowings(numOfShowings + 1);
    const show: Showing = {
      id: numOfShowings,
      eventid_fk: eventid,
      starttime: "",
      eventdate: "",
      ticketTypeId: [],
      seatsForType: [],
      availableseats: 0,
      totalseats: 0,
      salestatus: true,
      eventinstanceid: numOfShowings,
    };
    setShow((shows) => [...shows, show]);
  };

  const handleSetShow = useCallback(
    (show) => {
      const showItems = [...shows];
      console.log("handle set show called with eventinstanceid " + show.eventinstanceid);
      console.log("id: " + show.id);
      showItems[show.id] = show;

      showItems[show.id] = show;
      
      setShow(showItems);
    },
    [shows]
  );

  const handleDeleteShow = useCallback(
    (e) => {
      const newShowItems = shows.filter((_, i) => i !== parseInt(e.target.id));
      newShowItems.forEach((e, i) => {
        e.eventinstanceid = i;
      });
      console.log("Begin HandleDelete", newShowItems);
      setNumoOfShowings(numOfShowings - 1);
      setShow(newShowItems);
    },
    [shows]
  );

  useEffect(() => {
    setShowingsHandler(shows);
  }, [handleSetShow, handleDeleteShow]);
  
  let newShows: Showing[] = [];
  let uniqueKeys: Set<number> = new Set();
  shows.forEach((show) => {
    if(show !== undefined) {
    if(!uniqueKeys.has(show.eventinstanceid)) {
      uniqueKeys.add(show.eventinstanceid);
      //show.id = show.eventinstanceid;
      newShows.push(show);
    }
    }
  });

  return (
    <>
      {newShows.map((element: Showing, index) => {
        //console.log("id: " + element.eventinstanceid);
        return (
          <ShowingInputContainer
            showingData={element}
            id={element.id ? element.id : index}
            handleSetShow={handleSetShow}
            handleDeleteShow={handleDeleteShow}
          />
        );
      })}
      <div>
         <button
          className="px-3 py-2 bg-green-500 disabled:opacity-30 text-white rounded-xl"
          type="button"
          onClick={addShowBox}
        >
          Add Showing
        </button>
      </div>
    </>
  );
};

export default ShowListController;
