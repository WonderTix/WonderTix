/* eslint-disable max-len */
import React, {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';

interface DashboardLinkProps {
  gradientClasses: string,
  icon: ReactElement,
  route?: string,
  size?: 'sm' | 'md' | 'lg',
  title: string,
}

/**
 * DashboardLink is the component to display large buttons in dashboards that
 * route to other pages.
 *
 * @param DashboardLinkProps
 * @param DashboardLinkProps.gradientClasses is a string of classes to style the DashboardLink gradient
 * @param DashboardLinkProps.icon is the <svg> element of the icon
 * @param DashboardLinkProps.route is the route in WonderTix to direct to on click
 * @param DashboardLinkProps.size is the size of the button to display
 * @param DashboardLinkProps.title is the name of the button to be displayed
 * @returns {ReactElement} DashboardLink
 */
const DashboardLink = ({
  gradientClasses,
  icon,
  route = '404',
  size = 'sm',
  title,
}: DashboardLinkProps): ReactElement => {
  const navigate = useNavigate();
  const buttonClasses = `flex text-left hover:scale-105 ${sizeClass[size]} md:w- transition duration-300 ease-in-out rounded-3xl shadow-xl ` + gradientClasses;

  return (
    <button
      onClick={() => navigate(route)}
      className={buttonClasses}
    >
      <div className="m-8 flex flex-col items-start">
        {icon}
        <h5 className="ml-1 text-2xl font-bold tracking-tight text-white">
          {title}
        </h5>
      </div>
    </button>
  );
};

const sizeClass = {
  sm: '',
  md: 'md:h-60',
  lg: 'md:h-80',
};

export default DashboardLink;
