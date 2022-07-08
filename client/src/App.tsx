// 3-d party imports
import CssBaseline from '@mui/material/CssBaseline';
import {Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {appSelector, useAppDispatch} from './components/app/hooks';
import theme from 'material-ui';
import {Button, Snackbar} from '@material-ui/core';

// CRM
import Accounts from './components/Accounts/Accounts';
import ProtectedRoute from './components/Authentication/protected-route';
import Contacts from './components/Contacts/Contacts';
import Navigation from './components/Navigation';
import Reporting from './components/Reporting/Reporting';
import EditTask from './components/Tasks/EditTask';
import TaskForm from './components/Tasks/TaskForm';
import Tasks from './components/Tasks/Tasks';
// Ticketing
import AllEventsPage from './components/Features/events/AllEventsPage';
import EventPage from './components/Features/events/EventPage';
import CheckoutSuccess from './components/Ticketing/CheckoutSuccess';
import Cart from './components/Features/ticketing/cart/Cart';
import CheckoutPage from './components/Ticketing/CheckoutPage';
import NewsletterSignup from './components/Features/newsletter/NewsletterSignup';
import LoginPage from './components/Ticketing/LoginPage';
import RequireLogin from './components/Ticketing/RequireLogin';
import AdminSwitch from './components/Features/admin/AdminSwitch';
import OnlyDonationPage from './components/Ticketing/OnlyDonatePage';

const App = () => {
  const dispatch = useAppDispatch();
  // const snackbarState = appSelector(selectSnackbar)
  const eventsStatus = appSelector((state) => state.events.status);

  useEffect(() => {
    if (eventsStatus === 'idle') {
      // dispatch(fetchEventInstanceData())
      // dispatch(fetchTicketingData())
    }
  }, [dispatch]);

  const onSnackbarClose = (_: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    // dispatch(closeSnackbar())
  };

  const [dates, setDates] = useState<Date[]>([new Date()]);


  return (
    <>
      <ThemeProvider theme={theme}>
        <ProtectedRoute component={Navigation}/>
        <ProtectedRoute component={CssBaseline}/>


        <Routes>
          {/* Ticketing routes*/}
          <Route path="/" element={<ProtectedRoute component={AllEventsPage}/>}/>
          <Route path="/testcalendar">
            {/* <MultiSelectCalendar value={dates} onChange={setDates} onDateClicked={d => console.log(d)}/>*/}
            <Button onClick={() => setDates([])}>Clear</Button>
            {dates.map((d) => <p key={d.getTime()}>{d.toLocaleString()}</p>)}
          </Route>
          <Route path="/events/:eventid" element={<ProtectedRoute component={EventPage}/>}/>
          <Route path="/events" element={<ProtectedRoute component={AllEventsPage}/>}/>
          <Route path="cart/" element={<ProtectedRoute component={Cart}/>}/>
          <Route path="/success" element={<ProtectedRoute component={CheckoutSuccess}/>}/>
          <Route path="/donate" element={<ProtectedRoute component={OnlyDonationPage}/>}/>
          <Route path="/completeorder" element={<ProtectedRoute component={CheckoutPage}/>}/>
          <Route path="/newsletter_signup" element={<ProtectedRoute component={NewsletterSignup}/>}/>
          <Route path="/login/:redirect?" element={<ProtectedRoute component={LoginPage}/>}/>

          {/* Admin/CRM routes*/}
          <Route path="/admin">
            <RequireLogin redirectTo="/admin">
              <AdminSwitch/>
            </RequireLogin>
          </Route>
          <Route
            path="/admin/accounts"
            element={<ProtectedRoute component={Accounts}/>}
          >
            <Route path=":id" element={<ProtectedRoute component={Accounts}/>}/>
          </Route>
          <Route
            path="/admin/contacts"
            element={<ProtectedRoute component={Contacts}/>}
          >
            <Route path=":id" element={<ProtectedRoute component={Contacts}/>}/>
          </Route>
          <Route
            path="/admin/reporting"
            element={<ProtectedRoute component={Reporting}/>}
          />
          <Route path="/admin/tasks" element={<ProtectedRoute component={Tasks}/>}/>
          <Route
            path="/admin/tasks/create"
            element={
              <TaskForm
                title="Create New Task"
                name="Create"
                threeButtonForm={false}
              />
            }
          />
          <Route path="/admin/tasks/edit" element={<EditTask/>}/>
          <Route path="/admin/tasks/accountInformation" element={<Tasks/>}/>
        </Routes>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          // open={snackbarState.shown}
          autoHideDuration={6000}
          onClose={onSnackbarClose}
          // message={snackbarState.message}
        />
      </ThemeProvider>
    </>
  );
};

export default App;
