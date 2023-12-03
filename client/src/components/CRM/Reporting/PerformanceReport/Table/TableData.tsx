import React from 'react';
import PropTypes from 'prop-types';

const TableData = ({eevent, EventInstances, groupedBy}) => {
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
    <div>
    </div>
  );
};

TableData.propTypes = {
  eevent: PropTypes.string.isRequired,
  EventInstances: PropTypes.string.isRequired,
  groupedBy: PropTypes.string.isRequired,
};

export default TableData;
