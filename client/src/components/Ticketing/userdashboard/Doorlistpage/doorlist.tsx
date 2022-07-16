/* eslint-disable max-len */
import React from 'react';

const Doorlist = () => {
  return (
    <div className='w-full h-screen overflow-x-hidden absolute '>
      <div className='md:ml-[18rem] md:mt-40 sm:mt-[11rem]
       sm:ml-[5rem] sm:mr-[5rem] sm:mb-[11rem]'>
        <div className='flex flex-row'>
          <h1 className='font-bold text-5xl bg-clip-text
           text-transparent bg-gradient-to-r from-sky-500
            to-indigo-500 mb-14     ' >Door List</h1>
        </div>
        <div className="relative overflow-x-auto shadow-md
         sm:rounded-xl mr-10 bg-gradient-to-r from-sky-500 to-indigo-500">
          <div className="p-4">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex
               items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="table-search" className="bg-gray-50 border
               border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for names"/>
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-zinc-300">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4
                     text-blue-600 bg-gray-100 border-gray-300 rounded
                      focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2  "/>
                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                            Name
                </th>

                <th scope="col" className="px-6 py-3">
                            Category
                </th>
                <th scope="col" className="px-6 py-3">
                            # of Seats
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-zinc-100 border-b  hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Jack
                </th>
                <td className="px-6 py-4">
                            VIB
                </td>
                <td className="px-6 py-4">
                            2
                </td>
                <td className="px-6 py-4 text-right">
                  <a href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default Doorlist;
