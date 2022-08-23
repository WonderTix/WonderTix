/* eslint-disable react/react-in-jsx-scope */
import Navigation from '../Navigation';
import Tasks from './Tasks';

/**
 * @return {object} TasksMain - has Navigation
 *  and Tasks to reroute to other components
 */
const TasksMain=() =>{
  return (
    <div className='flex flex-row  '>
      <Tasks/>
      <Navigation/>
    </div>
  );
};

export default TasksMain;
