import React, { useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper"; 
import { Container } from '@material-ui/core';
import TaskForm from "./TaskForm";
import Note from "./Note.jsx"; 


export default function EditTask() {
    return(
        <div className="parent-component">
            <div className="create-component"><TaskForm/></div>
            <div className="Note-component"><Note/></div> 
            <div className="filter-component">this is filter</div>
        </div>
    )
}
