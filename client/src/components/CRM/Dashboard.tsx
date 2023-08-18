import React, {ReactElement} from 'react';
import DashboardLink from '../Ticketing/userdashboard/DashboardLink';

/**
 * CRM Dashboard
 *
 * @returns {ReactElement} Dashboard
 */
const Dashboard = (): ReactElement => {
  return (
    <div className="w-full h-screen overflow-x-hidden absolute">
      <div className="md:ml-[22rem] md:mt-40 sm:my-[11rem] sm:mx-[5rem]">
        <h1 className="font-bold text-5xl mb-14 pb-8 w-[60rem]">
          Admin Dashboard
        </h1>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-sky-500 to-indigo-500"
            icon={(
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            )}
            size="lg"
            title="Accounts"
            route="/admin/accounts"
          />
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-cyan-500 to-blue-500"
            icon={(
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            )}
            size="lg"
            title="Contacts"
            route="/admin/contacts"
          />
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-violet-500 to-fuchsia-500"
            icon={(
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            )}
            size="md"
            title="Reporting"
            route="/admin/reporting"
          />
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
            icon={(
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            size="md"
            title="Create Task"
            route="/admin/tasks/create"
          />
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-yellow-600 to-red-600"
            icon={(
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            title="Edit Task"
            route="/admin/tasks/edit"
          />
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-purple-400 to-yellow-400"
            icon={(
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            title="Account Information"
            route="/admin/tasks/accountInformation"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
