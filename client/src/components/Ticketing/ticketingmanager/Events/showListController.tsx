/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState, useCallback} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';
// import EventForm from './EventForm';
import ShowingInputContainer from './showingInputContainer';

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
interface ShowListControllerProps{
   showsData?: Showing[],
   eventid: number,
   setShowingsHandler: (show) => void,
}

/**
 * The shows handler
 *
 * @param {ShowListControllerProps} showsData, updateShows, eventid, setShowingsHandler
 * @returns {ReactElement} and {ShowingInputContainer}
 */
const ShowListController = ({showsData, eventid, setShowingsHandler}: ShowListControllerProps) => {
  const [shows, setShow] = useState(showsData ? showsData: []);
  let showingNum = 0;
  // SHOWINGS ACTIONS:
  const addShowBox = (event) => {
    event.preventDefault();
    let id = 0;
    if (shows.length > 0) {
      id = shows[shows.length - 1].id + 1;
    } else {
      id = 0;
    }
    const show: Showing = {
      id: id,
      eventid: eventid,
      starttime: '',
      eventdate: '',
      ticketTypeId: [],
      seatsForType: [],
      availableseats: 0,
      totalseats: 0,
      salestatus: true,
    };
    setShow((shows) => [...shows, show]);
  };

  const handleSetShow = useCallback((show) => {
    const showItems = [...shows];
    let showToModify = showItems[show.id];
    showToModify = show;
    showItems[show.id] = show;
    setShow(showItems);
    setShowingsHandler(showItems);
  }, [shows]);

  return (
    <>
      {shows.map((element, index) => {
        return (
          <ShowingInputContainer
            initialData={element}
            id={element.id}
            showingNum={showingNum += 1}
            key={index}
            handleSetShow={handleSetShow}
          />);
      })}
      <div>
        <button
          className='px-3 py-2 bg-green-500 disabled:opacity-30 text-white rounded-xl'
          type='button' onClick={addShowBox}>
                Add Showing
        </button>
      </div>
    </>
  );
};

export default ShowListController;
