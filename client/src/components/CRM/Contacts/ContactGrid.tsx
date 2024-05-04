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
  defaultQueryOptions,
  emptyContact,
  useFetchContacts,
} from './contactUtils';
import {useNavigate} from 'react-router-dom';
import PopUp from '../../Ticketing/PopUp';
import {usePopUp} from '../../Ticketing/ticketingmanager/TicketTypes/SubscriptionTypeUtils';
import format from 'date-fns/format';
import SearchBox from './SearchBox';

const ContactGrid = () => {
  const {token} = useFetchToken();
  const navigate = useNavigate();
  const {popUpProps, showPopUp, setShowPopUp, setPopUpProps} = usePopUp();
  const [contactPopUpIsOpen, setContactPopUpIsOpen] = useState(false);
  const [contactPopUpErrMsg, setContactPopUpErrMsg] = useState(null);
  const [queries, setQueries] = useState<{parameter: string; value: string}[]>([
    {
      parameter: 'firstname',
      value: '',
    },
  ]);
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
            seatingaccom: contact.seatingAcc,
            comments: contact.comments,
            vip: contact.vip,
            volunteerlist: contact.volunteerList,
            newsletter: contact.newsletter,
          }),
        },
      );

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Contact with email already exists');
        } else {
          throw new Error('Failed to create contact');
        }
      }

      const data = await response.json();
      navigate(`/admin/contacts/show/${data.contactid}`);
    } catch (error) {
      setContactPopUpErrMsg(error.message);
      console.error(error);
    }
  }, []);

  const updateParameters = useCallback(
    (index, newValue: string) => {
      setQueries((prev) => {
        if (newValue) {
          return prev.map((value, cur) =>
            index === cur ? {...value, parameter: newValue} : value,
          );
        }
        prev.splice(index, 1);
        return Array.from(prev);
      });
    },
    [queries],
  );

  return (
    <main className='w-full h-screen overflow-x-hidden absolute bg-gray-200'>
      <div className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
        <header className='flex flex-col min-[1080px]:flex-row justify-between mb-10'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 mb-2'>
            Contacts
          </h1>
          <SearchBox
            onSearch={() => {
              setLoading(true);
              setReload(true);
            }}
            queries={queries}
            defaultParameters={defaultQueryOptions}
            updateQueries={(
              indexToRemove: number,
              type: string,
              value: string,
            ) =>
              type === 'parameter'
                ? updateParameters(indexToRemove, value)
                : setQueries((prev) => {
                    if (!value) {
                      prev.splice(indexToRemove, 1);
                      return [...prev];
                    }
                    return prev.map((query, index) =>
                      index === indexToRemove ? {...query, value} : query,
                    );
                  })
            }
            addQuery={(parameter: string) =>
              setQueries((prev) => [{parameter, value: ''}, ...prev])
            }
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
            pageSize={10}
            components={{Toolbar: CustomContactToolBar}}
            componentsProps={{
              toolbar: {
                setShowPopUp: setContactPopUpIsOpen,
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

export const CustomContactToolBar = ({
  setShowPopUp,
  ...props
}: GridToolbarProps) => {
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
        className='bg-blue-500 px-4 py-2 disabled:gray-500 hover:bg-blue-600 hover:ring hover:ring-blue-300 hover:ring-offset-1 rounded-2xl m-1 shadow-xl text-white text-md'
        data-test-id='create-contact-button'
        disabled={false}
        onClick={() => setShowPopUp((prev) => !prev)}
      >
        Create Contact
      </button>
    </GridToolbarContainer>
  );
};

export default ContactGrid;
