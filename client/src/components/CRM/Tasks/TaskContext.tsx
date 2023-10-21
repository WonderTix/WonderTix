import React from 'react';
const TaskContext: React.FC = (): React.ReactElement => {
  return (<></>);
};
// import React, {createContext, useState, useContext} from 'react';
// import {TableRowType, TABLE_ROWS} from './TaskData';

// type TaskContextType = {
//   tasks: TableRowType[];
//   addTask: (task: any) => void;
//   updateTask: (updatedTask: any) => void;
//   deleteTask: (taskId: number) => void;
// };

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// type TaskProviderProps = {
//   children: React.ReactNode;
// };

// export const TaskProvider: React.FC<TaskProviderProps> = (
//     {children},
// ): React.ReactElement => {
//   // const [tasks, setTasks] = useState<any[]>([]);
//   const [tasks, setTasks] = useState<TableRowType[]>(TABLE_ROWS);
//   const addTask = (task: any) => {
//     setTasks([...tasks, task]);
//   };

//   const updateTask = (updatedTask: TableRowType) => {
//     const newTasks = tasks.map(
//         (task) => task.id === updatedTask.id ? updatedTask : task);
//     setTasks(newTasks);
//   };

//   const deleteTask = (taskId: number) => {
//     const newTasks = tasks.filter((task) => task.id !== taskId);
//     setTasks(newTasks);
//   };

//   return (
//     <TaskContext.Provider
//       value={{tasks, addTask, updateTask, deleteTask}}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = (): TaskContextType => {
//   const context = useContext(TaskContext);
//   if (!context) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };
