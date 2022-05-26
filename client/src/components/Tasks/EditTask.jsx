import React, { useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper"; 
import { Container } from '@material-ui/core';
import TaskForm from "./TaskForm";
import Note from "./Note.jsx"; 
import Filter from "./Filter.jsx";
import { makeStyles } from "@mui/styles";


// export default function EditTask() {
//     return(

//         <div className="parent-component">
//             <div className="create-component"><TaskForm title = 'View/Edit Task'/></div>
//             <div className="Note-component"><Note/></div> 
//             <div className="filter-component"><Filter/></div>
//         </div>
//     )
// }

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"
    }
});
export default function EditTask() {
    const classes = useStyles();
    return (
        <Grid
        container
        spacing={2}
        className={classes.gridContainer}
        justify="center"
    >
        <Grid item xs={5} >
            <TaskForm title='View/Edit Task' fullWidth={true} name='Create New Task'/>
        </Grid>
        <Grid item xs={3}>
            <Note />
        </Grid>
        <Grid item xs={3}>
            <Filter />
        </Grid>
    </Grid>
    );
}
