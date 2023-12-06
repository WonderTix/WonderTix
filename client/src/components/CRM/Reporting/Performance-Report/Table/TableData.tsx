{/* import React from 'react';

const TableData = () => {
  // Data Handling
  const data = [
    {id: 1, name: 'Item 1', type: 'Ticket', ledgerCode: '123', totalInstances: 10, activeInstances: 5, sortOrder: 1, isActive: true},
    {id: 2, name: 'Item 2', type: 'Ticket', ledgerCode: '456', totalInstances: 8, activeInstances: 3, sortOrder: 2, isActive: false},
  ];

  const [tableData, setTableData] = useState(data);
  //

  const handleCheckboxChange = (id) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? {...item, isActive: !item.isActive} : item,
      ),
    );
  };

  return (
    <div className="table-container">
      <table>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.ledgerCode}</td>
              <td>{item.totalInstances}</td>
              <td>{item.activeInstances}</td>
              <td>{item.sortOrder}</td>
              <td>
                <input
                  type="checkbox"
                  checked={item.isActive}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
*/}
export {};
