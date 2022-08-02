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
import ManageAccountsmain from './components/CRM/Accounts/ManageUsers/ManageAccountsmain';
import userSearchmain from './components/CRM/Accounts/SearchAccount/userSearchmain';
/* Ticketing Main Page */
import Mainpage from './components/Ticketing/mainpage/Main';
import Eventshowingmain from './components/Ticketing/event/eventshowingmain';
import Cartmain from './components/Ticketing/cart/Cartmain';
import Checkoutmain from './components/Ticketing/checkout/Checkoutmain';
import CheckoutSuccess from './components/Ticketing/checkout/CheckoutSuccess';
import Donationmain from './components/Ticketing/donation/Donationmain';
/* Ticketing Manager */
import Doorlistmain from './components/Ticketing/ticketingmanager/Doorlistpage/doorlistmain';
import Addeventmain from './components/Ticketing/ticketingmanager/Events/Add_event/addeventmain';
import Udashmain from './components/Ticketing/ticketingmanager/Udashmain';
import Deleteeventmain from './components/Ticketing/ticketingmanager/Events/Delete_event/Deleteventmain';
import Editeventmain from './components/Ticketing/ticketingmanager/Events/Edit_event/Editeventmain';
import Manageventmain from './components/Ticketing/ticketingmanager/Events/Manageventsmain';
import NewsletterCreatemain from './components/Ticketing/ticketingmanager/Newsletter/NewsletterCreatemain';
import Showingsmain from './components/Ticketing/ticketingmanager/showings/Showingsmain';
import showingmain from './components/Ticketing/ticketingmanager/showings/showing/showingmain';
const App = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/events/:eventid" element={<ProtectedRoute component={Eventshowingmain}/>} />
        <Route path="/cart" element={<ProtectedRoute component={Cartmain}/>} />
        <Route path="/completeorder" element={<ProtectedRoute component={Checkoutmain}/>} />
        <Route path="/success" element={<ProtectedRoute component={CheckoutSuccess}/>} />
        <Route path="/donate" element={<ProtectedRoute component={Donationmain}/>} />


        <Route path="/admin" element={<ProtectedRoute component={Dashmain} />} />
        <Route path="/admin/accounts" element={<ProtectedRoute component={AccountsMain} />} />
        <Route
          path="/admin/accounts/search"
          element={<ProtectedRoute component={userSearchmain} />}
        >

          <Route path=":id" element={<ProtectedRoute component={userSearchmain} />} />
        </Route>
        <Route path="/admin/accounts/manageaccount" element={<ProtectedRoute component={ManageAccountsmain} />} />

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
        <Route path="/ticketing/addnewsletter" element={<ProtectedRoute component={NewsletterCreatemain} />} />
        <Route path="/ticketing/showings" element={<ProtectedRoute component={Showingsmain} />} />
        <Route path="/ticketing/showings/:eventid" element={<ProtectedRoute component={showingmain} />} />

      </Routes>
    </>
  );
};

export default App;
