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
        paddingLeft: "10px",
        paddingRight: "10px"
    }
});
export default function EditTask() {
    const classes = useStyles();
    return (
        <Grid
        container
        spacing={1}
        className={classes.gridContainer}
        justify="center"
    >
        <Grid item xs={4} >
            <TaskForm title ='View/Edit Task' fullWidth={true} threeButtonForm={true}/>
        </Grid>
        <Grid item xs={4}>
            <Note />
        </Grid>
        <Grid item xs={4}>
            <Filter />
        </Grid>
    </Grid>
    );
}
