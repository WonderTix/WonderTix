import React, {useState} from 'react';
import {ClosingX, SpinAnimation} from '../SVGIcons';
import {TableDataType, TABLE_DATA} from '../Table/TableData';

export interface CreateTaskProps {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: (createTask: TableDataType) => void;
}

const showToast = (message: string) => {
  alert(message);
};

const CreateTask: React.FC<CreateTaskProps> = ({
  onCancel,
  onSubmit,
  isVisible,
}: CreateTaskProps): React.ReactElement | null => {
  const [taskId, setTaskId] = useState(
    Math.max(...TABLE_DATA.map((task) => task.id), 0) + 1,
  );
  const [assignedTo, setAssignedTo] = useState('');
  const [emailTo, setemailTo] = useState('');
  const [relatedTo, setRelatedTo] = useState('');
  const [subject, setSubject] = useState('');
  const [contact, setContact] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString());
  const [priority, setPriority] = useState('Normal');
  const [status, setStatus] = useState('Pending');
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isVisible) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsLoading(true);

    const createTask: TableDataType = {
      id: taskId,
      assignedTo: assignedTo,
      email: emailTo,
      relatedTo: relatedTo,
      subject: subject,
      contact: contact,
      dueDate: new Date(dueDate),
      priority: priority as TableDataType['priority'],
      status: status as TableDataType['status'],
      comments: comments as TableDataType['comments'],
      contactEmail: 'contact@tix.com',
      contactPhone: '(957) 123-9876',
      contactMobile: '(975) 987-4321',
    };

    setTimeout(() => {
      setIsLoading(false);
      showToast('Task created successfully!');

      if (onSubmit) onSubmit(createTask);
      TABLE_DATA.push(createTask);
    }, 1000);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setTaskId(TABLE_DATA.length);
    setAssignedTo('');
    setemailTo('');
    setRelatedTo('');
    setSubject('');
    setContact('');
    setDueDate(new Date().toISOString());
    setPriority('Normal');
    setStatus('Pending');
    setComments('');
  };

  return (
    <div className='bg-black bg-opacity-50 flex justify-center items-center
      fixed top-0 right-0 bottom-0 left-0 z-20 antialiased'
    >
      <div className='bg-white rounded-md shadow-lg p-5'>
        <button
          type='button'
          title='Close'
          aria-label='Close'
          onClick={onCancel}
          className='rounded hover:outline hover:outline-gray-300 p-1'
        >
          <ClosingX size='4' />
        </button>
        <h1 className='text-center text-6xl bg-clip-text text-transparent
          bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 pb-8'
        >
          Create Task
        </h1>

        <form onSubmit={handleSubmit} className='bg-white text-[15px] tracking-tight group'>
          <div className='mb-4'>
            <label htmlFor='AssignTo' className='block font-semibold'>
              Assignee Name
            </label>
            <input
              type='text'
              id='AssignTo'
              name='AssignTo'
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder='Assign to' pattern='.{3,}$'
              className='mt-1 p-1.5 w-full border rounded-md text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic peer
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
              aria-describedby='assignee-name' aria-required='true' required
            />
            <span id='assignee-name'
              className='mt-2 hidden text-xs font-semibold text-red-500
              peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
            >
              * Please provide the assignee&#39;s fullname (at least 3 characters).
            </span>
          </div>
          <div className='mb-4'>
            <label htmlFor='emailTo' className='block font-semibold'>
              Assignee Email
            </label>
            <input
              type='email'
              id='emailTo'
              name='emailTo'
              value={emailTo}
              onChange={(e) => setemailTo(e.target.value)}
              placeholder='Assignee@WonderTix.com'
              pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
              className='mt-1 p-1.5 w-full border rounded-md text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic peer
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
              aria-describedby='assignee-email' aria-required='true' required
            />
            <span
              id='assignee-email'
              className='mt-2 hidden text-xs font-semibold text-red-500
              peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
            >
              * Please provide a valid email address.
            </span>
          </div>
          <div className='mb-4'>
            <label htmlFor='subject' className='block font-semibold'>
              Task Subject
            </label>
            <input
              type='text'
              id='subject'
              name='subject'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder='Enter task subject' pattern='.{3,}$'
              className='mt-1 p-1.5 w-full border rounded-md text-sm
                bg-slate-50 placeholder-gray-400 placeholder:italic peer
                invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
              aria-describedby='subject-description' aria-required='true' required
            />
            <span id='subject-description'
              className='mt-2 hidden text-xs font-semibold text-red-500
              peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
            >
              * Please provide a task subject (at least 3 characters).
            </span>
          </div>
          <div className='mb-4'>
            <label htmlFor='relatedTo' className='block font-semibold'>
              Related To
            </label>
            <input
              type='text'
              id='relatedTo'
              name='relatedTo'
              value={relatedTo}
              onChange={(e) => setRelatedTo(e.target.value)}
              placeholder='Enter task relation?' pattern='.{3,}$'
              className='mt-1 p-1.5 w-full border rounded-md text-sm
                bg-slate-50 placeholder-gray-400 placeholder:italic peer
                invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
              aria-describedby='task-relation' aria-required='true' required
            />
            <span id='task-relation'
              className='mt-2 hidden text-xs font-semibold text-red-500
              peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
            >
              * Please provide a task relation (at least 3 characters).
            </span>
          </div>
          <div className='mb-4'>
            <label htmlFor='contact' className='block font-semibold'>
              Contact Name
            </label>
            <input
              type='text'
              id='contact'
              name='contact'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder='Full Name' pattern='^[a-zA-Z\s.]{3,}$'
              className='mt-1 p-1.5 w-full border rounded-md text-sm
                bg-slate-50 placeholder-gray-400 placeholder:italic peer
                invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
              aria-describedby='contact-name' aria-required='true' required
            />
            <span id='contact-name'
              className='mt-2 hidden text-xs font-semibold text-red-500
              peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
            >
              * Please provide the contact&#39;s fullname (at least 3 characters).
            </span>
          </div>
          <div className='mb-4'>
            <label htmlFor='dueDate' className='block font-semibold'>
              Due Date
            </label>
            <input
              type='date'
              id='dueDate'
              name='dueDate'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className='mt-1 p-1.5 w-full border rounded-md text-sm
                bg-slate-50 placeholder-gray-400 placeholder:italic'
              aria-required='true'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='status' className='block font-semibold'>
              Task Status
            </label>
            <select
              id='status'
              name='status'
              value={status}
              onChange={(e) => setStatus(
                e.target.value as TableDataType['status'])}
              className='mt-1 p-1.5 border rounded-md w-full text-sm'
            >
              <option value='Pending'>Pending</option>
              <option value='Started'>Started</option>
              <option value='Done'>Done</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='priority' className='block font-semibold'>
              Task Priority
            </label>
            <select
              id='priority'
              name='priority'
              value={priority}
              onChange={(e) => setPriority(
                e.target.value as TableDataType['priority'])}
              className='mt-1 p-1.5 border rounded-md w-full text-sm'
            >
              <option value='Normal'>Normal</option>
              <option value='Important'>Important</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='comments' className='block font-semibold'>
              Comments
            </label>
            <textarea
              id='comments'
              name='comments'
              value={comments}
              placeholder='Add your comments here...'
              onChange={(e) => setComments(e.target.value)}
              className='mt-1 p-1.5 border rounded-md w-full text-sm
                bg-slate-50 placeholder-gray-400 placeholder:italic'
            ></textarea>
          </div>
          <div className='flex justify-evenly mx-auto mt-8 mb-4 gap-4'>
            <button
              type='reset'
              title='Reset Form'
              onClick={handleReset}
              className='py-2.5 px-6 w-48
                flex justify-center items-center rounded
                font-bold text-sm text-center text-gray-900 uppercase
                shadow shadow-gray-500 hover:shadow-inner active:opacity-75
                bg-gradient-to-t from-gray-500/50 to-gray-300 hover:bg-gradient-to-b
                active:ring-2 active:ring-gray-500'
            >
              Reset
            </button>
            <button
              type='submit'
              title='Submit Task'
              className='py-2.5 px-6 w-48
                flex justify-center items-center rounded uppercase
                bg-black font-bold text-sm text-center text-white
                group-invalid:cursor-not-allowed group-invalid:opacity-50
                shadow shadow-gray-500 hover:shadow-inner active:opacity-75
                bg-gradient-to-t from-black to-gray-800 hover:bg-gradient-to-b
                active:ring-2 active:ring-black group-invalid:ring-0'
            >
              {isLoading ? <SpinAnimation /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
