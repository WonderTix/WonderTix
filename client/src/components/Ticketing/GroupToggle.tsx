import React, {useState, MouseEvent} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ShowingActivenessToggle =(defaultValue) => {
  const [filter, setFilter] = useState(defaultValue);

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilterSetting: string,
  ) => {
    setFilter(newFilterSetting);
  };

  return (
    <div className='mb-6'>
      <ToggleButtonGroup
        color='standard'
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label='Activeness Toggle Filter'
      >
        <ToggleButton
          value='active'
          sx={{backgroundColor: 'white', fontWeight: 'bold'}}
        >
          Active
        </ToggleButton>
        <ToggleButton
          value='inactive'
          sx={{backgroundColor: 'white', fontWeight: 'bold'}}
        >
          Inactive
        </ToggleButton>
        <ToggleButton
          value='all'
          sx={{backgroundColor: 'white', fontWeight: 'bold'}}
        >
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ShowingActivenessToggle;

