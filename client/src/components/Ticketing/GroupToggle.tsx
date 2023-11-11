import React, {useState, MouseEvent} from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ShowingActivenessToggle =(props) => {
  const [filter, setFilter] = useState(props.defaultValue);

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilterSetting: string,
  ) => {
    setFilter(newFilterSetting);
    if (props.handleFilterChange) {
      props.handleFilterChange(newFilterSetting);
    }
  };

  return (
    <div className='mb-6'>
      <ToggleButtonGroup
        color='standard'
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label='Activeness Toggle Filter'
        sx={{backgroundColor: 'white'}}
      >
        <ToggleButton
          value='active'
          sx={{fontWeight: 'bold'}}
        >
          Active
        </ToggleButton>
        <ToggleButton
          value='inactive'
          sx={{fontWeight: 'bold'}}
        >
          Inactive
        </ToggleButton>
        <ToggleButton
          value='all'
          sx={{fontWeight: 'bold'}}
        >
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

ShowingActivenessToggle.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func,
};

export default ShowingActivenessToggle;

