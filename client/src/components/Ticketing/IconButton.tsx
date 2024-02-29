import React, {ReactElement} from 'react';
import {Tooltip} from '@mui/material';

interface IconButtonProps {
  children: ReactElement;
  hoverColor?: 'grey' | 'red' | 'green';
  onClick: () => any;
  tooltip?: string;
}

/**
 * A reusable button component to easily display icon-only buttons with or
 * without tooltips.
 *
 * @param {ReactElement} children is the icon that goes within the button
 * @param {'grey' | 'red' | 'green'} hoverColor is the color when it is focused or hovered
 * @param {func} onClick is the function that is called when the button is clicked
 * @param {string} tooltip is the text that is displayed 0.5 seconds after the button is hovered
 * @returns {ReactElement} IconButton
 */
const IconButton = ({
  children,
  hoverColor = 'grey',
  onClick,
  tooltip,
}: IconButtonProps): ReactElement => {
  return (
    <Tooltip arrow enterDelay={500} placement='top' title={tooltip}>
      <button
        className={`p-2 rounded-lg text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses[hoverColor]}`}
        onClick={onClick}
      >
        {children}
      </button>
    </Tooltip>
  );
};

const colorClasses = {
  grey: 'hover:text-zinc-600 hover:bg-zinc-100 focus:ring-indigo-500',
  red: 'hover:text-red-600 hover:bg-red-100 focus:ring-red-500',
  green: 'hover:text-emerald-700 hover:bg-emerald-100 focus:ring-emerald-500',
};

export default IconButton;
