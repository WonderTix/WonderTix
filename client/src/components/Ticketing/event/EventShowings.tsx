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

  const EventDescription = ({
    description,
    className,
  }: {
    description: string | undefined;
    className: string;
  }) => (
    <p className={`flex flex-col max-w-2xl ${className}`}>
      <span className='text-zinc-300 font-semibold text-md tracking-wider'>
        DESCRIPTION
      </span>
      <span className='text-zinc-100 text-xl'>{description}</span>
    </p>
  );

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
          items-center bg-gradient-to-r from-black to-zinc-900/70 px-[1rem] py-[5rem] tab:px-[3rem] md:px-[8rem]'
        >
          <section className='bg-zinc-200/20 shadow-md p-8 mt-9 rounded-xl backdrop-blur-md w-full flex flex-col gap-8'>
            {eventData.soldOut && (
              <Label className='text-2xl' color='slate'>
                SOLD OUT
              </Label>
            )}
            <div className='flex gap-6 tab:gap-8 md:gap-12 items-center'>
              <EventImage
                src={eventData.imageurl}
                className='self-center w-auto max-h-44 tab:max-h-56 max-w-[7rem] tab:max-w-[13rem] rounded-md'
                title={eventData.title}
              />
              <div className='flex flex-col gap-5'>
                <h1
                  data-testid='event-title'
                  className='text-white font-extrabold text-4xl md:text-5xl'
                >
                  {titleCase(eventData.title)}
                </h1>
                <EventDescription
                  description={eventData.description}
                  className='hidden tab:flex'
                />
              </div>
            </div>
            <EventDescription
              description={eventData.description}
              className='tab:hidden'
            />
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
