/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { Event, selectAllEvents, aggregateShowings } from "./eventsSlice";
import { titleCase, militaryToCivilian, dayMonthDate } from '../../utils'

// const testEventData: Event[] = [
//     {
//         id: 1,
//         eventname: 'foo Bar baz',
//         eventdescription: 'desc1',
//         event_instance_date: "2021-01-07T08:00:00.000Z",
//         starttime: "19:00:00",
//         totalseats: 1,
//         availableseats: 1,
//         image_url: 'https://i.guim.co.uk/img/media/b5df93588386c0565177648cf41f3aff72c63400/0_217_5657_3395/master/5657.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a917ce8d52959d36bb08ad29184e2701',
//     },
//     {
//         id: 2,
//         eventname: 'foo Bar baz',
//         eventdescription: 'desc1',
//         event_instance_date: "2021-01-08T08:00:00.000Z",
//         starttime: "22:00:00",
//         totalseats: 3,
//         availableseats: 3,
//         image_url: 'https://i.guim.co.uk/img/media/b5df93588386c0565177648cf41f3aff72c63400/0_217_5657_3395/master/5657.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a917ce8d52959d36bb08ad29184e2701',
//     },
//     {
//         id: 3,
//         eventname: 'test 2',
//         eventdescription: 'desc1',
//         event_instance_date: "2021-01-08T08:00:00.000Z",
//         starttime: "22:00:00",
//         totalseats: 3,
//         availableseats: 3,
//         image_url: 'https://i.guim.co.uk/img/media/b5df93588386c0565177648cf41f3aff72c63400/0_217_5657_3395/master/5657.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a917ce8d52959d36bb08ad29184e2701',
//     },
// ]

const Events = {
    foo_Bar_baz: {
        eventname: 'foo Bar baz',
        eventdescription: 'desc1',
        image_url: 'https://i.guim.co.uk/img/media/b5df93588386c0565177648cf41f3aff72c63400/0_217_5657_3395/master/5657.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a917ce8d52959d36bb08ad29184e2701',
        showings: [
            {
                id: 1,
                event_instance_date: "2021-01-07T08:00:00.000Z",
                starttime: "19:00:00",
                totalseats: 1,
                availableseats: 1,
            },
            {
                id: 2,
                event_instance_date: "2021-01-08T08:00:00.000Z",
                starttime: "22:00:00",
                totalseats: 3,
                availableseats: 3,
            },
        ]
    },
    test_2: {
        eventname: 'test 2',
        eventdescription: 'desc1',
        image_url: 'https://i.guim.co.uk/img/media/b5df93588386c0565177648cf41f3aff72c63400/0_217_5657_3395/master/5657.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a917ce8d52959d36bb08ad29184e2701',
        showings: [
            {
                id: 3,
                event_instance_date: "2021-01-08T08:00:00.000Z",
                starttime: "22:00:00",
                totalseats: 3,
                availableseats: 3,
            },
        ]
    }
}

describe('Event slice utils', () => {

    it('aggregateShowings', () => {
        // expect(aggregateShowings(testEventData)).toEqual(Events)
    })

})

describe('Event slice selectors', () => {
    it('selectAllEvents', () => {})
    // const InitState = {
    //     events: {
    //         data: Events,
    //         status: 'idle' as 'idle',
    //     },
    //     shop: { cart: [], donation: 0, },
    //     snackbar: {message: '', shown: false}
    // }

    // it('selectAllEvents', () => {
    //     const Events = [
    //         { eventname: 'foo Bar baz', eventdescription: 'desc1', image_url: 'https://i.guim.co.uk/img/media/b5df93588386c0565177648cf41f3aff72c63400/0_217_5657_3395/master/5657.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a917ce8d52959d36bb08ad29184e2701' },
    //         { eventname: 'test 2', eventdescription: 'desc1', image_url: 'https://i.guim.co.uk/img/media/b5df93588386c0565177648cf41f3aff72c63400/0_217_5657_3395/master/5657.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a917ce8d52959d36bb08ad29184e2701' },
    //     ]
    //     expect(selectAllEvents(InitState)).toEqual(Events)
    // })
})
