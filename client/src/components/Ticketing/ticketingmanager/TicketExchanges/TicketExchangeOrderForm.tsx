import React, {useCallback, useState} from 'react';
import CompleteOrderForm from '../../checkout/CompleteOrderForm';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {
  baseContact,
  CheckoutContact,
  validateContactInputAdmin,
} from '../../checkout/CheckoutUtils';
import {seatingAccInOptions} from '../../../CRM/Contacts/contactUtils';
import {getCheckoutRequestBody, onlineCheckout} from './TicketExchangeUtils';
import {TicketExchangeCart} from './TicketExchangeCart';
import {contact} from '../prismaTypes';
import {useNavigate} from 'react-router-dom';
import PopUp from '../../PopUp';


const getCheckoutContact = (customer: contact) => ({
  firstname: customer.firstname ?? '',
  lastname: customer.lastname ?? '',
  address: customer.address ?? '',
  city: customer.city ?? '',
  state: customer.state ?? '',
  country: customer.country ?? '',
  postalcode: customer.postalcode ?? '',
  phone: customer.phone ?? '',
  email: customer.email ?? '',
  confirmEmail: customer.email ?? '',
  visitsource: customer.visitsource ?? '',
  seatingaccom: seatingAccInOptions(customer.seatingaccom)
    ? customer.seatingaccom
    : 'Other',
  otherSeatingAcc: seatingAccInOptions(customer.seatingaccom)
    ? ''
    : customer.seatingaccom,
  comments: customer.comments ?? '',
  newsletter: !!customer.newsletter,
  donation: 0,
});

export const TicketExchangeOrderForm: React.FC = () => {
  const {
    setStage,
    customer,
    cartItems,
    refundItems,
    appliedDiscount,
    ticketRestrictions,
    token,
  } = useTicketExchangeContext();
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState<string>();

  const checkout = useCallback(
    async (checkoutFormInfo: CheckoutContact) => {
      try {
        await onlineCheckout(
          getCheckoutRequestBody({
            refundItems,
            cartItems,
            appliedDiscount,
            checkoutFormInfo,
            ticketRestrictions,
          }),
          token,
        );
        navigate('/success');
      } catch (error) {
        console.error(error);
        setStage('customer_info');
        if (error.json) {
          setPopUp((await error.json()).error);
        } else {
          setPopUp('Checkout failed please wait a moment and try again');
        }
      }
    },
    [refundItems, cartItems, appliedDiscount, ticketRestrictions, token],
  );

  return (
    <div className='flex flex-col items-center md:flex-row rounded-[1rem] md:items-stretch md:bg-white md:p-4 w-full h-full'>
      <div className='min-w-414 w-full h-full md:m-[2rem] md:mr-5 mt-10 bg-zinc-100 p-2 md:p-[1rem] flex flex-col gap-5 items-start rounded-xl overflow-auto'>
        <div className='flex flex-col items-center h-auto w-full'>
          <h1 className='text-3xl font-bold mb-5'>Complete Order</h1>
          <CompleteOrderForm
            onSubmit={async (formData) => {
              setStage('checkout');
              return checkout(formData);
            }}
            onBack={() => setStage('select_items')}
            validateInput={validateContactInputAdmin}
            disabled={!refundItems.size && !cartItems.size}
            requiredFields={['firstname', 'lastname', 'email']}
            baseValues={
              customer
                ? getCheckoutContact(customer)
                : {...baseContact, donation: 0}
            }
            mode='admin'
          />
        </div>
      </div>
      <div className='md:w-[35rem] p-2 w-full mt-2 min-[1280px]:mt-0'>
        <TicketExchangeCart />
      </div>
      {popUp && (
        <PopUp
          title='Checkout Failed'
          message={popUp}
          handleProceed={() => setPopUp('')}
          success={false}
          showSecondary={false}
          showClose={false}
        />
      )}
    </div>
  );
};


