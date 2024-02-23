import React, {ReactElement} from 'react';

/**
 * Return account results after performing account search
 *
 * @param root0
 * @param root0.data
 * @param root0.hasSearched
 * @returns {ReactElement}
 */
const AccountResults = ({
  data,
  hasSearched,
}: {
  data: any;
  hasSearched: boolean;
}): ReactElement => {
  if (data.length === 0 && hasSearched) return <p>No Results</p>;
  if (data.length === 0) return null;

  return data.map((account) => (
    <div
      className='w-full bg-white shadow-lg border border-zinc-300 rounded-lg'
      key={account.userid}
    >
      <div className='flex flex-col mt-2 p-5'>
        <div className='text-4xl font-semibold border-b-2 py-2'>
          {account.username}
        </div>
        <div className='text-lg mt-4'>ID: {account.userid}</div>
        <div className='text-lg mt-2'>
          Admin: {account.is_superadmin ? 'Yes' : 'No'}
        </div>
        <button
          disabled
          className='bg-zinc-300 mt-4 text-white px-5 py-2 rounded-xl shadow-lg'
        >
          Edit
        </button>
      </div>
    </div>
  ));
};

export default AccountResults;
