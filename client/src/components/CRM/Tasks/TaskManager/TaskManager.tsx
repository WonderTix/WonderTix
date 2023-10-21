import React from 'react';
// import React, {useState} from 'react';
// import {
//   ExclamationTriangleIcon,
//   MagnifyGlassIcon,
//   ReloadIcon,
//   SquarePlusIcon,
// } from '../SVGIcons';
// import {DataGrid} from '@mui/x-data-grid';

// import {
//   TABLE_ROWS,
//   TABLE_COLUMNS,
// } from '../TaskData';

// type TabType = {
//   label: string;
//   value: string;
// };

// const TABS: TabType[] = [
//   {label: 'Due Date', value: 'date'},
//   {label: 'Important', value: 'important'},
//   {label: 'Most Recent', value: 'most recent'},
// ];
const TaskManager: React.FC = (): React.ReactElement => {
  return (<></>);
};
//   const [currentTab, setCurrentTab] = useState<string>('date');
//   const onTabChange = (value: string) => {
//     setCurrentTab(value);
//   };

//   const [pageSize, setPageSize] = useState(10);
//   const rowHeight = 52;
//   const footerHeight = 55;
//   const headerHeight = 56;
//   const calculatedHeight =
// (pageSize * rowHeight) + headerHeight + footerHeight;
//   return (
//     <div className='w-full h-screen absolute overflow-x-hidden'>
//       <div className='flex flex-col lg:ml-[12rem] lg:mt-32
//         md:ml-[11.35rem] md:mt-32 sm:mt-[5rem] sm:mx-[0rem]'
//       >
//         <div className='bg-white shadow-md rounded-md
//           md:mx-auto antialiased pt-5 min-w-[778px]
//           lg:min-w-[1150px]'
//         >
//           <div className='flex justify-between items-center gap-8 px-5 mb-3'>
//             <div className='flex flex-col w-80'>
//               <h1 className='text-4xl font-medium text-gray-800'>
//                Task Manager
//               </h1>
//               <p className='text-sm text-gray-500'>
//                 See information about tasks
//               </p>
//             </div>
//             <div className='flex text-sm font-semibold gap-2 w-80'>
//               <button
//                 title='Reload'
//                 className='flex justify-center items-center rounded
//                   border border-gray-400 shadow shadow-gray-500/50
//                   hover:shadow-inner bg-gradient-to-t hover:bg-gradient-to-b
//                   from-gray-200 to-white gap-2 w-40 px-4 py-2'
//               >
//                 <ReloadIcon size={4} />
//                Reload Table
//               </button>
//               <button
//                 title='Create Task'
//                 className='
// flex justify-center items-center text-white bg-black
//                   rounded shadow shadow-gray-500/50 hover:shadow-inner border
//                   border-black bg-gradient-to-t from-black to-gray-500/50
//
// hover:bg-gradient-to-b active:opacity-75 gap-2 px-4 py-2 w-40'
//               >
//                 <SquarePlusIcon size={4} />
//                 Create Task
//               </button>
//             </div>
//           </div>
//           <div className='flex justify-between items-center mb-4 px-5'>
//             <div className='flex relative bg-gray-300/50 rounded border-2'>
//               <div
//                 className='absolute top-0 h-9 w-28 rounded shadow
//                 border transition-transform ease-in-out duration-300
//                 border-gray-400/40 shadow-gray-800/50 bg-white'
//                 style={{transform: `translateX(${TABS
//                     .findIndex((t) => t.value === currentTab) * 100}%)`,
//                 }}
//               />
//               {TABS.map(({label, value}) => (
//                 <button
//                   key={value}
//                   onClick={() => onTabChange(value)}
//                   className='p-2 text-sm font-bold z-10 w-28
//                   flex items-center justify-evenly rounded'
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>
//             <div className='relative ml-auto text-gray-900'>
//               <input
//                 name='search'
//                 type='search'
//                 placeholder='Search for a task...'
//                 className='bg-gray-200/40 focus:bg-white rounded
//                 border border-gray-500/50 placeholder:italic
//                 placeholder-gray-400 focus:placeholder-white
//                 focus:outline-none text-sm p-2 pr-2 pl-9 w-80'
//               />
//               <span className='absolute pointer-events-none
//                 items-center inset-y-0 left-0 flex p-3'
//               >
//                 <MagnifyGlassIcon size='4' />
//               </span>
//             </div>
//           </div>
//           <div className='p-5'>
//             <DataGrid
//               rows={TABLE_ROWS}
//               columns={TABLE_COLUMNS}
//               pagination
//               disableSelectionOnClick
//               style={{
//                 width: '100%',
//                 height: calculatedHeight,
//                 borderRadius: 4,
//                 fontSize: 'small',
//               }}
//               rowsPerPageOptions={[10, 25, 50, 100]}
//               pageSize={pageSize}
//               autoHeight={true}
//               onPageSizeChange={setPageSize}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default TaskManager;
