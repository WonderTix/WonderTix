import React from 'react';
import Navigation from '../Navigation';
import TaskManager from './TaskManager';

const TasksMain: React.FC = (): React.ReactElement => {
  return (
    <div className='flex flex-row'>
      <TaskManager />
      <Navigation />
    </div>
  );
};

export default TasksMain;
