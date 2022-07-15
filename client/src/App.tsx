/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
// eslint-disable-next-line no-unused-vars
import Navigation from './components/Navigation';
import Home from './components/Home';
import Accounts from './components/Accounts/Accounts';
import Contacts from './components/Contacts/Contacts';
import Tasks from './components/Tasks/Tasks';
import Reporting from './components/Reporting/Reporting';
import ProtectedRoute from './components/Authentication/protected-route';
import TaskForm from './components/Tasks/TaskForm';
import EditTask from './components/Tasks/EditTask';
import Dashmain from './components/Dashmain';
import AccountsMain from './components/Accounts/AccountsMain';
import ContactMain from './components/Contacts/ContactMain';
import ReportingMain from './components/Reporting/ReportingMain';
import TasksEditMain from './components/Tasks/TasksEditMain';
import TasksMain from './components/Tasks/TasksMain';
import CreateTask from './components/Tasks/CreateTask';

const App = () => {
  return (
    <>
      <ProtectedRoute component={CssBaseline} />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Dashmain} />} />
        <Route
          path="/accounts"
          element={<ProtectedRoute component={AccountsMain} />}
        >
          <Route path=":id" element={<ProtectedRoute component={AccountsMain} />} />
        </Route>
        <Route
          path="/contacts"
          element={<ProtectedRoute component={ContactMain} />}
        >
          <Route path=":id" element={<ProtectedRoute component={ContactMain} />} />
        </Route>
        <Route
          path="/reporting"
          element={<ProtectedRoute component={ReportingMain} />}
        />
        <Route path="/tasks" element={<ProtectedRoute component={TasksMain} />} />
        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute component={CreateTask}/>}
        />
        <Route path="/tasks/edit" element={<ProtectedRoute component={TasksEditMain}/>} />
        <Route path="/tasks/accountInformation" element={<ProtectedRoute component={TasksMain}/>} />
      </Routes>
    </>
  );
};

export default App;
