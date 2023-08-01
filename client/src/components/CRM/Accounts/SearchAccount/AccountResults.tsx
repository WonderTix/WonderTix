import React from 'react';
/**
 * Return account results after performing account search
 *
 * @param root0
 * @param root0.data
 * @returns {ReactElement}
 */
const AccountResults = ({
  data,
  hasSearched,
}: {
  data: any,
  hasSearched: boolean,
}): React.ReactElement => {
  if (!data && hasSearched) return <div>Empty</div>;
  if (!data) return null;

  const {username, id, is_superadmin: isSuperadmin} = data;

  return (
    <div className='flec flex-row w-full bg-white
    shadow-lg border border-zinc-300 rounded-lg '
    >
      <div className='flex flex-col mt-2 p-5 '>
        <div className='text-4xl font-semibold
         border-b-2 py-2'>{username} </div>
        <div className='text-lg mt-4'>ID: {id}</div>
        <div className='text-lg mt-2'>Admin: {isSuperadmin ? 'Y' : 'N'}</div>
        <button disabled className='bg-zinc-300
        mt-4 text-white px-5 py-2
        rounded-xl shadow-lg
          ' >
        Edit
        </button>
      </div>
    </div>
  );
};

export default AccountResults;
