/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { RootState } from '../../app/store'
import { INITIAL_STATE as eventsInitState} from '../events/eventsSlice'
import ticketReducer, {
    addTicketToCart,
    editItemQty,
    Ticket,
    Event,
    ticketingState,
    selectEventData,
    selectCartTicketCount,
    selectCartItem,
    selectCartSubtotal,
} from './ticketingSlice'
import { User } from '../../../server/server'

const event: Event = {
    id: '1',
    title: 'Event 1',
    description: 'lorem ipsum donor',
    image_url: 'https://image'
}

const ticket: Ticket = {
    event_instance_id: 1,
    eventid: '1',
    admission_type: 'General Admission',
    date: new Date('2021-07-31T19:00:00'),
    ticket_price: 15.99,
    concession_price: 4.99,
    availableseats: 34
}
const ticket2: Ticket = {
    event_instance_id: 2,
    eventid: '1',
    admission_type: 'General Admission',
    date: new Date('2021-08-07T16:00:00'),
    ticket_price: 19.99,
    concession_price: 9.99,
    availableseats: 20
}

const ticketingInitState: ticketingState = {
    cart: [],
    tickets: {
        byId: {
            1: ticket,
            2: ticket2
        },
        allIds: [1,2]
    },
    events: [event],
    status: 'idle',
}

const ROOT_INIT_STATE: RootState = {
    user: {username: 'user1', id: 1, is_superadmin: false},
    events: eventsInitState,
    snackbar: {message: '', shown: false},
    ticketing: ticketingInitState
}


describe('ticketing slice', () => {
    const newCartItem = {
        product_id: ticket.event_instance_id,
        qty: 1,
        name: 'Event 1 Ticket',
        desc: 'General Admission - Sat, Jul 31 - 7:00 PM',
        product_img_url: 'https://image',
        price: 15.99,
    }

    const concessionsItem = {
        ...newCartItem,
        name: 'Event 1 Ticket + Concessions',
        price: newCartItem.price + ticket.concession_price,
        desc: newCartItem.desc + ' with concessions ticket'
    }

    describe('selectors', () => {

        const item1 = {
            product_id: 1,     // references state.tickets.event_instance_id
            qty: 2,
            name: 'thing',
            desc: 'desc1',
            product_img_url: 'www.com',
            price: 2.99,
        }
        const init: RootState = {
            ...ROOT_INIT_STATE,
            ticketing: {
                ...ROOT_INIT_STATE.ticketing,
                cart: [
                    item1,
                {
                    product_id: 2,     // references state.tickets.event_instance_id
                    qty: 4,
                    name: 'thing2',
                    desc: 'desc2',
                    product_img_url: 'www.com',
                    price: 3.99,
                }]
            }
        }

        it('selectCartSubtotal', () => {
            expect(selectCartSubtotal(init)).toEqual(item1.price*item1.qty + 4*3.99)
        })

        it('selectCartItem', () => {
            expect(selectCartItem(init, 1))
                .toEqual(item1)
        })

        it('selectCartTicketCount', () => {
            expect(selectCartTicketCount(init))
                .toEqual({1: 2, 2: 4})
        })

        it('selectEventData', () => {
            const eventid = '1'
            expect(selectEventData(ROOT_INIT_STATE, eventid))
                .toEqual({
                    title: 'Event 1',
                    description: 'lorem ipsum donor',
                    image_url: 'https://image',
                    tickets: [{
                        event_instance_id: 1,
                        eventid: '1',
                        admission_type: 'General Admission',
                        ticket_price: 15.99,
                        concession_price: 4.99,
                        availableseats: 34,
                        date: new Date('2021-07-31T19:00:00')
                    },{
                        event_instance_id: 2,
                        eventid: '1',
                        admission_type: 'General Admission',
                        ticket_price: 19.99,
                        concession_price: 9.99,
                        availableseats: 20,
                        date: new Date('2021-08-07T16:00:00')
                    }]
                })
        })
    
        it('Date data is deserialized', () => {
            const eventid = '1'
            const eventData = selectEventData(ROOT_INIT_STATE, eventid)
            expect(eventData!.tickets[0].date instanceof Date).toEqual(true)
        })
    })
    
    describe('reduers', () => {
        let init = ticketingInitState
        it('addTicketReducer: new ticket', () => {
            const payload = {id: 1, qty: 1, concessions: false}
            const res = ticketReducer(init, addTicketToCart(payload))
            expect(res)
                .toEqual({
                    ...ticketingInitState,
                    cart: [newCartItem]
                })
            init = res
        })

        it('addTicketReducer: exists in cart', () => {
            const payload = {id: 1, qty: 1, concessions: false}
            expect(ticketReducer(init, addTicketToCart(payload)))
                .toEqual({
                    ...init,
                    cart: [{...newCartItem, qty: 2}]
                })
        })

        it('addTicketReducer: in cart & add concessions', () => {
            const res = ticketReducer(init, addTicketToCart({id: 1, qty: 1, concessions: true}))
            expect(res).toEqual({...init, cart: [{...concessionsItem, qty: 2}]})
            init = res
        })

        it('addTicketReducer: in cart (w/ concession) & add w/o concessions', () => {
            const res = ticketReducer(init, addTicketToCart({id: 1, qty: 1, concessions: false}))
            expect(res).toEqual({...init, cart: [{...concessionsItem, qty: 3}]})
            init = res
        })

        // ticket 1 currently in cart
        it("editItemQty: can set qty = available", () => {
            expect(ticketReducer(init, editItemQty({id: 1, qty: ticket.availableseats})))
                .toEqual({...init, cart: [{...concessionsItem, qty: ticket.availableseats}]})
        })

        it("editItemQty: can't set qty > available", () => {
            expect(ticketReducer(init, editItemQty({id: 1, qty: ticket.availableseats + 1})))
                .toEqual({...init, cart: [{...concessionsItem, qty: 3}]})
        })

        it('editItemQty: item exists in cart', () => {
            const res = ticketReducer(init, editItemQty({id: 1, qty: 4}))
            expect(res)
                .toEqual({...init, cart: [{...concessionsItem, qty: 4}]})
            init = res
        })
            
        it('editItemQty: item not in cart', () => {
            expect(ticketReducer(init, editItemQty({id: 2, qty: 4})))
                .toEqual({...init})
        })

        it("editItemQty: can't set negative qty", () => {
            expect(ticketReducer(init, editItemQty({id: 1, qty: -1})))
                .toEqual({...init, cart: [{...concessionsItem, qty: 0}]})
        })

    })
})



