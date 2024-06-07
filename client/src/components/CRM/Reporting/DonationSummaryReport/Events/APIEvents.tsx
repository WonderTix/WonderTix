import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseTooltip from '@mui/material/Tooltip';
import {useAuth0} from '@auth0/auth0-react';

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

interface APIEventsComponentProps {
    begin_date: string,
    end_date: string,
}

const APIEventsComponent: React.FC<APIEventsComponentProps> = ({begin_date, end_date}) => {
    const {getAccessTokenSilently} = useAuth0();
    const beginDate = new Date(begin_date);
    const endDate = new Date(end_date);
    const renderTooltipCell = (params) => (
        <BaseTooltip title={params.value}>
          <div>{params.value}</div>
        </BaseTooltip>
    );
    /** The purpose of this function is to check if the date is within the date range that the user inputs */
    const isDateInRange = (begin_date: Date, end_date:Date, event_date: Date) => {
        // Check if event_date falls within the range
        return event_date >= begin_date && event_date <= end_date;
    };

    /** The purpose of this function is to display the event instance in a certain format
     * Result: {Weekday}, {Month} {Day} at {Time}
     */
    function display_event(dateString: number, time: string) {
        const dateStringStr = dateString.toString();
        // Parse the input string to extract year, month, and day components
        const year = parseInt(dateStringStr.substring(0, 4), 10);
        const month = parseInt(dateStringStr.substring(4, 6), 10) - 1; // Month is zero-based
        const day = parseInt(dateStringStr.substring(6, 8), 10);

        const date = new Date(year, month, day);

        // Get the weekday, month name, and day number with suffix
        const options: Intl.DateTimeFormatOptions = {weekday: 'long', month: 'long', day: 'numeric'};
        const formattedDate: string = date.toLocaleDateString('en-US', options);
        let day_suffix = '';

        // Getting the day suffix
        if (day >= 11 && day <= 13) {
            day_suffix = 'th';
        }
        switch (day % 10) {
            case 1: day_suffix ='st'; break;
            case 2: day_suffix = 'nd'; break;
            case 3: day_suffix = 'rd'; break;
            default: day_suffix = 'th'; break;
        }

        // Getting the time
        const time_date = new Date(time);
        const hours = time_date.getUTCHours();
        const display_hours = (hours % 12 || 12).toString();
        const minutes = time_date.getUTCMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        return `${formattedDate}${day_suffix} at ${display_hours}:${minutes} ${ampm}`;
    }

    /*
    ?'. + new URLSearchParams({
                begindate: begin_date,
                enddate: end_date,
            }),
    */

    const getDonations = async () => {
        try {
            const token = await getAccessTokenSilently({
              audience: process.env.REACT_APP_ROOT_URL,
              scope: 'admin',
            });
            fetch(process.env.REACT_APP_API_2_URL + '/donation-overview', {
                method: 'GET',
                credentials: 'include',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Filter dates
                const info = data.filter((donation) =>
                    isDateInRange(beginDate, endDate, new Date(donation.order.orderdatetime)),
                );
                return info;
            })
            .then((data) => {
                const info = data.flatMap((donation, index) => {
                    const date = new Date(donation.order.orderdatetime);
                    const donationInstance = {
                        id: index,
                        donationdate: date.toDateString(),
                        donationid: donation.donationid,
                        orderid: donation.orderid_fk,
                        amount: donation.amount,
                        anonymous: donation.anonymous,
                        frequency: donation.frequency,
                        comments: donation.comments,
                    };
                    return donationInstance;
                });
                setRows(info);
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const [rows, setRows] = useState<any[]>([]);
    begin_date = begin_date.split('/').join('-');
    end_date = end_date.split('/').join('-');
    useEffect(() => {
        getDonations();
    }, [begin_date, end_date]);

    const header_columns: GridColDef[] = [
        // Define your columns here
        {field: 'donationdate', headerName: 'Date', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'donationid', headerName: 'Donation', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'orderid', headerName: 'Order', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'amount', headerName: 'Amount', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'anonymous', headerName: 'Anonymous', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'frequency', headerName: 'Frequency', flex: 1.5, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
        {field: 'comments', headerName: 'Comments', flex: 3, align: 'right', headerAlign: 'right', sortable: true, renderCell: renderTooltipCell},
    ];

    return (
        <div className='bg-slate-50'>
            <DataGrid className='my-3 mx-2'
                rows={rows}
                columns={header_columns}
                headerHeight={80}
                rowHeight={50}
                disableSelectionOnClick={true}
                disableColumnFilter={true}
                hideFooter={true}
                autoHeight={true}
                pageSize={100}
                style={{borderRadius: 0}}
                sx={{
                    '& .MuiDataGrid-cell': {
                        fontSize: '12px',
                    },
                }}
            />
        </div>
    );
};

export default APIEventsComponent;
