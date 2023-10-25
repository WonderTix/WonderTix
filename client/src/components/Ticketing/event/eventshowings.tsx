import React, {ReactElement, useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {useParams} from 'react-router-dom';
import {titleCase} from '../../../utils/arrays';
import {fetchTicketRestrictionData, selectEventData} from '../ticketingmanager/ticketing/ticketingSlice';
import {fetchTicketingData} from '../ticketingmanager/ticketing/ticketingSlice';
import TicketPicker from './TicketPicker';
import {useNavigate} from 'react-router-dom';
import {EventImage, getImageDefault} from '../../../utils/imageURLValidation';

/**
 * EventPageProps - Used to hold data
 */
type EventPageProps = {eventid: string};

/**
 * Data Handler
 *
 * @returns {ReactElement} and returns dispatch(fetchTicketingData())
 */
const Eventshowings = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    void dispatch(fetchTicketingData());
    void dispatch(fetchTicketRestrictionData());
  }, []);

  const [show, setShow] = useState(false);

  const handleSubmit = (ticketInfo: any) => {
    const date = ticketInfo.selectedDate;
    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });

    const cartSuccessText = document.getElementById('cart-success-text');
    cartSuccessText.textContent = `You added ${ticketInfo.qty} ticket${
      ticketInfo.qty === 1 ? '' : 's'
    } to ${title} on ${dateString} to the cart.`;
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
  const eventData = useAppSelector((state) => selectEventData(state, eventid));
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
        <div className='flex flex-col gap-9 items-center backdrop-blur-sm bg-zinc-900/80 px-[1rem] py-[5rem] tab:px-[5rem] md:px-[8rem]'>
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
              className='w-[75%] self-center h-auto rounded-xl'
              title={title}
            />
            <div className='mt-6'>
              <h1 data-testid='event-title' className='text-white text-4xl font-bold'>
                {titleCase(title)}
              </h1>
              <p className='text-zinc-200 font-semibold text-xl mt-6'>
                Event description
              </p>
              <p className='text-zinc-100 pr-7'>
                {description ? description : ''}
              </p>
            </div>
          </div>
          <div className='bg-zinc-700/30 p-9 flex flex-col items-center rounded-xl w-full'>
            <TicketPicker onSubmit={handleSubmit} tickets={tickets} />
          </div>
        </div>
      </main>

      <div
        className={
          !show ? 'hidden' : 'fixed w-full h-screen overflow-x-hidden z-10'
        }
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
      >
        <div className='fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity'>
          <div className='flex items-end tab:items-center justify-center min-h-full p-4 text-center tab:p-0'>
            <div className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all tab:my-8 tab:max-w-lg w-full'>
              <div className='bg-white px-4 pt-5 pb-4 tab:p-6 tab:pb-4'>
                <div className='tab:flex tab:items-start'>
                  <button
                    type='button'
                    onClick={handleClose}
                    className='absolute top-3
                    right-2.5 text-gray-400 bg-transparent hover:bg-gray-200
                    hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto
                    inline-flex items-center dark:hover:bg-gray-800
                    dark:hover:text-white'
                    data-modal-toggle='popup-modal'
                    aria-label='Close modal'
                  >
                    <svg
                      aria-hidden='true'
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                  <div className='mt-3 text-center tab:mt-0 tab:ml-4 tab:text-left'>
                    <h2
                      className='text-lg leading-6 font-medium text-gray-900'
                      id='modal-title'
                    >
                      Success!
                    </h2>
                    <p
                      id='cart-success-text'
                      className='mt-2 text-sm text-gray-500'
                    >
                      Tickets added successfully!
                    </p>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 tab:px-6 tab:flex tab:flex-row-reverse'>
                <button
                  onClick={navigateToCart}
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent
                    shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                    tab:ml-3 tab:w-auto tab:text-sm'
                >
                  Take me there!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Eventshowings;
