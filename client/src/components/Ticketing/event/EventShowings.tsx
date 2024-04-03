import React, {ReactElement, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {fetchTicketingData, selectEventData} from '../ticketingmanager/ticketingSlice';
import TicketPicker from './TicketPicker';
import PopUp from '../PopUp';
import {EventImage, getEventImageDefault} from '../../../utils/imageURLValidation';
import {SmallBackIcon} from '../Icons';
import Label from '../Label';
import {LoadingScreen} from '../mainpage/LoadingScreen';

/**
 * EventPageProps - Used to hold data (uses url params rather than props)
 */
type EventPageProps = {eventid: string};

/**
 * Page for an individual event.
 *
 * @returns {ReactElement} EventShowings
 */
const EventShowings = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {eventid} = useParams<EventPageProps>();
  const eventData = useAppSelector((state) =>
    selectEventData(state, Number(eventid)),
  );

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTicketingData()).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // If event cannot be found, go to 404 page
    if (!loading && eventData === undefined) {
      navigate('not-found');
    }
  }, [loading]);

  const handleSubmit = (ticketInfo: any) => {
    const date = ticketInfo.selectedDate;
    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });

    setPopUpMessage(
      `You added ${ticketInfo.qty} ticket${
        ticketInfo.qty === 1 ? '' : 's'
      } to ${eventData.title} on ${dateString} to the cart.`,
    );
    setShowPopUp(!showPopUp);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setShowPopUp(false);
    document.body.style.overflow = '';
  };

  const navigateToCart = () => {
    navigate('/cart');
    document.body.style.overflow = '';
  };

  return !eventData ? (
    <LoadingScreen />
  ) : (
    <>
      <main
        className='bg-fixed bg-cover'
        style={{
          backgroundImage: `url(${getEventImageDefault(
            eventData.imageurl,
          )}),url(${getEventImageDefault()})`,
        }}
      >
        <div className='flex flex-col gap-9 min-h-[calc(100vh-233px)] md:min-h-[calc(100vh-142px)] items-center backdrop-blur-sm bg-zinc-900/80 px-[1rem] py-[5rem] tab:px-[5rem] md:px-[8rem]'>
          <button
            onClick={() => navigate('/')}
            className='bg-blue-600 mt-10 hover:bg-blue-700 px-3 py-2 rounded-lg flex items-center gap-1 self-start text-white
            disabled:opacity-40 shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <SmallBackIcon className='h-6 w-6' />
            back to Events
          </button>
          <div className='flex flex-col md:gap-12 md:flex-row bg-zinc-700/30 p-9 rounded-xl'>
            <EventImage
              src={eventData.imageurl}
              className='w-[75%] tab:w-[55%] md:w-[35%] lg:w-[25%] self-center h-auto rounded-xl'
              title={eventData.title}
            />
            <div className='my-3'>
              <h1
                data-testid='event-title'
                className='flex flex-col-reverse tab:flex-row gap-3 items-baseline text-white text-4xl font-bold'
              >
                {eventData.soldOut && (
                  <Label className='text-3xl' color='slate'>
                    SOLD OUT
                  </Label>
                )}
                {titleCase(eventData.title)}
              </h1>
              <p className='text-zinc-200 font-semibold text-2xl mt-6'>
                Event description
              </p>
              <p className='text-zinc-100 text-xl pr-7'>
                {eventData.description ? eventData.description : ''}
              </p>
            </div>
          </div>
          <TicketPicker
            isEventSoldOut={eventData.soldOut}
            onSubmit={handleSubmit}
            tickets={eventData.tickets}
          />
        </div>
      </main>
      {showPopUp && (
        <PopUp
          title='Success!'
          message={popUpMessage}
          primaryLabel='Take me there!'
          success
          handleClose={handleClose}
          handleProceed={navigateToCart}
          showSecondary={false}
        />
      )}
    </>
  );
};

export default EventShowings;
