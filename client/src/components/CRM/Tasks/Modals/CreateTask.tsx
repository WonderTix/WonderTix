import React, {useState} from 'react';
import {ClosingX, SpinAnimation} from '../SVGIcons';
import {TableDataType, TABLE_DATA} from '../Table/TableData';

interface CreateTaskProps {
  isVisible: boolean;
  onCancel: () => void;
  onSubmit: (createTask: TableDataType) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  onCancel,
  onSubmit,
  isVisible,
}: CreateTaskProps): React.ReactElement | null => {
  const [taskId, setTaskId] = useState(0);
  const [assignedTo, setAssignedTo] = useState('');
  const [emailTo, setemailTo] = useState('');
  const [relatedTo, setRelatedTo] = useState('');
  const [subject, setSubject] = useState('');
  const [contact, setContact] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString());
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Normal');
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState('');

  if (!isVisible) {
    return null;
  }

  const validateForm = (): boolean => {
    const fields = [
      {value: relatedTo, label: 'Related To'},
      {value: assignedTo, label: 'Assigned To'},
      {value: emailTo, label: 'Assignee Email'},
      {value: subject, label: 'Task Subject'},
      {value: contact, label: 'Contact'},
      {value: dueDate, label: 'Due Date'},
      {value: status, label: 'Task Status'},
      {value: priority, label: 'Task Priority'},
    ];

    const errorFields = fields
      .filter((field) => !field.value)
      .map((field) => field.label);

    if (errorFields.length) {
      setErrors(`Missing fields: *${errorFields.join(', *')}`);
      return false;
    }
    setErrors('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const uniqueId = Math.max(...TABLE_DATA.map((task) => task.id), 0) + 1;

    const createTask: TableDataType = {
      id: uniqueId,
      assignedTo: assignedTo,
      email: emailTo,
      relatedTo: relatedTo,
      subject: subject,
      contact: contact,
      dueDate: new Date(dueDate),
      status: status as TableDataType['status'],
      priority: priority === 'Important' ? 'Important' : undefined,
      comments: comments,
    };
    if (onSubmit) onSubmit(createTask);
  };

  const handleReset = (): void => {
    setTaskId(TABLE_DATA.length);
    setAssignedTo('');
    setemailTo('');
    setRelatedTo('');
    setSubject('');
    setContact('');
    setDueDate(new Date().toISOString());
    setStatus('Pending');
    setPriority('Normal');
    setComments('');
    setErrors('');
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

        <form
          id='taskForm'
          onSubmit={handleSubmit}
          aria-describedby='formErrors'
          className='bg-white text-[15px] tracking-tight'
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
              placeholder='Assign to'
              onChange={(e) => setAssignedTo(e.target.value)}
              className='mt-1 p-1.5 border rounded-md w-full text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic'
              aria-required='true'
            />
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
              placeholder='Assignee@WonderTix.com'
              onChange={(e) => setemailTo(e.target.value)}
              className='mt-1 p-1.5 border rounded-md w-full text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic'
              aria-required='true'
            />
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
              placeholder='Enter task subject'
              onChange={(e) => setSubject(e.target.value)}
              className='mt-1 p-1.5 border rounded-md w-full text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic'
              aria-required='true'
            />
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
              placeholder="What's this task related to?"
              onChange={(e) => setRelatedTo(e.target.value)}
              className='mt-1 p-1.5 border rounded-md w-full text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic'
              aria-required='true'
            />
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
              placeholder='Enter name'
              onChange={(e) => setContact(e.target.value)}
              className='mt-1 p-1.5 border rounded-md w-full text-sm
              bg-slate-50 placeholder-gray-400 placeholder:italic'
              aria-required='true'
            />
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
              className='mt-1 p-1.5 border rounded-md w-full text-sm
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

          {errors && (
            <p id='formErrors' className='text-red-500 mt-2 max-w-sm'>
              {errors}
            </p>
          )}

          {/* Form Buttons */}
          <div className='flex justify-evenly mx-auto mt-8 mb-4 gap-4'>
            <button
              type='reset'
              title='Reset Form'
              onClick={handleReset}
              className='rounded py-2.5 px-6 w-48 uppercase
                font-bold text-center text-gray-900 text-sm
                bg-gradient-to-t from-gray-500/50 to-gray-300
                hover:bg-gradient-to-b hover:shadow-inner
                shadow shadow-gray-500 active:opacity-75'
            >
              Reset
            </button>
            <button
              type='submit'
              title='Submit Task'
              onClick={handleSubmit}
              className='flex justify-center items-center
                rounded py-2.5 px-6 w-48 uppercase bg-black
                font-bold text-center text-white text-sm
                bg-gradient-to-t from-black to-gray-800
                hover:bg-gradient-to-b hover:shadow-inner
                shadow shadow-gray-500 active:opacity-75'
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