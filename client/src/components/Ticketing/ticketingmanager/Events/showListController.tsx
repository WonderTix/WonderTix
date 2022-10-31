/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';
// import EventForm from './EventForm';
import ShowingInputContainer from './showingInputContainer';

/**
 * Used to help process shows correctly
 * @param {Showing[]} showsData
 * @param {Showing} show
 * @param {function} addShowData
 * @param {Showing[]} shows
 * @param {function} updateShows
 * @param {number} eventid
 */
interface ShowListControllerProps{
   showsData?: Showing[],
   addShowData: (show: Showing) => void,
   updateShows: (shows:Showing[]) => void,
   eventid: number,
};

/**
 * The shows handler
 * @param {ShowListControllerProps} showsData, addShowData, updateShows, eventid
 * @return {ReactElement} and {ShowingInputContainer}
 */
const ShowListController = ({showsData, addShowData, updateShows, eventid}: ShowListControllerProps) => {
  const [shows, addShow] = useState(showsData ? showsData: []);
  let showingNum = 0;
  // SHOWINGS ACTIONS:
  const addShowBox = (event) => {
    event.preventDefault();
    /* let id;
    if (shows.length > 0) {
      id = shows[shows.length - 1].id + 1;
    } else {
      id = 0;
    } */
    const show: Showing = {
      id: 0,
      eventid: eventid,
      starttime: undefined,
      eventdate: undefined,
      salestatus: true,
      ticketTypeId: [],
      seatsForType: [],
      availableseats: 0,
      totalseats: 0,
    };
    addShow((shows) => [...shows, show]);
    console.log(shows);
    // updateShows(newList);
  };


  const deleteShowing = (whenCreate) => {
    const index = whenCreate - 1;
    const oldList = [...shows];
    const newList = oldList.splice(index, 1);
    /*
    const newList = oldList.filter((shows) => {
      return shows.id != id;
    });
    */
    console.log(oldList);
    addShow([]);
    addShow(oldList);
    updateShows(oldList);
  };

  return (
    <>
      {shows.map((element, index) => {
        return (<ShowingInputContainer
          initialData={element}
          id={element.id} showingNum={showingNum += 1} key={index}
          addShow={addShowData} deleteShow={deleteShowing}/>);
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
