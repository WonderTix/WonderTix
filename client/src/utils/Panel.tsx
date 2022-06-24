import React from 'react';
import {Box} from '@mui/material';

/**
 * @param {any} props
 * @return {React.ReactElement} HTML Element for Panel
 */
const Panel = (props: any): React.ReactElement => {
  const {children, value, index, ...other} = props;
  return (
    <div
      role="panel"
      hidden={value !== index}
      id={`panel-${index}`}
      aria-labelledby={`panel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={
          {borderTop: '1px solid lightgray',
            mt: 2,
            pt: 2,
          }}
        >{children}</Box>
      )}
    </div>
  );
};

export default Panel;
