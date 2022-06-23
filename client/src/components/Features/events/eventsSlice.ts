/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Dictionary } from '../../utils'

export interface EventInstance {
     id: number,
     eventid: number,
     eventname: string,
     eventdescription?: string,
     image_url: string,
     eventdate: string,
     starttime: string,
     totalseats: number,
     availableseats: number,
}

export type Instance = Omit<EventInstance, "eventid"|"eventname"|"eventdescription"|"image_url">

export interface Event {
    eventname: string,
    eventdescription?: string,
    image_url: string,
    eventid: number,
    instances: Instance[],
}


export const aggregateInstances = (events: EventInstance[]) =>
    events.reduce<Dictionary<Event>>((events, event) => {
        const { eventname, eventdescription, image_url, eventid, ...instance } = event

        return (events[eventid]) ?
            { ...events, [eventid]: {...events[eventid], instances: [...events[eventid].instances, instance] as Instance[]}} :
            { ...events, [eventid]: { eventid, eventname, eventdescription, image_url, instances: [instance] }}
        }, {})

export const fetchEventInstanceData = createAsyncThunk(
    'events/fetchAll',
    async () => {
        try {
            const res = await fetch('/api/active-event-instance-list')
            const allEventInstances: EventInstance[] = await res.json()
            return aggregateInstances(allEventInstances)
        } catch (err) {
            console.error(err.message)
        }
    }
)

export interface EventInstancesState {
    data: Dictionary<Event>,
    status: 'idle' | 'loading' | 'success' | 'failed'
}

export const INITIAL_STATE: EventInstancesState = {
    data: {},
    status: 'idle'
}

const eventsSlice = createSlice({
    name: 'events',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventInstanceData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchEventInstanceData.fulfilled, (state, action) => {
                state.status = 'success'
                state.data = (action.payload) ? action.payload : {}
            })
            .addCase(fetchEventInstanceData.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

// Returns {eventname, eventdescription, image_url}[]
export const selectAllEventInstances = (state: RootState) => 
    Object.keys(state.events.data).map(key => {
        const { eventname, eventdescription, image_url, eventid } = state.events.data[key]
        return {
            eventname,
            eventdescription: (eventdescription) ?
                eventdescription : '',
            image_url,
            eventid
        }
    })

// Returns list of instances for given event, or undefined if play doesn't exist
export const selectEventInstanceData =
    (state: RootState, id: number): Event | undefined => {
        const key = id
        return (state.events.data[key]) ?
            state.events.data[key] :
            undefined
    }

export default eventsSlice.reducer
