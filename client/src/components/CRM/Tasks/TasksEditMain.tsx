/* eslint-disable react/react-in-jsx-scope */

import Navigation from '../Navigation';
import EditTask from './EditTask';


const TasksEditMain=() =>{
  return (
    <div className='flex flex-row  '>
      <Navigation/>
      <EditTask/>
    </div>
  );
};

export default TasksEditMain;
