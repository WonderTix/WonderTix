import React, {ReactElement, useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {useParams} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {selectEventData, fetchTicketingData} from '../ticketingmanager/ticketingSlice';
import TicketPicker from './TicketPicker';
import PopUp from '../PopUp';
import {useNavigate} from 'react-router-dom';
import {EventImage, getImageDefault} from '../../../utils/imageURLValidation';

/**
 * EventPageProps - Used to hold data (uses url params rather than props)
 */
type EventPageProps = {eventid: string};

/**
 * Data Handler
 *
 * @returns {ReactElement} and returns dispatch(fetchTicketingData())
 */
const EventShowings = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  useEffect(()=>{
    void dispatch(fetchTicketingData());
  }, []);

  const handleSubmit = (ticketInfo: any) => {
    const date = ticketInfo.selectedDate;
    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });

    setPopUpMessage(`You added ${ticketInfo.qty} ticket${
      ticketInfo.qty === 1 ? '' : 's'
    } to ${title} on ${dateString} to the cart.`);
    setShow(!show);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setShow(false);
    document.body.style.overflow = '';
  };

  const navigateToCart = () => {
    navigate('/cart');
    document.body.style.overflow = '';
  };

  const {eventid} = useParams<EventPageProps>();
  const eventData = useAppSelector((state) => selectEventData(state, Number(eventid)));
  if (eventData === undefined) return <p>Whoops! Event not found</p>;
  const {title, description, tickets} = eventData;
  const imageUrl = eventData.imageurl;

  return (
    <>
      <main
        className='bg-fixed bg-cover'
        style={{
          backgroundImage: `url(${getImageDefault(
            imageUrl,
          )}),url(${getImageDefault()})`,
        }}
      >
        <div className='flex flex-col gap-9 min-h-[calc(100vh-233px)] md:min-h-[calc(100vh-142px)] items-center backdrop-blur-sm bg-zinc-900/80 px-[1rem] py-[5rem] tab:px-[5rem] md:px-[8rem]'>
          <button
            onClick={() => navigate('/')}
            className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex items-center gap-1 self-start text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            back to Events
          </button>
          <div className='flex flex-col md:gap-12 md:flex-row bg-zinc-700/30 p-9 rounded-xl'>
            <EventImage
              src={imageUrl}
              className='w-[75%] tab:w-[55%] md:w-[35%] lg:w-[25%] self-center h-auto rounded-xl'
              title={title}
            />
            <div className='my-3'>
              <h1 data-testid='event-title' className='text-white text-4xl font-bold'>
                {titleCase(title)}
              </h1>
              <p className='text-zinc-200 font-semibold text-2xl mt-6'>
                Event description
              </p>
              <p className='text-zinc-100 text-xl pr-7'>
                {description ? description : ''}
              </p>
            </div>
          </div>
          <div className='bg-zinc-700/30 p-9 flex flex-col items-center rounded-xl w-full'>
            <TicketPicker onSubmit={handleSubmit} tickets={tickets} />
          </div>
        </div>
      </main>
      {show && (
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
