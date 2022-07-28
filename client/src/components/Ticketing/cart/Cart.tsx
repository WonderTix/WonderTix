/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import CartRow from './CartItem';
import {Backdrop, Button, Divider, Fade, Modal, Paper, Typography} from '@material-ui/core';
import {toDollarAmount} from '../../../utils/arrays';
import {removeTicketFromCart, removeAllTicketsFromCart, selectCartContents} from '../ticketingmanager/ticketing/ticketingSlice';
import {useNavigate} from 'react-router-dom';


type Item = {price: number, qty: number}
const itemCost = (item: Item) => item.price * item.qty;
const subtotalReducer = (acc: number, item: Item) => acc + itemCost(item);

const Cart = () => {
  const history = useNavigate();
  const navigate = useNavigate();

    enum RemoveContext
    {
        single,
        all
    }

    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartContents);
    const subtotal = items.reduce(subtotalReducer, 0);
    const [modalOpen, setModalOpen] = useState(false);
    const [targetItem, setTargetItem] = useState<number|null>(null);
    const [removeContext, setRemoveContext] = useState(RemoveContext.single);
    const [removeContextMessage, setRemoveContextMessage] = useState('');

    const resetModal = () => {
      setTargetItem(null);
      setModalOpen(false);
    };

    const handleRemove = () => {
      if (removeContext === RemoveContext.single) {
        if (targetItem) {
          dispatch(removeTicketFromCart(targetItem));
          resetModal();
        }
      } else if (removeContext === RemoveContext.all) {
        dispatch(removeAllTicketsFromCart());
        resetModal();
      }
    };

    const removeAllCartItems = () => {
      setRemoveContext(RemoveContext.all);
      setRemoveContextMessage('all items');
      setModalOpen(true);
    };

    const displayModal = (id: number) => {
      setRemoveContext(RemoveContext.single);
      setRemoveContextMessage('this');
      setTargetItem(id);
      setModalOpen(true);
    };

    const navigateToCompleteOrder = () => {
      history('/completeorder');
    };

    return (
      <div className='w-full h-screen'>
        <div className='w-full h-screen bg-zinc-200'>
          <div className='flex flex-col md:flex-col sm:flex-col
         sm:items-center w-full h-full p-20 overflow-y-scroll'>
            <div className='w-full flex flex-row mb-5'>
              <button onClick={() => navigate('/')} className='bg-blue-500 mt-10 hover:bg-blue-600 px-3 py-2 rounded-xl flex flex-row items-center text-zinc-100'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              back to Events</button>
            </div>
            <div className='flex flex-row items-center mt-2 text-zinc-800'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <div className='text-3xl font-bold ml-2 mt-2'>My Cart</div>
            </div>
            <div className='flex flex-col md:flex-row sm:flex-col
         sm:items-center w-full h-full'>
              <div className='w-full h-full md:mt-20 sm:mt-20 bg-zinc-300 p-9 flex flex-col items-start rounded-xl'>
                {(items.length > 0) ?
                    items.map((data) => <CartRow key={data.product_id} item={data} removeHandler={displayModal} />) :
                    <div className='text-zinc-400 '>There's nothing in your cart</div>
                }
              </div>
              <div className='md:w-[30rem] sm:w-full sm:mt-10
               md:ml-5 h-full md:mt-20 bg-zinc-900 p-9 flex
                flex-col items-center rounded-xl justify-between'>
                <div className='flex flex-col items-center'>
                  <div className='text-zinc-100 text-xl font-semibold'>Subtotal</div>
                  <div className='text-white'>{toDollarAmount(subtotal)}</div>
                </div>

                <div className='flex flex-col items-center gap-3'>
                  <button className='bg-red-600 flex flex-col items-center w-full px-3 py-3 text-white rounded-xl disabled:opacity-50 'disabled={items.length === 0} onClick={removeAllCartItems}>
                    <div className='flex flex-row items-center gap-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Empty Cart
                    </div>

                  </button>
                  <button className='bg-yellow-600 px-3 py-2 flex flex-col items-center w-full text-white rounded-xl disabled:opacity-50 ' disabled={items.length === 0} onClick={navigateToCompleteOrder}>
                    <div className='flex flex-row items-center gap-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Proceed To Checkout
                    </div>

                  </button>
                </div>

                <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{timeout: 500}}
                >
                  <Fade in={modalOpen}>
                    <Paper>
                      <Typography variant='h6' align='center' component='h2' id='modal-title'>Confirm removal</Typography>
                      <p id='modal-description'>Do you want to remove {removeContextMessage} from your cart?</p>
                      <div>
                        <Button variant="outlined" onClick={resetModal}>
                                Cancel
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleRemove}>
                                Yes, remove
                        </Button>
                      </div>
                    </Paper>
                  </Fade>
                </Modal>
              </div>
            </div>

          </div>
        </div>


      </div>
    );
};

export default Cart;
