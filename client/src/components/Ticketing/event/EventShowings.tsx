import React, {ReactElement, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {
  fetchTicketingData,
  selectEventData,
} from '../ticketingmanager/ticketingSlice';
import TicketPicker from './TicketPicker';
import PopUp from '../PopUp';
import {
  EventImage,
  getEventImageDefault,
} from '../../../utils/imageURLValidation';
import {SmallBackIcon} from '../Icons';
import Label from '../Label';
import {LoadingScreen} from '../mainpage/LoadingScreen';

/**
 * EventPageProps - Used to hold data (uses url params rather than props)
 */
type EventPageProps = {
  eventid: string;
};

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
    if (!loading && !eventData) {
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
        <div
          className='flex flex-col gap-9 min-h-[calc(100vh-233px)] md:min-h-[calc(100vh-142px)]
          items-center bg-zinc-900/80 px-[1rem] py-[5rem] tab:px-[3rem] md:px-[8rem]'
        >
          <section
            className='grid grid-cols-6 tab:grid-cols-12 grid-flow-row grid-rows-1 tab:grid-rows-6
            gap-x-7 gap-y-6 tab:gap-y-0 md:gap-x-12
            bg-zinc-300/20 shadow-md p-9 mt-9 rounded-xl backdrop-blur-md w-full'
          >
            <EventImage
              src={eventData.imageurl}
              className='self-center h-auto rounded-md col-span-2 tab:col-span-3 lg:col-span-2 row-span-full'
              title={eventData.title}
            />
            <h1
              data-testid='event-title'
              className='flex flex-col-reverse tab:flex-row gap-3 items-baseline text-white
              text-4xl tab:text-5xl md:text-4xl lg:text-5xl font-extrabold my-3 self-center
              col-span-4 tab:col-span-9 tab:self-end row-span-1 tab:row-span-2'
            >
              {eventData.soldOut && (
                <Label className='text-3xl' color='slate'>
                  SOLD OUT
                </Label>
              )}
              {titleCase(eventData.title)}
            </h1>
            <p className='flex flex-col col-span-full tab:col-span-9 md:col-span-8 lg:col-span-6 tab:row-span-4'>
              <span className='text-zinc-300 font-semibold text-md tracking-wider mt-2'>
                DESCRIPTION
              </span>
              <span className='text-zinc-100 text-xl'>
                {eventData.description ?? ''}
              </span>
            </p>
          </section>
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
