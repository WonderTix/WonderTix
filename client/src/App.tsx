/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

/* CRM */
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/Authentication/protected-route';
import Dashmain from './components/CRM/Dashmain';
import AccountsMain from './components/CRM/Accounts/AccountsMain';
import ContactMain from './components/CRM/Contacts/ContactMain';
import {ContactOneResult} from './components/CRM/Contacts/ContactOneResult';
import ReportingMain from './components/CRM/Reporting/ReportingMain';
import TasksEditMain from './components/CRM/Tasks/TasksEditMain';
import TasksMain from './components/CRM/Tasks/TasksMain';
import CreateTask from './components/CRM/Tasks/CreateTask';
import ManageAccountsmain from './components/CRM/Accounts/ManageUsers/ManageAccountsmain';
import userSearchmain from './components/CRM/Accounts/SearchAccount/userSearchmain';
import DailySalesReportMain from './components/CRM/Reporting/DailySalesReport/DailySalesReportMain';
import DonationSummaryReportMain from './components/CRM/Reporting/DonationSummaryReport/DonationSummaryReportMain';
import CreditCardConciliationReport from './components/CRM/Reporting/CreditCardReconciliationReport/CreditCardReconciliationReport';
import TransactionSummaryReport from './components/CRM/Reporting/TransactionSummaryReport/TransactionSummaryReport';
import PerformanceReportMain from './components/CRM/Reporting/PerformanceReport/PerformanceReportMain';
import EventMain from './components/CRM/Reporting/PerformanceReport/EventInventory/EventMain';

/* Donor Management */
import DmDashmain from './components/DonorManagement/DmDashmain';
import DonorReporting from './components/DonorManagement/Reporting/DonorReporting';

/* Ticketing Main Page */
import Mainpage from './components/Ticketing/mainpage/Main';
import EventShowingsmain from './components/Ticketing/event/EventShowingsmain';
import Cartmain from './components/Ticketing/cart/Cartmain';
import Checkoutmain from './components/Ticketing/checkout/Checkoutmain';
import CheckoutSuccess from './components/Ticketing/checkout/CheckoutSuccess';
import Donationmain from './components/Ticketing/donation/Donationmain';
/* Ticketing Manager */
import DoorListmain from './components/Ticketing/ticketingmanager/DoorList/DoorListmain';
import Udashmain from './components/Ticketing/ticketingmanager/Udashmain';
import NewsletterCreatemain from './components/Ticketing/ticketingmanager/Newsletter/NewsletterCreatemain';
import Showingsmain from './components/Ticketing/ticketingmanager/showings/Showingsmain';
import SeasonsMain from './components/Ticketing/ticketingmanager/Season/SeasonMain';
import SingleSeasonMain from './components/Ticketing/ticketingmanager/Season/components/SingleSeasonMain';
import Tickettypesmain from './components/Ticketing/ticketingmanager/TicketTypes/tickettypesmain';
import TicketExchangesmain from './components/Ticketing/ticketingmanager/TicketExchanges/TicketExchangesmain';
import AdminPurchasemain from './components/Ticketing/ticketingmanager/AdminPurchase/AdminPurchasemain';
import AdminCheckoutmain from './components/Ticketing/ticketingmanager/AdminPurchase/AdminCheckoutmain';
import PageNotFound from './components/Ticketing/mainpage/PageNotFound';
import {EventProvider} from './components/Ticketing/ticketingmanager/showings/ShowingUpdated/EventProvider';
import RefundOrdersMain from './components/Ticketing/ticketingmanager/RefundOrders/RefundOrdersMain';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='/events/:eventid' element={<EventShowingsmain />} />
        <Route path='/cart' element={<Cartmain />} />
        <Route path='/completeorder' element={<Checkoutmain />} />
        <Route path='/success' element={<CheckoutSuccess />} />
        <Route path='/donate' element={<Donationmain />} />
        <Route
          path='/admin'
          element={<ProtectedRoute component={Dashmain} />}
        />
        <Route
          path='/admin/accounts'
          element={<ProtectedRoute component={AccountsMain} />}
        />
        <Route
          path='/admin/accounts/search'
          element={<ProtectedRoute component={userSearchmain} />}
        >
          <Route
            path=':id'
            element={<ProtectedRoute component={userSearchmain} />}
          />
        </Route>
        <Route
          path='/admin/accounts/manageaccount'
          element={<ProtectedRoute component={ManageAccountsmain} />}
        />
        <Route
          path='/admin/contacts'
          element={<ProtectedRoute component={ContactMain} />}
        >
          <Route
            path=':id'
            element={<ProtectedRoute component={ContactOneResult} />}
          />
        </Route>
        <Route
          path='/admin/contacts/show/:contactid'
          element={<ProtectedRoute component={ContactOneResult} />}
        />
        <Route
          path='/admin/reporting'
          element={<ProtectedRoute component={ReportingMain} />}
        />
        <Route
          path='/admin/tasks'
          element={<ProtectedRoute component={TasksMain} />}
        />
        <Route
          path='/admin/tasks/create'
          element={<ProtectedRoute component={CreateTask} />}
        />
        <Route
          path='/admin/tasks/edit'
          element={<ProtectedRoute component={TasksEditMain} />}
        />
        <Route
          path='/admin/tasks/accountInformation'
          element={<ProtectedRoute component={TasksMain} />}
        />
        <Route
          path='/admin/donor'
          element={<ProtectedRoute component={DmDashmain} />}
        />
        <Route
          path='/admin/donor/reporting'
          element={<ProtectedRoute component={DonorReporting} />}
        />
        <Route
          path='/admin/reporting/credit-card-reconciliation'
          element={<ProtectedRoute component={CreditCardConciliationReport} />}
        />
        <Route
          path='/admin/reporting/donation-summary'
          element={<ProtectedRoute component={DonationSummaryReportMain} />}
        />
        <Route
          path='/admin/reporting/daily-sales-report'
          element={<ProtectedRoute component={DailySalesReportMain} />}
        />
        <Route
          path='/admin/reporting/transaction-summary-report'
          element={<ProtectedRoute component={TransactionSummaryReport} />}
        />
        <Route
          path='/admin/reporting/performance-report'
          element={<ProtectedRoute component={PerformanceReportMain} />}
        />
        <Route
          path='/admin/reporting/event-inventory'
          element={<ProtectedRoute component={EventMain} />}
        />
        <Route
          path='/ticketing'
          element={<ProtectedRoute component={Udashmain} />}
        />
        <Route
          path='/ticketing/doorlist'
          element={<ProtectedRoute component={DoorListmain} />}
        />
        <Route
          path='/ticketing/addnewsletter'
          element={<ProtectedRoute component={NewsletterCreatemain} />}
        />
        <Route
          path='/ticketing/showings'
          element={<ProtectedRoute component={Showingsmain} />}
        />
        <Route
          path='/ticketing/seasons'
          element={<ProtectedRoute component={SeasonsMain} />}
        />
        <Route
          path='/ticketing/seasons/:seasonid'
          element={<ProtectedRoute component={SingleSeasonMain} />}
        />
        <Route
          path='/ticketing/tickettypes'
          element={<ProtectedRoute component={Tickettypesmain} />}
        />
        <Route
          path='/ticketing/ticketexchanges'
          element={<ProtectedRoute component={TicketExchangesmain} />}
        />
        <Route
          path='/ticketing/showings/:eventid'
          element={<ProtectedRoute component={EventProvider} />}
        />
        <Route
          path='/ticketing/purchaseticket'
          element={<ProtectedRoute component={AdminPurchasemain} />}
        />
        <Route
          path='/ticketing/admincheckout'
          element={<ProtectedRoute component={AdminCheckoutmain} />}
        />
        <Route
          path='/ticketing/Refund'
          element={<ProtectedRoute component={RefundOrdersMain} />}
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
