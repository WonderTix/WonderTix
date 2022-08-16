/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';
import ShowingInputContainer from './showingInputContainer';


interface ShowListControllerProps{
   showsData?: Showing[];
   addShowData: (show: Showing) => void,
   updateShows: (shows:Showing[]) => void,
}

const ShowListController = ({showsData, addShowData, updateShows}: ShowListControllerProps) => {
  console.log('Shows data');
  console.log(showsData);
  const [shows, addShow] = useState(showsData ? showsData: []);
  // SHOWINGS ACTIONS:
  const addShowBox = (event) => {
    event.preventDefault();
    let id;
    if (shows.length > 0) {
      id = shows[shows.length - 1].id + 1;
    } else {
      id = 0;
    }
    const show: Showing = {
      id: parseInt(id),
      starttime: undefined,
      eventdate: undefined,
      salestatus: true,
      ticketTypeId: 0,
      availableseats: 0,
      totalseats: 0,
    };
    addShow([...shows, show]);

    // updateShows(newList);
  };


  const deleteShowing = (id) => {
    const oldList = [...shows];
    const newList = oldList.filter((shows) => {
      return shows.id != id;
    });
    addShow(newList);
    updateShows(newList);
  };

  return (
    <>
      {shows.map((element, index) => {
      // eslint-disable-next-line react/jsx-key
        return (<ShowingInputContainer
          initialData={element}
          id={element.id} key={index}
          addShow={addShowData} deleteShow={deleteShowing} />);
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
