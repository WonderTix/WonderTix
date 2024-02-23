import React, {ReactElement} from 'react';
import Navigation from '../Navigation';
import Tasks from './Tasks';

/**
 * @returns {object} TasksMain - has Navigation
 *  and Tasks to reroute to other components
 */
const TasksMain = (): ReactElement =>{
  return (
    <div className='flex flex-row'>
      <Tasks/>
      <Navigation/>
    </div>
  );
};

export default TasksMain;
