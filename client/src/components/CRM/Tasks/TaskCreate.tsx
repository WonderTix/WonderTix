import React, {useState} from 'react';
import Navigation from '../Navigation';

const TaskCreate = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskSubject, setTaskSubject] = useState('');
  const [name, setName] = useState('');
  const [relatedTo, setRelatedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Not Started');
  const [comments, setComments] = useState('');

  const handleReset = () => {
    setTaskSubject('');
    setName('');
    setRelatedTo('');
    setDueDate('');
    setAssignedTo('');
    setStatus('Not Started');
    setPriority('Normal');
    setComments('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // submit animation

    const payload = {
      taskSubject,
      name,
      relatedTo,
      dueDate,
      assignedTo,
      status,
      priority,
      comments,
    };

    try {
      const response = await fetch('https://api-endpoint/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Task created successfully!');
        handleReset();
      } else {
        const data = await response.json();
        alert(`Error: ${data.message || 'An error occurred'}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // submit animation
    }
  };

  return (
    <div className='flex flex-row'>
      <Navigation/>
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className='md:ml-[16rem] md:mt-40 md:mr-40 sm:mt-[11rem]
         sm:mb-[11rem] mt-32'>
          <div className='flex flex-row'>
            <h1 className='font-bold text-5xl bg-clip-text text-transparent
             bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-14
             px-4'>
              New Task
            </h1>
          </div>

          {/* Form Input fields */}
          <div className="container md:max-w-xl max-w-full md:ml-4 ml-0
          min-w-[320px] md:mr-40 my-4"
          >
            <form
              className="bg-white border border-zinc-200 rounded-lg p-8
              shadow-lg text-sm md:text-md"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block font-bold text-gray-700">
                  Task Subject
                </label>
                <input
                  type="text"
                  value={taskSubject}
                  onChange={(e) => setTaskSubject(e.target.value)}
                  placeholder="Enter task subject"
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-700">
                  Related To
                </label>
                <input
                  type="text"
                  value={relatedTo}
                  onChange={(e) => setRelatedTo(e.target.value)}
                  placeholder="What's this task related to?"
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-700">
                  Assigned To
                </label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Assign to"
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-700">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-700">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option value="Not Started">Normal</option>
                  <option value="In Progress">Important</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-bold text-gray-700">
                  Comments
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add your comments here..."
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex justify-evenly mx-auto mt-8 w-75">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-300 font-medium p-2 w-40 rounded-md"
                > Reset
                </button>
                <button
                  type="submit"
                  className="bg-black text-white font-medium p-2 w-40 rounded-md
                  flex justify-center items-center"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.93813-2.647z"></path>
                    </svg>
                  ) : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
