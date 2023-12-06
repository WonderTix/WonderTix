import React, {useState, useEffect} from 'react';

const EventTable = () => {
  const [eventsData, setEventsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Simulating fetching data from an API or other source
  useEffect(() => {
    // Fetch data and update state
    const fetchData = async () => {
      try {
        // Replace this with your actual API call or data fetching logic
        const response = await fetch('https://api.example.com/events');
        const data = await response.json();
        setEventsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = eventsData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Event Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>General Ledger Code</th>
            <th>Total Instances</th>
            <th>Active Instances</th>
            <th>Sort Order</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.type}</td>
              <td>{event.generalLedgerCode}</td>
              <td>{event.totalInstances}</td>
              <td>{event.activeInstances}</td>
              <td>{event.sortOrder}</td>
              <td>{event.active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        {eventsData.length > itemsPerPage && (
          <ul>
            {Array.from({length: Math.ceil(eventsData.length / itemsPerPage)}, (_, index) => (
              <li key={index + 1}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventTable;
