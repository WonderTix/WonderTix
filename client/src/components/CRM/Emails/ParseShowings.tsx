import {UpdatedShowing} from '../../../interfaces/showing.interface';
import React, {useContext, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../Navigation';
import {useFetchToken} from '../../Ticketing/ticketingmanager/Event/components/ShowingUtils';
import './style.css'; // Import CSS file

interface EventContextType {
  eventID: number;
  setEventID: (value) => void;
  setEventData: (value) => void;
  eventData;
  ticketTypes: any[];
  loading: boolean;
  token: string;
  showingData: UpdatedShowing[];
  setReloadShowing: (value) => void;
  editing: boolean;
  setEditing: (value) => void;
  setShowPopUp: (value) => void;
}

export const EventContext = React.createContext<EventContextType>({
  eventID: undefined,
  setEventID: undefined,
  setEventData: undefined,
  eventData: undefined,
  ticketTypes: undefined,
  loading: true,
  token: undefined,
  showingData: undefined,
  setReloadShowing: undefined,
  editing: undefined,
  setEditing: undefined,
  setShowPopUp: undefined,
});

export const useEvent = () => {
  return useContext(EventContext);
};

type EventProviderParams = {
  eventid: string;
};

export const ParseShowing = () => {
  const navigate = useNavigate();
  const {token} = useFetchToken();

  const providedEventID = useParams<EventProviderParams>();
  const [eventID, setEventID] = useState(Number(providedEventID.eventid) ?? 0);
  const [eventDateTimeList, setEventDateTimeList] = useState([]); // State variable to store event dates and times

  // Inside component
  const [selectedTemplate, setSelectedTemplate] = useState(null); // State variable to store the selected template number

  // Function to handle the navigation and send POST request
  const handleNavigation = async (showing) => {
    if (selectedTemplate === null) {
      // If no template is selected, alert the user to choose one
      alert('Please select a template.');
    } else {
      // Create the data object to send in the POST request
      const postData = {
        eventID: eventID,
        date: showing.date,
        time: showing.time,
        template: selectedTemplate,
      };
      //
      console.log('POST REQUEST ABOUT TO SEND!');
      const apiUrl = process.env.REACT_APP_API_2_URL + '/emails';
      //
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        });
        //
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //
        const data = await response.json();
        // Handle the response data as needed
        console.log('Response from server:', data);
        // Optionally, you can perform any actions based on the response here
      } catch (error) {
        console.error('Error sending POST request:', error);
        // Handle errors here, e.g., show an error message to the user
      }
    }
  };


  const formatDate = (eventDate) => {
    // Convert eventDate to a string
    const dateString = eventDate.toString();
    // Ensure the string has at least 8 characters before proceeding
    if (dateString.length < 8) {
      console.error('Invalid eventDate:', eventDate);
      return ''; // Return an empty string or some default value if eventDate is invalid
    }
    // Extract year, month, and day
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    //
    // Return the formatted date string
    return `${year}-${month}-${day}`;
  };
  //
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_2_URL + '/events/showings/' + eventID;
    //
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const eventData = data;
        const eventDateTimeList = [];

        // Iterate over each event instance
        eventData.eventinstances.forEach(function(instance) {
            // Extract event date and time
            const eventDate = instance.eventdate;
            // const formattedDate = `${eventDate.substring(0, 4)}-${eventDate.substring(4, 6)}-${eventDate.substring(6, 8)}`;
            const eventTime = instance.eventtime;
            const parsedDate: Date = new Date(eventTime);
            const formattedTime: string = parsedDate.toLocaleString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});

            // Combine date and time and store it in the list
            eventDateTimeList.push({date: eventDate, time: formattedTime});
        });

        // Print the list of event dates and times
        // console.log(eventDateTimeList);
        setEventDateTimeList(eventDateTimeList);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error Fetching Data:', error);
      });
  }, []);


  return (
    <div className='flex flex-row'>
      <Navigation />
      <div className="w-full h-screen overflow-x-hidden absolute chooseShowing" style={{marginTop: '250px', marginLeft: '300px'}}>
        <h1
          className='col-span-2 min-[678px]:col-span-1 font-bold text-5xl bg-clip-text
          text-transparent bg-gradient-to-r from-cyan-500 to-blue-500'
        >
          Select Template
        </h1>
        <button className='button' onClick={() => setSelectedTemplate(1)}>Ticket Confirmation</button>
        <button className='button' onClick={() => setSelectedTemplate(2)}>Pre Event Reminder</button>
        <button className='button' onClick={() => setSelectedTemplate(3)}>Post Event Email</button>
        {/**/}
        <h1
          className='col-span-2 min-[678px]:col-span-1 font-bold text-5xl bg-clip-text
          text-transparent bg-gradient-to-r from-cyan-500 to-blue-500'
        >
          Select Showing
        </h1>
        <p className='eventID'>Event ID: {eventID}</p>
        {/* Map over the showingData array and create button for each showing */}
        {eventDateTimeList.map((showing, index) => (
          <button className='button' key={index} onClick={() => handleNavigation(showing)}>
            {`Date: ${formatDate(showing.date)}, Time: ${showing.time}`}
          </button>
        ))}
      </div>
    </div>
  );
};
