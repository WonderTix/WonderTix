import React, {useState} from 'react';
import {TableDataType} from '../Table/TableData';
import {useAuth0} from '@auth0/auth0-react';
import {taskPriority} from '../TaskManager';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClosingX,
} from '../SVGIcons';

type DetailsTaskProps = {
  isVisible: boolean;
  task: TableDataType | null;
  onCancel: () => void;
};

const DetailTask: React.FC<DetailsTaskProps> = ({isVisible, task, onCancel}) => {
  const {user} = useAuth0();
  const {picture} = user;
  const [sectionsVisibility, setSectionsVisibility] = useState({
    assignment: true,
    additional: true,
    system: true,
  });

  const toggleSectionVisibility = (section: string) => {
    setSectionsVisibility((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  if (!isVisible || !task) return null;

  return (
    <div className='bg-white rounded-md p-5 w-[768px] md:ml:48 lg:ml-48'>
      <div className='flex flex-row justify-end'>
        <button
          type='button'
          title='Close'
          aria-label='Close'
          onClick={onCancel}
          className='rounded hover:outline hover:outline-gray-300
          active:bg-slate-100 p-1'
        >
          <ClosingX size='4' />
        </button>
      </div>
      <h1 className='text-6xl bg-clip-text text-transparent pb-3
        bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300
        tracking-tight'
      >
        Task Details
      </h1>
      <h2 className=' font-medium border-b pb-4'><b>Subject:</b> {task.subject}</h2>
      <div className=''>
        <button
          onClick={() => toggleSectionVisibility('assignment')}
          className='bg-gray-200 w-full mt-5'
        >
          <div className='flex flex-row justify-start items-center ml-2 gap-2 font-medium'>
            Assignment Information
            {sectionsVisibility.assignment ?
              <ChevronUpIcon size='4' /> :
              <ChevronDownIcon size='4' />
            }
          </div>
        </button>
        {sectionsVisibility.assignment && (
          <div className='flex flex-row justify-between'>
            <ul className='flex flex-col text-sm w-96'>
              <li className='border-b py-2'>
                <div className="flex flex-row ml-4">
                  <img src={picture} alt="Profile" className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col indent-2">
                    <span className="text-base"> {task.assignedTo} </span>
                    <span className="text-xs text-gray-800"> {task.email} </span>
                  </div>
                </div>
              </li>
              <li className='border-b py-2 indent-4'><b>Related To:</b> {task.relatedTo}</li>
              <li className='border-b py-2 indent-4'><b>Due Date:</b> {task.dueDate.toLocaleDateString()}</li>
              <li className='border-b py-2 pl-4'><b>Comments:</b> {task.comments}</li>
            </ul>
            <ul className='flex flex-col w-96 text-sm'>
              <li className='border-b py-2'>
                <div className="flex flex-row ml-4">
                  <img src={picture} alt="Profile" className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col indent-2">
                    <span className="text-base"> {task.contact} </span>
                    <span className="text-xs text-gray-800"> {task.contactEmail} </span>
                  </div>
                </div>
              </li>
              <li className='border-b py-2 indent-4'><b>Phone: </b>{task.contactPhone}</li>
              <li className='border-b py-2 indent-4'><b>Mobile: </b>{task.contactMobile}</li>
              <li className='border-b py-2 indent-4'><b>Donations: </b> </li>
            </ul>
          </div>
        )}

        <button
          onClick={() => toggleSectionVisibility('additional')}
          className='bg-gray-200 w-full mt-5'
        >
          <div className='flex flex-row justify-start items-center ml-2 gap-2 font-medium'>
            Additional Information
            {sectionsVisibility.additional ?
              <ChevronUpIcon size='4' /> :
              <ChevronDownIcon size='4' />
            }
          </div>
        </button>
        {sectionsVisibility.additional && (
          <div className=''>
            <ul className='text-sm'>
              <li className='border-b py-2 flex text-center items-center'>
                <b className='indent-4'>Priority: </b>
                <span className='mx-1'>{task.priority}</span>
                <span className='indent-1'>
                  {task.priority === 'Important' && taskPriority(task.priority)}
                </span>
              </li>
              <li className='border-b py-2 indent-4'>
                <b>Status: </b> {task.status}</li>
            </ul>
          </div>
        )}

        <button
          onClick={() => toggleSectionVisibility('system')}
          className='bg-gray-200 w-full mt-5'
        >
          <div className='flex flex-row justify-start items-center ml-2 gap-2 font-medium'>
            System Information
            {sectionsVisibility.system ?
              <ChevronUpIcon size='4' /> :
              <ChevronDownIcon size='4' />
            }
          </div>
        </button>
        {sectionsVisibility.system && (
          <div className='flex flex-row justify-between indent-4'>
            <ul className='flex flex-col w-96 pt-2'>
              <li>
                <div className="flex flex-col">
                  <span className="text-sm gap-2 py-1">
                    <b>Created By:</b> {task.assignedTo}
                  </span>
                  <span className="text-sm gap-2">
                    <b>Created On:</b> {task.dueDate.toLocaleDateString()}
                  </span>
                </div>
              </li>
            </ul>
            <ul className='flex flex-col w-96'>
              <li>
                <div className="flex flex-col pt-2">
                  <span className="text-sm gap-2 py-1">
                    <b>Last Modified By:</b> {task.assignedTo}
                  </span>
                  <span className="text-sm gap-2">
                    <b>Last Modified On:</b> {task.dueDate.toLocaleDateString()}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailTask;
