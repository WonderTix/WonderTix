import React from 'react';

const DeliveryOptions = (): React.ReactElement => {
  return (
    <fieldset className='mb-4 mt-6'>
      <legend className='block font-bold bg-slate-100 text-lg indent-2 py-1 border-y w-full'>
        Delivery
      </legend>
      <div className='mt-5 px-5'>
        <label htmlFor='emailTo' className='text-sm font-bold mr-0.5'>
          Email To:
        </label>
        <input
          type='email'
          id='emailTo'
          name='email To'
          placeholder='Assignee@WonderTix.com'
          pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
          className='ml-6 p-1 w-[408px]
          border rounded text-sm font-normal
          bg-slate-50 placeholder-gray-400 placeholder:italic peer
          invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
          aria-describedby='schedule-emailTo' aria-required='true' required
        />
        <span
          id='assignee-emailTo'
          className='mt-2 hidden text-xs font-semibold text-red-500
          peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
        >
          * Please provide a valid email address.
        </span>
      </div>

      <div className='mt-5 px-5'>
        <label htmlFor='emailCc' className='text-sm font-bold '>
          Email Cc:
        </label>
        <input
          type='email'
          id='emailCc'
          name='email Cc'
          placeholder='Assignee@WonderTix.com'
          pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
          className='ml-6 p-1 w-[408px]
          border rounded text-sm font-normal
          bg-slate-50 placeholder-gray-400 placeholder:italic peer
          invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
          aria-describedby='schedule-emailCc' aria-required='true'
        />
        <span
          id='assignee-emailCc'
          className='mt-2 hidden text-xs font-semibold text-red-500
          peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
        >
          * Please provide a valid email address.
        </span>
      </div>

      <div className='mt-5 px-5'>
        <label htmlFor='emailFrom' className='text-sm font-bold mr-px'>
          Email From:
        </label>
        <input
          type='email'
          id='emailFrom'
          name='email from'
          placeholder='Assignee@WonderTix.com'
          pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
          className='ml-1.5 p-1 w-[408px]
          border rounded text-sm font-normal
          bg-slate-50 placeholder-gray-400 placeholder:italic peer
          invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500'
          aria-describedby='schedule-emailFrom' aria-required='true' required
        />
        <span
          id='assignee-emailFrom'
          className='mt-2 hidden text-xs font-semibold text-red-500
          peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'
        >
          * Please provide a valid email address.
        </span>
      </div>
    </fieldset>
  );
};

export default DeliveryOptions;
