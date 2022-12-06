/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

import React, {ReactElement, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navigation from '../Navigation';
import {getDataGridUtilityClass} from '@mui/x-data-grid';
/**
 * @returns {object} ContactOneResult - has Navigation
 *  and Contacts to reroute to other components
 */

export const ContactOneResult = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const {getAccessTokenSilently} = useAuth0();

  const getData = async () => {
    if (params.contactid) {
      setIsLoading(true);
      const token = await getAccessTokenSilently({
        audience: 'https://localhost:8000',
        scope: 'admin',
      });
      await axios
          .get(
              process.env.REACT_APP_ROOT_URL + `/api/contacts/show/${params.contactid}`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              },
          )
          .then((res) => {
            setData(res.data.data);
            console.log(res);
          })
          .catch((err) => {
            setError(err.message);
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='flex flex-row'>
      <Navigation/>
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='flex flex-col  md:ml-[18rem] md:mt-40 sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem] '>
          <div>
            { data.length > 0 &&
              <div>
                <div className='mt-9 text-zinc-600 w-full '>
                  {isLoading ? <div className="radial-progress"/> :
                  <ContactDisplayForm data={data[0]} />}
                </div>
              </div>
            }
            { data.length > 0 &&
            <div>
              <br/>
              {data.map(
                  (Cust) =>
                    <ContactDisplayTicket
                      data={Cust}
                      key={Cust.orderid}
                      {...Cust}/>,
              )},
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactDisplayForm = ({
  data,
}:{
  data:any
}):ReactElement =>{
  const navigate = useNavigate();
  if (!data) return <div>Nothing in contactForm</div>;
  const {
    firstname,
    lastname,
    contactid,
    email,
    phone,
    custaddress,
    newsletter,
    donorbadge,
    seatingaccom,
    vip,
    volunteerlist,
  }=data;
  return (
    <div>
      <button className='bg-blue-600 disabled:opacity-40
             mt-4 text-white px-5 py-2 mb-3
             rounded-xl justify-end
             ' onClick={() => navigate(`/admin/contacts`)}>Back to search
      </button>
      <div className='flec flex-row w-full bg-white
        shadow-lg border border-zinc-300 rounded-lg'>
        <div className='flex flex-col mt-2 p-5 '>
          <div className='flex flex-row gap-3 text-3xl items-center border-b pb-5 font-bold text-zinc-700'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            <div >Customer Information</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-5 w-full'>
            <div className='font-semibold'>
             Customer name:
            </div>
            <div>{firstname +' '+lastname}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               ID:
            </div>
            <div>{contactid}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               Email:
            </div>
            <div>{email}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               Phone:
            </div>
            <div>{phone}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               Customer Address:
            </div>
            <div>{custaddress}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               Newsletter:
            </div>
            <div>{'' + newsletter}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               Donorbadge:
            </div>
            <div>{donorbadge}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               Seating Accomdation:
            </div>
            <div>{ '' + seatingaccom }</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               VIP:
            </div>
            <div>{ '' + vip }</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>
               Volunteer List:
            </div>
            <div>{'' + volunteerlist}</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export const ContactDisplayTicket = ({
  data,
}:{
    data:any
  }):ReactElement =>{
  const {getAccessTokenSilently} = useAuth0();

  const handleRefund = async (orderid, amount) => {
    const token = await getAccessTokenSilently({
      audience: 'https://localhost:8000',
      scope: 'admin',
    });

    try {
      const id = orderid;
      // refund order
      amount = 0.0;
      const refMode = 1;

      const response = await fetch(
          process.env.REACT_APP_ROOT_URL + '/api/refunds', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({refMode, id, amount}),
          });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return <div>Nothing in contactForm</div>;
  const {
    orderdate,
    orderid,
    ordertime,
    ordertotal,
    refunded,
  } = data;
  if (orderid != null) {
    return (
      <div className='flec flex-row w-full bg-white
            shadow-lg border border-zinc-300 rounded-lg'>
        <div className='flex flex-col mt-2 p-5 '>
          <div className='flex flex-row gap-3 text-lg mt-5 w-full'>
            <div className='font-semibold'>OrderId:</div>
            <div>{orderid}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>Order Date:</div>
            <div>{orderdate}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>Order Time:</div>
            <div>{ordertime}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>Order Total:</div>
            <div>{ordertotal}</div>
          </div>
          <div className='flex flex-row gap-3 text-lg mt-2 w-full'>
            <div className='font-semibold'>Refunded:</div>
            <div>{refunded}</div>
          </div>
          <button
            className='px-2 py-1 bg-blue-500 disabled:opacity-30
              mt-6 mb-4 text-white rounded-lg text-sm'
            onClick={() => handleRefund(orderid, ordertotal)}
          >
            Refund
          </button>
        </div>
      </div>
    );
  } else {
    return <div>Nothing in contactForm</div>;
  }
};
