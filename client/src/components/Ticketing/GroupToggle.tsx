import React, {useState, MouseEvent} from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ShowingActivenessToggle = ({
  defaultValue,
  handleFilterChange,
  showInactiveToggle = true,
}) => {
  const [filter, setFilter] = useState(defaultValue);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newFilterSetting: string,
  ) => {
    setFilter(newFilterSetting);
    if (handleFilterChange) {
      handleFilterChange(newFilterSetting);
    }
  };

  return (
    <div className='mb-6'>
      <ToggleButtonGroup
        color='standard'
        value={filter}
        exclusive
        onChange={handleChange}
        aria-label='Activeness Toggle Filter'
        sx={{backgroundColor: 'white'}}
      >
        <ToggleButton
          value='active'
          sx={{fontWeight: 'bold'}}
        >
          Active
        </ToggleButton>
        {showInactiveToggle && (
          <ToggleButton
            value='inactive'
            sx={{fontWeight: 'bold'}}
          >
            Inactive
          </ToggleButton>
        )}
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
  showInactiveToggle: PropTypes.bool,
};

export default ShowingActivenessToggle;
