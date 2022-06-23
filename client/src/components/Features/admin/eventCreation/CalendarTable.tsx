/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Fab,
    Paper,
    Grid,
    makeStyles
} from "@material-ui/core";
import NavigationBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CalendarEntry from './CalendarEntry';

type CalendarTableProps = {
    targetMonth: number,
    targetYear: number,
    onSelectDaysOfWeek: (dayOfWeek: number) => any,
    onSelectDay: (key: number, fullDate: Date | null) => any,
    onMonthDecr: () => any,
    onMonthIncr: () => any,
}

const useStyles = makeStyles({
    calHeader: {
        marginTop: "20px"
    },
    headerBtns: {
        alignItems: "flex-end"
    }
})

export default function CalendarTable({targetMonth, targetYear, onSelectDaysOfWeek, onSelectDay, onMonthDecr, onMonthIncr} : CalendarTableProps) {
    const classes = useStyles();
    const [monthTable, setMonthTable] = useState<any>([]);
    const [monthName, setMonthName] = useState("");

    useEffect(() => {
        makeCalendarTable();
    }, [targetMonth, targetYear, onSelectDay]);

    // Create the calendar
    const makeCalendarTable = () => {
        let month = targetMonth;
        let year = targetYear;
        let dt = new Date(year, month);
        let table = [];

        setMonthName(Intl.DateTimeFormat("en-us", { month: "long"}).format(new Date(targetYear, targetMonth)));

        // Any days before the first of the month are blank
        for (let i = 0; i < dt.getDay(); i++) {
            table.push(
                <CalendarEntry
                    calKey={table.length}
                    day={0}
                    fullDate={null}
                    onCalendarClick={onSelectDay}
                />
            )
        }

        // Actual days of the month
        while (dt.getMonth() === month) {
            table.push(
                <CalendarEntry
                    calKey={table.length}
                    day={dt.getDate()}
                    fullDate={new Date(year, month, dt.getDate())}
                    onCalendarClick={onSelectDay}
                />
            )
            dt.setDate(dt.getDate() + 1);
        }

        if (dt.getDate() !== 0) {
            for (let i = 0; i < 7; i++) {
                table.push(
                    <CalendarEntry
                        calKey={table.length}
                        day={0}
                        fullDate={null}
                        onCalendarClick={onSelectDay}
                    />
                )
            }
        }
        setMonthTable(table);
    }

    return(
        <>
            <Grid container className={classes.calHeader}>
                <Grid item xs={6}>
                    <h3>{monthName} {targetYear}</h3>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={2} className={classes.headerBtns}>
                    <Fab size="small" onClick={onMonthDecr}><NavigationBeforeIcon /></Fab>
                    <Fab size="small" onClick={onMonthIncr}><NavigateNextIcon /></Fab>
                </Grid>
            </Grid>
            <TableContainer component={Paper} key={targetMonth}>
                <Table aria-label="Calendar">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ cursor: "pointer" }} align="center" onClick={() => onSelectDaysOfWeek(0)}>Sunday</TableCell>
                            <TableCell style={{ cursor: "pointer" }} align="center" onClick={() => onSelectDaysOfWeek(1)}>Monday</TableCell>
                            <TableCell style={{ cursor: "pointer" }} align="center" onClick={() => onSelectDaysOfWeek(2)}>Tuesday</TableCell>
                            <TableCell style={{ cursor: "pointer" }} align="center" onClick={() => onSelectDaysOfWeek(3)}>Wednesday</TableCell>
                            <TableCell style={{ cursor: "pointer" }} align="center" onClick={() => onSelectDaysOfWeek(4)}>Thursday</TableCell>
                            <TableCell style={{ cursor: "pointer" }} align="center" onClick={() => onSelectDaysOfWeek(5)}>Friday</TableCell>
                            <TableCell style={{ cursor: "pointer" }} align="center" onClick={() => onSelectDaysOfWeek(6)}>Saturday</TableCell>
                        </TableRow>
                    </TableHead>   
                    <TableBody>
                        <TableRow>{monthTable.slice(0, 7)}</TableRow>     
                        <TableRow>{monthTable.slice(7, 14)}</TableRow>     
                        <TableRow>{monthTable.slice(14, 21)}</TableRow>     
                        <TableRow>{monthTable.slice(21, 28)}</TableRow>     
                        <TableRow>{monthTable.slice(28, 35)}</TableRow>     
                    </TableBody>                 
                </Table>
            </TableContainer>
        </>
    )
}
