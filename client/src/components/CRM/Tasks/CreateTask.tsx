/* eslint-disable react/react-in-jsx-scope */
import Navigation from '../Navigation';
import TaskForm from './TaskForm';

/**
 * Create new Task
 *
 * @returns {ReactElement}
 */
const CreateTask=() =>{
  return (
    <div className='flex flex-row  '>
      <Navigation/>
      <div className='w-full h-screen overflow-x-hidden absolute'>
        <div className=' md:ml-[18rem] md:mt-40 md:mr-40
            md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <div className='flex flex-row'>
            <h1 className='font-bold text-5xl bg-clip-text text-transparent
            bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
            mb-10 pb-4'>Create Task</h1>
          </div>
          <TaskForm
            title="Create New Task"
            name="Create"
            threeButtonForm={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
