/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

/* CRM */
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ProtectedRoute from './components/Authentication/protected-route';
import Dashmain from './components/CRM/Dashmain';
import AccountsMain from './components/CRM/Accounts/AccountsMain';
import ContactMain from './components/CRM/Contacts/ContactMain';
import ReportingMain from './components/CRM/Reporting/ReportingMain';
import TasksEditMain from './components/CRM/Tasks/TasksEditMain';
import TasksMain from './components/CRM/Tasks/TasksMain';
import CreateTask from './components/CRM/Tasks/CreateTask';


/* Ticketing */
import Mainpage from './components/Ticketing/mainpage/Main';
import Doorlistmain from './components/Ticketing/ticketingmanager/Doorlistpage/doorlistmain';
import Addeventmain from './components/Ticketing/ticketingmanager/Events/Add_event/addeventmain';
import Udashmain from './components/Ticketing/ticketingmanager/Udashmain';
import Deleteeventmain from './components/Ticketing/ticketingmanager/Events/Delete_event/Deleteventmain';
import Editeventmain from './components/Ticketing/ticketingmanager/Events/Edit_event/Editeventmain';
import Manageventmain from './components/Ticketing/ticketingmanager/Events/Manageventsmain';
const App = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/admin" element={<ProtectedRoute component={Dashmain} />} />
        <Route
          path="/admin/accounts"
          element={<ProtectedRoute component={AccountsMain} />}
        >
          <Route path=":id" element={<ProtectedRoute component={AccountsMain} />} />
        </Route>
        <Route
          path="/admin/contacts"
          element={<ProtectedRoute component={ContactMain} />}
        >
          <Route path=":id" element={<ProtectedRoute component={ContactMain} />} />
        </Route>
        <Route
          path="/admin/reporting"
          element={<ProtectedRoute component={ReportingMain} />}
        />
        <Route path="/admin/tasks" element={<ProtectedRoute component={TasksMain} />} />
        <Route
          path="/admin/tasks/create"
          element={
            <ProtectedRoute component={CreateTask}/>}
        />
        <Route path="/admin/tasks/edit" element={<ProtectedRoute component={TasksEditMain}/>} />
        <Route path="/admin/tasks/accountInformation" element={<ProtectedRoute component={TasksMain}/>} />

        <Route path="/ticketing" element={<ProtectedRoute component={Udashmain} />} />
        <Route path="/ticketing/doorlist" element={<ProtectedRoute component={Doorlistmain} />} />
        <Route path="/ticketing/addevent" element={<ProtectedRoute component={Addeventmain} />} />
        <Route path="/ticketing/deleteevent" element={<ProtectedRoute component={Deleteeventmain} />} />
        <Route path="/ticketing/editevent/:eventid" element={<ProtectedRoute component={Editeventmain} />} />
        <Route path="/ticketing/manageevent" element={<ProtectedRoute component={Manageventmain} />} />

      </Routes>
    </>
  );
};

export default App;
