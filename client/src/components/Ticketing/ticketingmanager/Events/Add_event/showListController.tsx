import React, {useState} from 'react';
import ShowingInputContainer from './showingInputContainer';
import {Showing} from '../EventForm';


interface ShowListControllerProps{
   addShowData: (show:Showing) => void;
}

const ShowListController = ({addShowData}: ShowListControllerProps) => {
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
      addShow={addShowData} deleteShow={deleteShowing} />);
  });

  return (
    <>
      {renderedShow}
      <div>
        <button
          className='px-3 py-2 bg-green-500 text-white rounded-xl'
          type='button' onClick={addShowBox}>
                Add Showing
        </button>
      </div>
    </>
  );
};

export default ShowListController;
