/* eslint-disable react/react-in-jsx-scope */
import Navigation from '../Navigation';
import TaskManager from './TaskManager';

/**
 * @returns {object} TasksMain - has Navigation
 *  and Tasks to reroute to other components
 */
const TasksMain=() =>{
  return (
    <div className='flex flex-row  '>
      <TaskManager/>
      <Navigation/>
    </div>
  );
};

export default TasksMain;
