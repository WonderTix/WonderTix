import React, {useState, useEffect} from 'react';

export const SeasonTicketTypeUpdateTable = () => {
  return (
    <div className={'bg-gray-300 grid grid-cols-12 rounded-xl p-2 h-[100%]'}>
      <div className={'overflow-y-auto overflow-x-auto col-span-12 shadow-xl border border-white rounded-xl bg-white w-[100%] min-h-[100px]'}>
        <table className="table table-fixed text-sm min-w-[100%]">
          <thead className="text-left text-zinc-800 whitespace-nowrap bg-gray-300 sticky top-0">
            <tr className="rounded-xl">
              <th className="px-2 py-1 border-b border-r border-white">Admission Type</th>
              <th className="px-2 py-1 border-b border-l border-r border-white">Ticket Price</th>
              <th className="px-2 py-1 border-b border-l border-r border-white">Concession Price</th>
              <th className="px-2 py-1 border-b border-l border-r border-white">Quantity</th>
              <th className="px-2 py-1 border-b border-l border-white">
              </th>
            </tr>
          </thead>
          <tbody className="text-sm whitespace-nowrap text-zinc-800">
            <tr className="bg-gray-200">
              <td className="px-2 border border-white">
                {/* Ticket type description */}
              </td>
              <td className="px-2 border border-white">
                <input className="w-[75px] bg-gray-100" type="text" value="" />
              </td>
              <td className="px-2 border border-white">
                <input className="w-[75px] bg-gray-100" type="text" value="" />
              </td>
              <td className="px-2 border border-white">
                {/* Tickets value */}
              </td>
              <td className="border border-white"></td>
            </tr>
            {/* Instance ticket types rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
