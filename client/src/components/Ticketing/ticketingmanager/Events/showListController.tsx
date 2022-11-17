/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';
// import EventForm from './EventForm';
import ShowingInputContainer from './showingInputContainer';

/**
 * Used to help process shows correctly
 *
 * @param {Showing[]} showsData
 * @param {Showing} show
 * @param {Function} addShowData
 * @param {Showing[]} shows
 * @param {Function} updateShows
 * @param {number} eventid
 */
interface ShowListControllerProps{
   showsData?: Showing[],
   addShowData: (show: Showing) => void,
   updateShows: (shows:Showing[]) => void,
   deleteShowing: (event: Event) => void,
   eventid: number,
}

/**
 * The shows handler
 *
 * @param {ShowListControllerProps} showsData, addShowData, updateShows, eventid
 * @returns {ReactElement} and {ShowingInputContainer}
 */
const ShowListController = ({showsData, addShowData, updateShows, deleteShowing, eventid}: ShowListControllerProps) => {
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

  // Kinda works
  const deleteShowingBox = (event) => {
    const toRemove = event.target.parentElement.parentElement;
    console.log(toRemove);
    toRemove.remove();
    // const newList = shows.filter((o, i) => index !== i);
    // addShow(newList);
    /*
    const oldList = [...shows];
    const newList = oldList.splice(index, 1);
    const why = shows.splice(index, 1);
    const newList = oldList.filter((shows) => {
      return shows.id != id;
    });
    console.log(oldList);
    */
    console.log(shows);
    deleteShowing(event);
  };

  return (
    <>
      {shows.map((element, index) => {
        return (<ShowingInputContainer
          initialData={element}
          id={element.id} showingNum={showingNum += 1} key={index}
          addShow={addShowData} deleteShow={deleteShowingBox}/>);
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
