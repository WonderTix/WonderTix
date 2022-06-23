/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { appSelector } from '../app/hooks'
import Typography from '@material-ui/core/Typography'
import InstancesGroup from './InstancesGroup'

export default function InstancesPage() {
    const eventsLoadStatus = appSelector(state => state.events.status)
    const instancesByEvent = appSelector(state => state.events.data)
    const groupedInstances = Object.keys(instancesByEvent).map(key => {
        const {eventname, eventdescription, ...data} = instancesByEvent[key]
        return <InstancesGroup
            key={key}
            {...data}
            eventTitle={eventname}
            eventDesc={eventdescription}
        />
    })

    return (
        <div>
            <Typography variant="h2">Select a Showing</Typography>
            {(eventsLoadStatus === 'loading') && <p>Loading...</p>}
            {(eventsLoadStatus === 'success') && groupedInstances}
        </div>
    )
}

// Want: Display showings by event
// 
