import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const GroupToggle = () => {
  const [filterAs, setFilter] = React.useState('Active');

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilterSetting: string,
  ) => {
    setFilter(newFilterSetting);
  };

  return (
    <ToggleButtonGroup
      color='standard'
      value={filterAs}
      exclusive
      onChange={handleFilterChange}
      aria-label='filterSetting'
    >
      <ToggleButton
        value='active'
        sx={{backgroundColor: 'white'}}
      >
        Active
      </ToggleButton>
      <ToggleButton
        value='inactive'
        sx={{backgroundColor: 'white'}}
      >
        Inactive
      </ToggleButton>
      <ToggleButton
        value='all'
        sx={{backgroundColor: 'white'}}
      >
        All
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default GroupToggle;
