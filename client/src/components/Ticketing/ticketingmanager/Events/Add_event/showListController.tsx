/* eslint-disable max-len */
import React, {useState} from 'react';
import ShowingInputContainer from './showingInputContainer';
import {Showing} from '../EventForm';


interface ShowListControllerProps{
   addShowData: (show:Showing) => void,
   editMode?: boolean
}

const ShowListController = ({addShowData, editMode}: ShowListControllerProps) => {
  // const [showings, setShowings] = useState([]);
  const [shows, addShow] = useState([]);
  const [counter, updateCounter] = useState(0);
  // SHOWINGS ACTIONS:
  const addShowBox = () => {
    const show = {
      id: counter,
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

  const renderedShow = shows.map((element) => {
    // eslint-disable-next-line react/jsx-key
    return (<ShowingInputContainer
      id={element.id} key={element.id}
      addShow={addShowData} deleteShow={deleteShowing} editMode={editMode} />);
  });

  return (
    <>
      {renderedShow}
      <div>
        <button
          className='px-3 py-2 bg-green-500 disabled:opacity-30 text-white rounded-xl'
          type='button' onClick={addShowBox} disabled={editMode}>
                Add Showing
        </button>
      </div>
    </>
  );
};

export default ShowListController;
