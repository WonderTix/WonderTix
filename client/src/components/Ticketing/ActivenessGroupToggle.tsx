import React, {useState, MouseEvent} from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ActivenessGroupToggle = ({
  defaultValue,
  handleFilterChange,
  showInactiveToggle = true,
  className = 'mb-6',
}) => {
  const [filter, setFilter] = useState(defaultValue);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newFilterSetting: string,
  ) => {
    if (newFilterSetting !== null) {
      setFilter(newFilterSetting);

      if (handleFilterChange) {
        handleFilterChange(newFilterSetting);
      }
    }
  };

  return (
    <div className={className}>
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
          data-testid='active-button'
        >
          Active
        </ToggleButton>
        {showInactiveToggle && (
          <ToggleButton
            value='inactive'
            sx={{fontWeight: 'bold'}}
            data-testid='inactive-button'
          >
            Inactive
          </ToggleButton>
        )}
        <ToggleButton
          value='all'
          sx={{fontWeight: 'bold'}}
          data-testid='all-button'
        >
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

ActivenessGroupToggle.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func,
  showInactiveToggle: PropTypes.bool,
  className: PropTypes.string,
};

export default ActivenessGroupToggle;
