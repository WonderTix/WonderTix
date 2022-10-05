/* eslint-disable react/react-in-jsx-scope */

import Navigation from '../Navigation';
import EditTask from './EditTask';

/**
 * @return {object} TasksEditMain - has Navigation
 *  and EditTask to reroute to other components
 */
const TasksEditMain=() =>{
  return (
    <div className='flex flex-row  '>
      <Navigation/>
      <EditTask/>
    </div>
  );
};

export default TasksEditMain;
