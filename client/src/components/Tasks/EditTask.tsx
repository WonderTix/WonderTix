import React from 'react';
import TaskForm from './TaskForm';
import Note from './Note';
import Filter from './Filter';

/**
 * @return {React.ReactElement} HTMLElement for EditTask
 */
const EditTask = (): React.ReactElement => {
  return (
    <div
      className='container grid gap-6 ml-12 mt-10 mr-12'>
      <div className=' '>
        <div className='text-3xl text-zinc-600 font-bold mb-3'>Tasks</div>
        <TaskForm
          title='View/Edit Task'
          fullWidth={true}
          threeButtonForm={true}
        />
      </div>
      <div className=''>
        <div className='text-3xl text-zinc-600 font-bold mb-3 '>
          Filter</div>
        <Filter />
      </div>
      <div className=' '>
        <div className='text-3xl text-zinc-600 font-bold mb-3 mt-10'>Notes</div>
        <Note />
      </div>

    </div>
  );
};

export default EditTask;
