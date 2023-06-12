/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState, useCallback, useEffect} from 'react';
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
  const [shows, setShow] = useState(showsData ? showsData : []);
  const [numOfShowings, setNumoOfShowings] = useState(showsData ? showsData.length : 0);

  // SHOWINGS ACTIONS:
  const addShowBox = (event) => {
    event.preventDefault();
    setNumoOfShowings(numOfShowings + 1);
    const show: Showing = {
      id: numOfShowings,
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
    showItems[show.id] = show;
    setShow(showItems);
  }, [shows]);

  const handleDeleteShow = useCallback((e) => {
    const newShowItems = shows.filter((_, i) => i !== parseInt(e.target.id));
    newShowItems.forEach((e, i) => {
      e.id = i;
    });
    console.log(newShowItems);
    setNumoOfShowings(numOfShowings - 1);
    setShow(newShowItems);
  }, [shows]);


  useEffect(() => {
    console.log(shows);
    setShowingsHandler(shows);
  }, [handleSetShow, handleDeleteShow]);

  return (
    <>
      {shows.map((element, index) => {
        return (
          <ShowingInputContainer
            showingData={element}
            id={element.id ? element.id : index}
            key={element.id ? element.id : index}
            handleSetShow={handleSetShow}
            handleDeleteShow={handleDeleteShow}
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
