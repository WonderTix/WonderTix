import React from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number | string;
}

const BackIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10 19l-7-7m0 0l7-7m-7 7h18'
      />
    </svg>
  );
};

const ChevronDown = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19 9l-7 7-7-7'
      />
    </svg>
  );
};

const ChevronLeft = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
    </svg>
  );
};

const ChevronRight = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
    </svg>
  );
};

const ChevronUp = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5 15l7-7 7 7'
      />
    </svg>
  );
};

const CircleCheckIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
};

const CircleIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      className={className}
    >
      <path
        fillRule='evenodd'
        d='m 21 12 a 9 9 0 1 1 -18 0 a 9 9 0 0 1 18 0 z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const CirclePlusIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      stroke='white'
      strokeWidth={strokeWidth}
      className={className}
    >
      <path
        fillRule='evenodd'
        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const CloneIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
      />
    </svg>
  );
};

const DecrementIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        fillRule='evenodd'
        d='M18 12H6'
        clipRule='evenodd'
      />
    </svg>
  );
};

const EditIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
      />
    </svg>
  );
};

const ExclamationCircleIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
};

const ExclamationIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='currentColor'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
      />
    </svg>
  );
};

const ForwardArrow = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M14 5l7 7m0 0l-7 7m7-7H3'
      />
    </svg>
  );
};

const HelpIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
};

const IncrementIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
      />
    </svg>
  );
};

const LoadingIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;

  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth={strokeWidth}
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
};

const PlusIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
      />
    </svg>
  );
};

const SaveIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
      />
    </svg>
  );
};

const SearchIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      />
    </svg>
  );
};

const SmallBackIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11 17l-5-5m0 0l5-5m-5 5h12'
      />
    </svg>
  );
};

const SmallMinusIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
    </svg>
  );
};

const TicketIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
      />
    </svg>
  );
};

const TrashCanIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
      />
    </svg>
  );
};

const UserIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      />
    </svg>
  );
};

const VerticalDotsIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        fillRule='evenodd'
        d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const XIcon = (props: IconProps) => {
  const {className = 'h-5 w-5', strokeWidth = 2} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export {
  BackIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheckIcon,
  CircleIcon,
  CirclePlusIcon,
  CloneIcon,
  DecrementIcon,
  EditIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  ForwardArrow,
  HelpIcon,
  IncrementIcon,
  LoadingIcon,
  PlusIcon,
  SaveIcon,
  SearchIcon,
  SmallBackIcon,
  SmallMinusIcon,
  TicketIcon,
  TrashCanIcon,
  UserIcon,
  VerticalDotsIcon,
  XIcon,
};
