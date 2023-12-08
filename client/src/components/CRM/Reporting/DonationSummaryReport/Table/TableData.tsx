import React from 'react';
import PropTypes from 'prop-types';

const TableData = ({primGrouping, secGrouping, groupByRecordType}) => {
  const recordType = [
    {
      title: 'Donation',
      origins: [
        {
          title: 'Back Office',
          data: [
            {campaign: 'EOY22: BGD #99 Saturday Market', amount: 5},
            {campaign: 'EOY22: BGD #250 Whatever', amount: 10},
          ],
        },
        {
          title: 'EOY22: Other Gifts',
          data: [
            {campaign: 'Campaign 1', amount: 5},
            {campaign: 'Campaign 2', amount: 10},
          ],
        },
        // Add more Donation Origins for this Record Type
      ],
    },
    {
      title: 'Grant',
      origins: [
        {
          title: 'Online: Mobile Donation',
          data: [
            {campaign: 'Campaign 1', amount: 5},
            {campaign: 'Campaign 2', amount: 10},
          ],
        },
      ],
    },
  ];

  return (
    <div className='px-2 lg:px-2'>
      {recordType.map((recordType, recordIndex) => (
        <div key={recordIndex}>
          {groupByRecordType == 'Yes' && (
            <h1 className='text-2xl font-bold mb-4 mt-4 px-4'>
              {recordType.title}
            </h1>
          )}
          {recordType.origins.map((origin, originIndex) => {
            const grossTotal = origin.data.reduce(
              (acc, curr) => acc + curr.amount,
              0,
            );
            return (
              <div key={originIndex} className='mb-3 mt-3'>
                <table className='min-w-full border-collapse bg-gray-100 border border-gray-300'>
                  <thead>
                    {(secGrouping == 'Donation Origin' ||
                      primGrouping == 'Donation Origin') && (
                      <tr>
                        <th
                          colSpan={2}
                          className='text-xl font-semibold py-2 px-4 text-left border-b border-gray-300'
                        >
                          {origin.title}
                        </th>
                      </tr>
                    )}
                    {(secGrouping == 'Campaign' ||
                      primGrouping == 'Campaign') && (
                      <tr>
                        <th className='border px-4 py-2 text-left border-gray-300'>
                          Campaigns
                        </th>
                        <th className='border px-4 py-2 text-left border-gray-300'>
                          Amount
                        </th>
                      </tr>
                    )}
                  </thead>

                  <tbody>
                    {(secGrouping == 'Campaign' ||
                      primGrouping == 'Campaign') &&
                      origin.data.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td className='border px-4 py-2 text-left border-gray-300'>
                            {item.campaign}
                          </td>
                          <td className='border px-4 py-2 text-left border-gray-300'>
                            ${item.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    <tr className='font-bold'>
                      <td className='border px-4 py-2 text-left border-gray-300'>
                        GROSS TOTAL
                      </td>
                      <td className='border px-4 py-2 text-left border-gray-300'>
                        ${grossTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

TableData.propTypes = {
  primGrouping: PropTypes.string.isRequired,
  secGrouping: PropTypes.string.isRequired,
  groupByRecordType: PropTypes.string.isRequired,
};

export default TableData;
