import React, {ReactElement} from 'react';

export interface LabelProps {
  children: Element | string,
  className?: string,
  color?: 'slate' | 'red' | 'green',
}

/**
 * A generic label descriptor.
 *
 * @param {LabelProps} props
 * @param {string} props.className
 * @param {'slate' | 'red' | 'green'} props.color
 * @param {Element | string} props.children
 * @returns {ReactElement} Label
 */
const Label = ({className, color = 'slate', children}: LabelProps): ReactElement => {
  return (
    <span className={`py-1 px-2 font-bold rounded-md shadow-md ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  );
};

const colorClasses = {
  slate: 'text-slate-800 bg-slate-200',
  red: 'text-red-800 bg-red-200',
  green: 'text-green-800 bg-green-200',
};

export default Label;
