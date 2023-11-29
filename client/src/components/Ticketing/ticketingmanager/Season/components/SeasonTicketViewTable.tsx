import React, {useEffect, useState} from 'react';
import {getTicketTypePrice} from '../../showings/ShowingUpdated/ShowingUtils';


export const SeasonTicketViewTable = () => {
  return (
    <div className={'bg-gray-300 grid grid-cols-12 rounded-xl p-1 h-[100%]'}>
      <div className={'overflow-y-auto overflow-x-auto col-span-12 shadow-xl border border-white rounded-xl bg-white w-[100%] min-h-[100px]'}>
        <table className={'table table-fixed text-sm min-w-[100%]'}>
          <thead className={'text-left text-zinc-800 whitespace-nowrap bg-gray-300 top-0'}>
            <tr>
              <th className={'px-2 py-1 border border-white'}>Admission Type</th>
              <th className={'px-2 py-1 border border-white'}>Ticket Price</th>
              <th className={'px-2 py-1 border border-white'}>Concession Price</th>
            </tr>
          </thead>
          <tbody className={'whitespace-nowrap'}>
            <tr>
              <td className={'px-2'}>
              </td>
              <td className={'px-2'}>
              </td>
              <td className={'px-2'}>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
