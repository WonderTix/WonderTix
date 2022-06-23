/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {Switch, Route, useRouteMatch} from 'react-router'
import CreateEventPage from './eventCreation/v2/CreateEventPage'
import ManageEventsPage from './eventCreation/v2/ManageEvents'
import EditEventPage from './eventCreation/v2/EditEventPage'
import DeleteEvents from '../../components/DeleteEvents'
import DoorList from '../../components/DoorList'
import InstancesPage from "../../components/InstancesPage";
import NewsletterCreate from '../newsletter/NewsletterCreate'
import AdminPanel from './AdminPanel'
import EmailSubscriptions from './EmailSubscriptions'
import ChangePassword from '../../components/ChangePassword'
import ManageAccounts from './ManageAccounts'

export default function AdminSwitch() {
    const { path } = useRouteMatch()
    return <Switch>
        <Route exact path={path}>
            <AdminPanel/>
        </Route>
        <Route path={`${path}/CreateEvents`}>
            <CreateEventPage />
        </Route>
        <Route path={`${path}/ManageEvents`}>
            <ManageEventsPage />
        </Route>
        <Route path={`${path}/EditEvent/:eventid`}>
            <EditEventPage />
        </Route>
        <Route path={`${path}/DeleteEvents`}>
            <DeleteEvents />
        </Route>
        <Route exact path={`${path}/doorlist`}>
            <InstancesPage />
        </Route>
        <Route path={`${path}/doorlist/:eventinstanceid`}>
            <DoorList />
        </Route>
        <Route path={`${path}/email_subscriptions`}>
            <EmailSubscriptions />
        </Route>
        <Route path={`${path}/newsletter_create`}>
            <NewsletterCreate />
        </Route>
        <Route path={`${path}/changePassword`}>
            <ChangePassword />
        </Route>
        <Route path={`${path}/accountManagement`}>
            <ManageAccounts />
        </Route>
    </Switch>
}
