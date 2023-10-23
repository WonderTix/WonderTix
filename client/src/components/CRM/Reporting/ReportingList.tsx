/* eslint-disable react/react-in-jsx-scope */
import React, {ReactElement} from 'react';
import ListLink from '../Reporting/ListLink';

/**
 * @returns {ReactElement} ReportingMain - has Navigation
 *  and Reporting to reroute to other components
 */
const ReportingList = () => {
  return (
    <div>
      <div className='w-full h-screen   overflow-x-hidden absolute'>
        <div className='md:ml-[22rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]'>
          <h1 className='font-bold text-5xl mb-14 md:pb-8'>Reports List</h1>
          <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 '>
            <ListLink
              gradientClasses='bg-gradient-to-r from-sky-500 to-indigo-500'
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='white'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                  />
                </svg>
              }
              size='md'
              title='Credit Card Reconciliation report'
              route='/admin/reporting/credit-card-reconciliation'
              description='Use this report to reconcile with your credit card processor. Summarizes all credit card transactions during a particular date range, grouped by event, as well as any other transactions that involve Fees.'
            />
            <ListLink
              gradientClasses='bg-gradient-to-r from-violet-500 to-fuchsia-500'
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='white'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              }
              size='md'
              title='Donation Summary Report'
              route='/admin/reporting/donation-summary'
              description='Report on all Donation transactions during a particular date range, and choose to group by Record Type, Fund, Donation Origin, or Campaign'
            />
            <ListLink
              gradientClasses='bg-gradient-to-r from-purple-400 to-yellow-400'
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='white'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605'
                  />
                </svg>
              }
              size='md'
              title='Daily Sales Report'
              route='/donor/reports'
              description='Use this to report on all box office transactions durin a particular date range (or choose "Yesterday"). The report is grouped by Payment Method and event, and includes donations and all fees.'
            />
            <ListLink
              gradientClasses='bg-gray-500'
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#f8fafc'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z'
                  />
                </svg>
              }
              size='md'
              title='Performance Report'
              route='/admin/reporting'
              disabled={true}
              description='Temporarily Unavailable'
            />
            <ListLink
              gradientClasses='bg-gray-500'
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#f8fafc'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
                  />
                </svg>
              }
              size='md'
              title='Transaction Summary Report'
              route='/admin/reporting'
              disabled={true}
              description='Temporarily Unavailable'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingList;
