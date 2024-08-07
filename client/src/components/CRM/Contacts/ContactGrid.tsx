import React, {useCallback, useState} from 'react';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarProps,
} from '@mui/x-data-grid';
import {useFetchToken} from '../../Ticketing/ticketingmanager/Event/components/ShowingUtils';
import ContactPopUp from './ContactPopUp';
import {
  columns,
  Contact,
  defaultParameters,
  emptyContact,
  useFetchContacts,
} from './contactUtils';
import {useLocation, useNavigate} from 'react-router-dom';
import PopUp from '../../Ticketing/PopUp';
import {usePopUp} from '../../Ticketing/ticketingmanager/TicketTypes/SubscriptionTypeUtils';
import format from 'date-fns/format';
import SearchBox from './SearchBox';
import {useSearchBox} from '../../Ticketing/ticketingmanager/TicketExchanges/TicketExchangeUtils';

const ContactGrid = () => {
  const {token} = useFetchToken();
  const navigate = useNavigate();
  const {popUpProps, showPopUp, setShowPopUp, setPopUpProps} = usePopUp();
  const [contactPopUpIsOpen, setContactPopUpIsOpen] = useState(false);
  const [contactPopUpErrMsg, setContactPopUpErrMsg] = useState(null);
  const location = useLocation();
  const {queries, updateQueries, addQuery} = useSearchBox(
    location.state?.length
      ? location.state
      : [
          {
            parameter: 'firstname',
            value: '',
          },
        ],
  );

  const {contacts, loading, setLoading, setReload} = useFetchContacts(
    token,
    queries,
    setPopUpProps,
  );

  const handleCloseContactPopUp = useCallback(() => {
    setContactPopUpIsOpen(false);
    setContactPopUpErrMsg(null);
  }, []);

  const handleCreateContact = useCallback(async (contact: Contact) => {
    if (contact.seatingAcc === 'Other') {
      contact.seatingAcc = contact.otherSeatingAcc;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_2_URL + '/contact',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstname: contact.first,
            lastname: contact.last,
            email: contact.email,
            phone: contact.phone,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            country: contact.country,
            postalcode: contact.postalCode,
            donorbadge: contact.donorBadge,
            visitsource: contact.visitSource,
            seatingaccom: contact.seatingAcc,
            comments: contact.comments,
            vip: contact.vip,
            volunteerlist: contact.volunteerList,
            newsletter: contact.newsletter,
          }),
        },
      );

      if (!response.ok) {
        throw response;
      }

      const data = await response.json();
      navigate(`/admin/contacts/show/${data.contactid}`);
    } catch (error) {
      const errorMessage = error.json ? (await error.json()).error : 'Failed to create contact';
      setContactPopUpErrMsg(errorMessage);
    }
  }, [token]);

  return (
    <main className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <header className='flex flex-col min-[1080px]:flex-row justify-between mb-10'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-3'>
            Contacts
          </h1>
          <SearchBox
            onSearch={() => {
              setLoading(true);
              setReload((prev) => !prev);
            }}
            header='Search Contacts'
            queries={queries}
            defaultParameters={defaultParameters}
            updateQueries={updateQueries}
            addQuery={addQuery}
          />
        </header>
        <div className='flex bg-white p-4 rounded-xl'>
          <DataGrid
            sx={{
              borderRadius: '.75rem',
              fontSize: 12,
            }}
            columns={columns}
            disableSelectionOnClick
            loading={loading}
            rows={contacts}
            getRowId={(row) => row.contactid}
            autoHeight
            rowsPerPageOptions={[10, 25, 50, 100]}
            components={{Toolbar: CustomContactToolBar}}
            componentsProps={{
              toolbar: {
                setShowPopUp: setContactPopUpIsOpen,
              }}}
            initialState={{
              pagination: {
                pageSize: 10,
              },
            }}
          />
        </div>
      </div>
      {showPopUp && (
        <PopUp
          {...popUpProps}
          handleProceed={() => setShowPopUp(false)}
          showClose={false}
          showSecondary={false}
        />
      )}
      {contactPopUpIsOpen && (
        <ContactPopUp
          errorMessage={contactPopUpErrMsg}
          onCancel={handleCloseContactPopUp}
          onSubmit={handleCreateContact}
          title='Create Contact'
          primaryLabel='Create'
          values={emptyContact}
        />
      )}
    </main>
  );
};

const CustomContactToolBar = ({setShowPopUp, ...props}: GridToolbarProps) => {
  return (
    <GridToolbarContainer
      {...props}
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        padding: '.5rem',
      }}
    >
      <div>
        {/* @ts-ignore */}
        <GridToolbarColumnsButton />
        {/* @ts-ignore */}
        <GridToolbarFilterButton />
        {/* @ts-ignore */}
        <GridToolbarDensitySelector />
        <GridToolbarExport
          printOptions={{
            disableToolbarButton: true,
          }}
          csvOptions={{
            fileName: `Contact_List_${format(new Date(), 'yyyyMMdd-hhmma')}`,
          }}
        />
      </div>
      <button
        className='bg-blue-500 px-4 py-2 disabled:gray-500 hover:bg-blue-600 hover:ring hover:ring-blue-300 hover:ring-offset-1 rounded-xl m-1 shadow-xl text-white text-base'
        data-test-id='create-contact-button'
        onClick={() => setShowPopUp((prev) => !prev)}
      >
        Create Contact
      </button>
    </GridToolbarContainer>
  );
};

export default ContactGrid;
