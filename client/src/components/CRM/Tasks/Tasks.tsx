import React from 'react';
import TaskForm from './TaskForm';

/**
 * @returns {React.ReactElement} React element representing task form
 */
const Tasks = (): React.ReactElement => {
  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div className=' md:ml-[18rem] md:mt-40 md:mr-40
         sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <TaskForm/>
      </div>
    </div>
  );
};

export default Tasks;
