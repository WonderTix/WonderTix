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
      <div className="md:ml-[22rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem]">
        <h1 className="font-bold text-5xl mb-14 md:pb-8">Admin Dashboard</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-sky-500 to-indigo-500"
            icon={
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
            }
            size="lg"
            title="Accounts"
            route="/admin/accounts"
          />
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-cyan-500 to-blue-500"
            icon={
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
            }
            size="lg"
            title="Contacts"
            route="/admin/contacts"
          />
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-violet-500 to-fuchsia-500"
            icon={
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
            }
            size="md"
            title="Reporting"
            route="/admin/reporting"
          />
          <DashboardLink
            gradientClasses="bg-gradient-to-r from-purple-500 to-yellow-500"
            icon={
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
            }
            title="Task Manager"
            route="/admin/tasks"
          />

          <DashboardLink
            gradientClasses="bg-gradient-to-r from-violet-500 to-fuchsia-500"
            icon={
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
            }
            size="md"
            title="Emails"
            route="/admin/emails"
          />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

