import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Accounts from './components/Accounts/Accounts';
import Contacts from './components/Contacts/Contacts';
import Tasks from './components/Tasks/Tasks';
import Reporting from './components/Reporting/Reporting';
import ProtectedRoute from './components/Authentication/protected-route';
import TaskForm from './components/Tasks/TaskForm';
import EditTask from './components/Tasks/EditTask';

const App = () => {
  return (
    <>
      <ProtectedRoute component={Navigation} />
      <ProtectedRoute component={CssBaseline} />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route
          path="/accounts"
          element={<ProtectedRoute component={Accounts} />}
        >
          <Route path=":id" element={<ProtectedRoute component={Accounts} />} />
        </Route>
        <Route
          path="/contacts"
          element={<ProtectedRoute component={Contacts} />}
        >
          <Route path=":id" element={<ProtectedRoute component={Contacts} />} />
        </Route>
        <Route
          path="/reporting"
          element={<ProtectedRoute component={Reporting} />}
        />
        <Route path="/tasks" element={<ProtectedRoute component={Tasks} />} />
        <Route
          path="/tasks/create"
          element={
            <TaskForm
              title="Create New Task"
              name="Create"
              threeButtonForm={false}
            />
          }
        />
        <Route path="/tasks/edit" element={<EditTask />} />
        <Route path="/tasks/accountInformation" element={<Tasks />} />
      </Routes>
    </>
  );
<<<<<<< HEAD:client/src/App.jsx
}

//Ticketing
 /**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { useEffect, useState } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'
import CheckoutPage from "./components/CheckoutPage";

import Navbar from './app/Navbar';
import {
    Switch,
    Route,
} from 'react-router-dom';
import Cart from './features/ticketing/cart/Cart';
import NewsletterSignup from "./features/newsletter/NewsletterSignup";
import CheckoutSuccess from "./components/CheckoutSuccess";
import { Button, Container } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { useAppDispatch, appSelector } from './app/hooks'
import { closeSnackbar, selectSnackbar } from "./features/snackbarSlice"

import AllEventsPage from './features/events/AllEventsPage'
import EventPage from "./features/events/EventPage"
import { fetchEventInstanceData } from "./features/events/eventsSlice";
import { fetchTicketingData } from './features/ticketing/ticketingSlice'

import LoginPage from "./components/LoginPage";
import AdminSwitch from "./features/admin/AdminSwitch";
import RequireLogin from "./components/RequireLogin";
import MultiSelectCalendar from "./components/MultiSelectCalendar";
import ScrollToTop from "./components/ScrollToTop";
import OnlyDonationPage from "./components/OnlyDonatePage";

function App() {

    const dispatch = useAppDispatch()
    const snackbarState = appSelector(selectSnackbar)
    const eventsStatus = appSelector(state => state.events.status)

    useEffect(() => {
        if(eventsStatus === 'idle') {
            dispatch(fetchEventInstanceData())
            dispatch(fetchTicketingData())
        }
    }, [dispatch])

    const onSnackbarClose = (_: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch(closeSnackbar())
    }

    const [dates, setDates] = useState<Date[]>([new Date()])

    return (
        <Container maxWidth="md">
            <ScrollToTop />
            <ThemeProvider theme={theme}>
                <div id="maincontainer">
                    <Navbar />
                    <Switch>
                        <Route path="/testcalendar">
                            <MultiSelectCalendar value={dates} onChange={setDates} onDateClicked={d => console.log(d)}/>
                            <Button onClick={() => setDates([])}>Clear</Button>
                            {dates.map(d => <p key={d.getTime()}>{d.toLocaleString()}</p>)}
                        </Route>
                        <Route path="/events/:eventid">
                            <EventPage />
                        </Route>

                        <Route path="/success">
                            <CheckoutSuccess/>
                        </Route>

                        <Route exact path="/">
                            <AllEventsPage />
                        </Route>

                        <Route exact path="/events">
                            <AllEventsPage />
                        </Route>

                        <Route path="/cart">
                            <Cart />
                        </Route>

                        <Route path="/completeorder">
                            <CheckoutPage/>
                        </Route>

                        <Route path="/newsletter_signup">
                            <NewsletterSignup />
                        </Route>

                        <Route path="/login/:redirect?" >
                            <LoginPage />
                        </Route>
                        <Route path="/admin">
                            <RequireLogin redirectTo="/admin">
                                <AdminSwitch />
                            </RequireLogin>
                        </Route>
                        <Route path="/donate">
                            <OnlyDonationPage />
                        </Route>

                    </Switch>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={snackbarState.shown}
                    autoHideDuration={6000}
                    onClose={onSnackbarClose}
                    message={snackbarState.message}/>
            </ThemeProvider>
        </Container>
    );
}

export default App;
  **/
=======
};

export default App;
>>>>>>> development:client/src/App.tsx
