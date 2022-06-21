import React from 'react';
import Grid from '@material-ui/core/Grid';
import TaskForm from './TaskForm';
import Note from './Note';
import Filter from './Filter';
import {makeStyles} from '@mui/styles';


const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
});

/**
 * @return {React.ReactElement} HTMLElement for EditTask
 */
const EditTask = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      className={classes.gridContainer}
    >
      <Grid item xs={6} >
        <TaskForm
          title='View/Edit Task'
          fullWidth={true}
          threeButtonForm={true}
        />
      </Grid>
      <Grid item xs={3}>
        <Note />
      </Grid>
      <Grid item xs={3}>
        <Filter />
      </Grid>
    </Grid>
  );
};

export default EditTask;
