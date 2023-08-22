import React from 'react';
import TaskForm from './TaskForm';
import Note from './Note';
import Filter from './Filter';

/**
 * Handle editing tasks
 *
 * @returns {React.ReactElement} HTMLElement for EditTask
 */
const EditTask = (): React.ReactElement => {
  return (
    <div className='w-full h-screen overflow-x-hidden absolute'>
      <div
        className=' md:ml-[18rem] md:mt-40 md:mr-40
         sm:mt-[11rem] sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text text-transparent
           bg-gradient-to-r from-yellow-600 to-red-600
            mb-10 pb-4'>Edit Tasks</h1>
        </div>
        <div>
          <h2 className='text-3xl text-zinc-600 font-bold mb-3'>Tasks</h2>
          <TaskForm
            title='View/Edit Task'
            fullWidth={true}
            threeButtonForm={true}
          />
        </div>
        <div className='mt-10'>
          <h2 className='text-3xl text-zinc-600 font-bold mb-3'>Filter</h2>
          <Filter />
        </div>
        <div className='mt-10'>
          <h2 className='text-3xl text-zinc-600 font-bold mb-3'>Notes</h2>
          <Note />
        </div>
      </div>

    </div>
  );
};

export default EditTask;
