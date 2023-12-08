/* eslint-disable max-len */
import React, {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';

interface ListLinkProps {
  gradientClasses: string;
  icon: ReactElement;
  route?: string;
  size?: 'sm' | 'md' | 'lg';
  title: string;
  disabled?: boolean;
  description?: string;
}

/**
 * DashboardLink is the component to display large buttons in dashboards that
 * route to other pages.
 *
 * @param ListLinkProps
 * @param ListLinkProps.gradientClasses is a string of classes to style the DashboardLink gradient
 * @param ListLinkProps.icon is the <svg> element of the icon
 * @param ListLinkProps.route is the route in WonderTix to direct to on click
 * @param ListLinkProps.size is the size of the button to display
 * @param ListLinkProps.title is the name of the button to be displayed
 * @param ListLinkProps.disabled is the button to be clickable or not
 * @param ListLinkProps.description
 * @returns {ReactElement} DashboardLink
 */
const ListLink = ({
  gradientClasses,
  icon,
  route = '404',
  size = 'sm',
  title,
  disabled,
  description,
}: ListLinkProps): ReactElement => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!disabled) {
      // Allow click only if not disabled
      window.location.href = route;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex text-left flex-col p-8 ${
        sizeClass[size]
      } md:w- rounded-3xl shadow-xl transition duration-300 ease-in-out ${gradientClasses} ${
        disabled ? '' : 'hover:scale-105'
      } ${disabled ? 'cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {icon}
      <h5 className='ml-1 text-2xl font-bold tracking-tight text-white'>
        {title}
      </h5>
      <h6 className='ml-8 mt-8 text-white'>{description}</h6>
    </button>
  );
};

const sizeClass = {
  sm: '',
  md: 'md:h-60',
  lg: 'md:h-80',
};

export default ListLink;
