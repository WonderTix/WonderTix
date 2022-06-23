/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { DataGrid, GridCellParams } from '@material-ui/data-grid'
import { Checkbox, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RequireLogin from './RequireLogin'
import { titleCase, dayMonthDate, militaryToCivilian } from '../utils'

const renderCheckbox = ((params: GridCellParams) => <Checkbox checked={params.value as boolean} />)

const checkInGuest = async (isCheckedIn: boolean, ticketID: string) => {
    try {
        const res = await fetch(`/api/checkin`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCheckedIn, ticketID })
        })
        return res.json()
    }
    catch (err) {
        console.log(err.message)
    }
}

const renderCheckin = ((params: GridCellParams) =>
    <Checkbox
        color='primary'
        defaultChecked={params.value as boolean}
        onChange={e => checkInGuest(e.target.checked, params.getValue(params.id, 'ticketno') as string)}
    />)

const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "vip", headerName: "VIP", width: 100, renderCell: renderCheckbox },
    { field: "donorbadge", headerName: "Donor", width: 125, renderCell: renderCheckbox },
    { field: "accomodations", headerName: "Accomodations", width: 180, renderCell: renderCheckbox },
    { field: "num_tickets", headerName: "Tickets", width: 130 },
    { field: "arrived", headerName: "Arrived", width: 130, renderCell: renderCheckin },
]

type DoorListProps = {eventinstanceid: string}
export default function DoorList() {

    const { eventinstanceid } = useParams<DoorListProps>()
    const [doorList, setDoorList] = useState([])
    const [eventName, setEventName] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const getDoorList = async () => {
        try {
            const response = await fetch(`/api/doorlist?eventinstanceid=${eventinstanceid}`, {credentials: "include", method: "GET"})
            const jsonData = await response.json()

            // doorlistData.data {id: custid, name, vip, donor: donorbadge, accomodations: seatingaccom, num_tickets, checkedin, ticketno }
            setDoorList(jsonData.data)
            setEventName(jsonData.eventname)
            setDate(dayMonthDate(jsonData.eventdate))
            setTime(militaryToCivilian(jsonData.starttime))
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => { getDoorList() }, [])

    return (
        <RequireLogin>
            <Typography variant="h2">{`Showing: ${titleCase(eventName)}`}</Typography>
            <Typography gutterBottom variant="h5">{`${date}, ${time}`}</Typography>
            <DataGrid
                autoHeight
                disableSelectionOnClick
                rows={doorList}
                columns={columns}
                pageSize={10}/>
        </RequireLogin>
    )
}
