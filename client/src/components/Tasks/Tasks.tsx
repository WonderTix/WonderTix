import React from 'react';
import TaskForm from './TaskForm';

/**
 * @return {React.ReactElement} React element representing task form
 */
const Tasks = (): React.ReactElement => {
  return (
    <div className='p-8'>
      <TaskForm/>
    </div>
  );
};

export default Tasks;
