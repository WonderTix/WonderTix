import React from 'react';
import {createSubmitFunction} from '../../../Event/components/ShowingUtils';
import {useFetchSeasonTicketTypes} from '../utils/apiRequest';
import {useState} from 'react';
import {SeasonTicketTypeUpdateTable} from './SeasonTicketTypeUpdateTable';
import {SeasonTicketTypeView} from './SeasonTicketTypeView';
import {SubscriptionTypeContainerProps} from './SubscriptionTypeContainer';

export const SeasonTicketTypesContainer = (
  props: SubscriptionTypeContainerProps,
) => {
  const {id, token, disabled, setPopUpProps, showPopUp, setDisabled} = props;
  const {seasonTicketTypes, setSeasonTicketTypes, setReload, ticketTypes} =
    useFetchSeasonTicketTypes(id);
  const [edit, setEdit] = useState(false);

  const onSubmitSuccess = async (event) => {
    try {
      const data = await event.json();
      setSeasonTicketTypes(data);
    } catch (error) {
      setReload((prev) => !prev);
    } finally {
      setDisabled(false);
      setEdit(false);
      setPopUpProps((prev) => ({
        ...prev,
        title: 'Save Success',
        message: 'Ticket type updates successfully saved',
        dataTestId: 'season-ticket-type-save-success',
        success: true,
        showSecondary: false,
        showClose: false,
      }));
    }
  };

  const onSubmitError = async (event) => {
    const message = event.json
      ? (await event.json).error
      : 'Error saving updates';
    setPopUpProps((prev) => ({
      ...prev,
      title: 'Save Failed',
      message,
      dataTestId: 'season-ticket-type-save-failure',
      success: false,
      showSecondary: false,
      showClose: false,
    }));
  };

  if (!ticketTypes || !seasonTicketTypes) return null;

  return (
    <section className='rounded-xl p-7 bg-white text-lg mt-5 shadow-xl'>
      {edit ? (
        <SeasonTicketTypeUpdateTable
          options={ticketTypes.map(
            ({id, tickettypeid, concessions, deprecated, ...rest}) => ({
              ...rest,
              concessionprice: concessions,
              tickettypeid_fk: tickettypeid,
            }),
          )}
          seasonTicketTypes={seasonTicketTypes.map(
            ({seasonid_fk, id, ...rest}) => rest,
          )}
          showPopUp={showPopUp}
          onSubmit={createSubmitFunction(
            'PUT',
            `${process.env.REACT_APP_API_2_URL}/season-ticket-type-price-default/${id}`,
            token,
            onSubmitSuccess,
            onSubmitError,
          )}
          setEdit={() => {
            setEdit(false);
            setDisabled(false);
          }}
        />
      ) : (
        <SeasonTicketTypeView
          seasonTicketTypes={seasonTicketTypes}
          sticky={showPopUp}
          ticketTypes={ticketTypes.map(
            ({tickettypeid, concessions, deprecated, ...rest}) => ({
              ...rest,
              concessionprice: concessions,
              tickettypeid_fk: tickettypeid,
            }),
          )}
          setEdit={() => {
            setEdit(true);
            setDisabled(true);
          }}
          disabled={disabled}
        />
      )}
    </section>
  );
};
