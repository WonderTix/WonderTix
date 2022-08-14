/* eslint-disable max-len */
import React, {useState} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';
import ShowingInputContainer from './showingInputContainer';


interface ShowListControllerProps{
   showsData?: Showing[];
   addShowData: (show:Showing) => void,
}

const ShowListController = ({showsData, addShowData}: ShowListControllerProps) => {
  console.log('Shows data');
  console.log(showsData);
  const [shows, addShow] = useState(showsData);
  const [counter, updateCounter] = useState(0);

  // SHOWINGS ACTIONS:
  const addShowBox = () => {
    const show: Showing = {
      id: counter,
      starttime: undefined,
      eventdate: undefined,
      ticketTypeId: 0,
      availableseats: 0,
      totalseats: 0,
    };
    addShow([...shows, show]);
    updateCounter(counter+1);
  };

  const deleteShowing = (id) => {
    const oldList = [...shows];
    const newList = oldList.filter((shows) => {
      return shows.id != id;
    });
    addShow(newList);
    if (shows.length == 1) {
      updateCounter(0);
    }
  };

  const renderedShow =shows.flatMap((element) => {
    console.log(element);

    // eslint-disable-next-line react/jsx-key
    return (<ShowingInputContainer
      initialData={element}
      id={element.id} key={element.id}
      addShow={addShowData} deleteShow={deleteShowing} />);
  });
  return (
    <>
      {renderedShow}
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
