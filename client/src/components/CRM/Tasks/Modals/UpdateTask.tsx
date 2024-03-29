import React, {useEffect, useState} from 'react';
import {TABLE_DATA, TableDataType} from '../Table/TableData';
import {ClosingX, SpinAnimation} from '../SVGIcons';

export interface UpdateTaskProps {
  task: TableDataType | null;
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: (updatedTask: TableDataType) => void;
}

const showToast = (message: string) => {
  alert(message);
};

const UpdateTask: React.FC<UpdateTaskProps> = ({
  task,
  onCancel,
  onSubmit,
  isVisible,
}: UpdateTaskProps): React.ReactElement | null => {
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [emailTo, setemailTo] = useState(task.email);
  const [relatedTo, setRelatedTo] = useState(task.relatedTo);
  const [subject, setSubject] = useState(task.subject);
  const [contact, setContact] = useState(task.contact);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(() => task.priority);
  const [status, setStatus] = useState(() => task.status);
  const [comments, setComments] = useState(task.comments);
  const [isLoading, setIsLoading] = useState(false);

  if (!isVisible || !task) {
    return null;
  }

  useEffect(() => {
    setAssignedTo(task.assignedTo);
    setemailTo(task.email);
    setRelatedTo(task.relatedTo);
    setSubject(task.subject);
    setContact(task.contact);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setStatus(task.status);
    setComments(task.comments);
  }, [task]);


  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsLoading(true);

    const updatedTask: TableDataType = {
      ...task,
      assignedTo: assignedTo,
      email: emailTo,
      relatedTo: relatedTo,
      subject: subject,
      contact: contact,
      dueDate: new Date(dueDate),
      priority: priority as TableDataType['priority'],
      status: status as TableDataType['status'],
      comments: comments as TableDataType['comments'],
    };

    setTimeout(() => {
      setIsLoading(false);
      showToast('Task updated successfully!');

      if (onSubmit) onSubmit(updatedTask);
      TABLE_DATA.push(updatedTask);
    }, 1000);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setAssignedTo(task.assignedTo);
    setemailTo(task.email);
    setRelatedTo(task.relatedTo);
    setSubject(task.subject);
    setContact(task.contact);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setStatus(task.status);
    setComments(task.comments);
  };

  const formatDate = (date: Date): string => {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className='bg-white rounded-md shadow-lg p-5 ml-48'>
      <div className='flex flex-row justify-end'>
        <button
          type='button'
          title='Close'
          aria-label='Close'
          onClick={onCancel}
          className='rounded p-1
            hover:outline hover:outline-gray-300 active:bg-slate-100'
        >
          <ClosingX size='4' />
        </button>
      </div>
      <h1 className='mb-8
        text-center text-6xl bg-clip-text text-transparent tracking-tight
        bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
      >
        Update Task
      </h1>

      <form
        onReset={handleReset}
        onSubmit={handleSubmit}
        className='bg-white text-[15px] tracking-tight group'
      >
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
            value={formatDate(dueDate)}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split('-').map(
                (str) => parseInt(str, 10));
              setDueDate(new Date(year, month - 1, day));
            }}
            className='mt-1 p-1.5 w-full border rounded-md text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic'
            aria-required='true' required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='priority' className='block font-semibold'>
            Task Priority
          </label>
          <select
            id='priority'
            name='priority'
            value={priority}
            onChange={(e) => setPriority(e.target.value as TableDataType['priority'])}
            className='mt-1 p-1.5 w-full border rounded-md text-sm'
          >
            <option value='Normal'>Normal</option>
            <option value='Important'>Important</option>
          </select>
        </div>
        <div className='mb-4'>
          <label htmlFor='status' className='block font-semibold'>
            Task Status
          </label>
          <select
            id='status'
            name='status'
            value={status}
            onChange={(e) => setStatus(e.target.value as TableDataType['status'])}
            className='mt-1 p-1.5 w-full border rounded-md text-sm'
          >
            <option value='Pending'>Pending</option>
            <option value='Started'>Started</option>
            <option value='Completed'>Completed</option>
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
            onChange={(e) => setComments(e.target.value as TableDataType['comments'])}
            className='mt-1 p-1.5 w-full border rounded-md text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic'
          ></textarea>
        </div>
        <div className='flex justify-evenly mx-auto mt-8 mb-4 gap-4'>
          <button
            type='reset'
            title='Reset Form'
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
            group-invalid:cursor-not-allowed  group-invalid:opacity-50
            shadow shadow-gray-500 hover:shadow-inner active:opacity-75
            bg-gradient-to-t from-black to-gray-800 hover:bg-gradient-to-b
            active:ring-2 active:ring-black group-invalid:ring-0'
          >
            {isLoading ? <SpinAnimation /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
