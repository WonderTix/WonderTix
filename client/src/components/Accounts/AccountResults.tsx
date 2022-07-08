import React from 'react';

const AccountResults = ({
  data,
}: {
  data: any,
}): React.ReactElement => {
  if (!data) return <div></div>;

  const {username, id, is_superadmin: isSuperadmin} = data;

  return (
    <div className='flex flex-col mt-2 p-5 md:w-[30rem] sm:w-[20rem]
     bg-white shadow-lg border border-zinc-300 rounded-xl  '
    >

      <div className='text-4xl font-semibold border-b-2 py-2'>{username} </div>
      <div className='text-lg mt-4'>ID: {id}</div>
      <div className='text-lg mt-2'>Admin: {isSuperadmin ? 'Y' : 'N'}</div>
      <button disabled className='bg-zinc-300
        mt-4 text-white px-5 py-2
        rounded-xl shadow-lg
          ' >
        Edit
      </button>
    </div>
  );
};

export default AccountResults;
