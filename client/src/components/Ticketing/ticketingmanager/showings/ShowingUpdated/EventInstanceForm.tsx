import {Showing} from '../../../../../interfaces/showing.interface';
import React from 'react';
import {Field, FieldArray, Formik} from 'formik';
import {InputControl} from './InputControl';
import {Button} from '@mui/material';
import {toDateStringFormat} from '../../Events/showingInputContainer';
import {useAuth0} from '@auth0/auth0-react';
import {TicketTypeTable} from './TicketTypeTable';


interface eventInstanceTicketType {
  typeID: number | string;
  typeQuantity:number | string;
}

const getTicketTypeArray =
  (types:(string|number)[], count: (string|number)[]) => {
    const toReturn:eventInstanceTicketType[] = [];
    types
        .forEach((id, index) => {
          toReturn.push({
            typeID: id,
            typeQuantity: count[index],
          });
        });
    return toReturn;
  };

const separateTicketTypeAndSeats = (toSeparate: eventInstanceTicketType[]) =>{
  const seatsForType=[];
  if (toSeparate.length===0) {
    return {
      seatsForType,
      ticketTypeId: [],
    };
  }
  const ticketTypeId = toSeparate.map((item) => {
    seatsForType.push(item.typeQuantity);
    return item.typeID;
  });
  return {seatsForType, ticketTypeId};
};

interface EventInstanceFormProps {
  initialValues?: Showing;
  eventid: number;
  ticketTypes:any[];
}

export const getTicketTypePrice = (id, priceType, ticketTypes) => {
  if (!id || id<0 || id>=ticketTypes.length) return 0;
  return ticketTypes[id][priceType];
};

export const EventInstanceForm = (props: EventInstanceFormProps) => {
  const {initialValues, eventid, ticketTypes} = props;
  const {getAccessTokenSilently} = useAuth0();
  const onSubmit = async (event, actions) => {
    console.log(event);
    const toSubmit = {
      ...event,
    };
    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_ROOT_URL,
        scope: 'admin',
      });
      const res = await fetch(process.env.REACT_APP_API_2_URL +
        `/event-instance/${event.eventinstanceid}`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(toSubmit),
      });

      if (res.status!==200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const baseValues = {
    availableseats: initialValues?initialValues.availableseats:0,
    eventdate: initialValues?toDateStringFormat(initialValues.eventdate):'',
    eventid_fk: initialValues?initialValues.eventid_fk:eventid,
    eventinstanceid: initialValues?initialValues.eventinstanceid:0,
    eventtime: initialValues?initialValues.eventtime.slice(0, 8):'',
    ispreview: false,
    defaulttickettype: 1,
    purchaseuri: 'http://null.com',
    instanceTicketTypes: initialValues?
      getTicketTypeArray(initialValues.ticketTypeId,
          initialValues.seatsForType):
      [],
    salestatus: true,
    totalseats: initialValues?initialValues.totalseats:0,
  };

  return (
    <div className={'bg-zinc-900/60 p-7 ' +
      'flex flex-row rounded-xl gap-1 justify-between'}>
      <Formik
        initialValues={baseValues}
        // validationSchema={eventInstanceSchema}
        onSubmit={onSubmit}
      >
        {({handleSubmit, values}) => (
          <form onSubmit={handleSubmit}>
            <div className={'grid grid-cols-4'}>
              <div className={'col-span-1 flex flex-col justify-between'}>
                <div>
                  {values.eventinstanceid === 0?
                    null:
                    <h2>Showing ID: {values.eventinstanceid}</h2>
                  }
                </div>
                <Field
                  name='eventdate'
                  component={InputControl}
                  label='Event Date'
                  type='date'
                />
                <Field
                  name='eventtime'
                  component={InputControl}
                  label='Event Time'
                  type='time'
                />
              </div>
              <div className={'col-span-1 flex flex-col justify-between'}>
                <Field
                  name='totalseats'
                  component={InputControl}
                  label='Ticket Quantity'
                  type='number'
                />
                <div>
                  <h3>
                    Available Seats:{
                    values.eventinstanceid!==0?
                      values.totalseats:
                      values.availableseats
                    }
                  </h3>
                </div>
              </div>
              <div className={'w-[50%]'}>
                <FieldArray
                  name={'instanceTicketTypes'}
                  render={(arrayHelpers) => (
                    <TicketTypeTable
                      arrayHelpers={arrayHelpers}
                      eventInstanceID={values.eventinstanceid}
                      ticketTypes={ticketTypes}
                    />
                  )
                  }/>
                <Button
                  variant={'contained'}
                  size={'small'}
                  type={'submit'}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};


