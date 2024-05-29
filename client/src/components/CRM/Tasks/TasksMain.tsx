import React, {ReactElement} from 'react';
import AdminNavBar from '../AdminNavBar';
import Tasks from './Tasks';

/**
 * @returns {ReactElement} TasksMain - has Navigation
 * and Tasks to reroute to other components
 */
const TasksMain = (): ReactElement =>{
  return (
    <div className='flex flex-row'>
      <Tasks />
      <AdminNavBar />
    </div>
  );
};

export default TasksMain;
