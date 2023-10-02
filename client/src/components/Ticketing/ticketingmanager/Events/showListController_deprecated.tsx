/* eslint-disable require-jsdoc */
import React, {useState, useCallback, useEffect} from 'react';
import {Showing} from '../../../../interfaces/showing.interface';
// import EventForm from './EventForm';
import ShowingInputContainer from './showingInputContainer_deprecated';

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
  const [numOfShowings, setNumOfShowings] = useState(showsData ? showsData.length : 0);

  useEffect(() => {
    console.log(showsData);
  }, []);

  // SHOWINGS ACTIONS:
  // const addShowBox = (event) => {
  //   event.preventDefault();
  //   setNumOfShowings(numOfShowings + 1);
  //   const show: Showing = {
  //     id: 0,
  //     index: numOfShowings,
  //     eventid: eventid,
  //     eventtime: '',
  //     eventdate: '',
  //     tickettypeids: [],
  //     seatsForType: [],
  //     availableseats: 0,
  //     totalseats: 0,
  //     salestatus: true,
  //     ispreview: false,
  //   };
  //   console.log('created new show with id: ' + show.id);
  //   setShow((shows) => [...shows, show]);
  // };

  const addShowBox = (event) => {
    event.preventDefault();
    setNumOfShowings(numOfShowings + 1);
    const show: Showing = {
      eventinstanceid: 0,
      index: numOfShowings,
      eventid_fk: eventid,
      eventtime: '',
      eventdate: '',
      ticketTypeId: [],
      seatsForType: [],
      availableseats: 0,
      totalseats: 0,
      salestatus: true,
      ispreview: false,
    };
    console.log('created new show with id: ' + show.eventinstanceid);
    setShow((shows) => [...shows, show]);
  };

  const handleSetShow = useCallback(
    (show) => {
      const showItems = [...shows];
      // console.log(
      //   'handle set show called with event instance id ' + show.id
      // );
      console.log('id: ' + show.eventinstanceid);
      showItems[show.index] = show;

      setShow(showItems);
    },
    [shows],
  );

  const handleDeleteShow = useCallback(
    (e) => {
      const newShowItems = shows.filter((_, i) => i !== parseInt(e.target.id));
      newShowItems.forEach((e, i) => {
        e.index = i;
      });
      console.log('Begin HandleDelete', newShowItems);
      setNumOfShowings(numOfShowings - 1);
      setShow(newShowItems);
    },
    [shows],
  );

  useEffect(() => {
    setShowingsHandler(shows);
  }, [handleSetShow, handleDeleteShow]);


  return (
    <>
      {shows.map((element: Showing, index) => {
        return (
          <div key={index}>
            <ShowingInputContainer
              showingData={element}
              eventinstanceid={element.eventinstanceid}
              index={index}
              handleSetShow={handleSetShow}
              handleDeleteShow={handleDeleteShow}
            />
          </div>
        );
      })}
      <div>
        <button
          className='px-3 py-2 bg-green-500 disabled:opacity-30 text-white rounded-xl'
          type='button'
          onClick={addShowBox}
        >
          Add Showing
        </button>
      </div>
    </>
  );
};

export default ShowListController;
