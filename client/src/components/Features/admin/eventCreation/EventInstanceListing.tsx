/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import { useState } from "react";
import { Grid, Paper, Fab, TextField, makeStyles } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/Remove";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

type CreatedEventInstanceProps = {
    id: number,
    eventDate: Date,
    startTime: string,
    totalSeats: number,

};

const useStyles = makeStyles({
    root: {
        marginTop: "20px",
        height: "50px"
    },
    chip: {
        marginTop: "5px",
    }
})

export default function EventInstanceListing({id, eventDate, startTime, totalSeats}: CreatedEventInstanceProps) {
    const classes = useStyles();
    const [isEditMode, setIsEditMode] = useState<boolean>(true);

    const onEditTime = () => {
        setIsEditMode(!isEditMode);
    }

    const onRemoveTime = (id: number) => {
        console.log("Removing id: " + id);
    }

    return(
        <Grid container component={Paper} className={classes.root}>
            <Grid item xs={1}>
                <Chip label={ id } color={isEditMode ? "primary" : "secondary"} className={ classes.chip }/>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    defaultValue={ eventDate.toISOString().slice(0, 10) }
                    disabled={ isEditMode }
                    type="date"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    defaultValue={ startTime }
                    disabled={ isEditMode }
                    type="time"
                />
            </Grid>
            <Grid item xs={1}>
                <TextField
                    defaultValue={ totalSeats } 
                    disabled={ isEditMode }
                    type="number"
                />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={1}>
                <Fab size="small" onClick={() => onEditTime()}>
                    {
                        isEditMode ? <EditRoundedIcon /> : <CheckCircleIcon />
                    }
                </Fab>
            </Grid>
            <Grid item xs={1}>
                <Fab size="small" onClick={() => onRemoveTime(id)}>
                    <RemoveIcon />
                </Fab>
            </Grid>
        </Grid>
    )
}
