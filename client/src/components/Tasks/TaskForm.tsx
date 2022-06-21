import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {createNewTaskTextFieldLabels} from '../../utils/arrays';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {makeStyles} from '@mui/styles';
import SearchBar from './Search';

const useStyles = makeStyles({
  root: {
    border: '1px solid black',
    padding: '30px',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#f8f9fa',
  },
  gridItem: {
    backgroundColor: 'white',
  },
});

/**
 * @param {any} props Properties to be passed through to TaskForm
 * @return {React.ReactElement} TaskForm HTML Element
 */
const TaskForm = (props: any): React.ReactElement => {
  // const [beginValue, setBeginValue] = React.useState(null);
  // const [formValues, setFormValues] = React.useState();
  // const [taskId, setTaskId] = React.useState(0);
  // const [parentId, setParentId] = React.useState(0);
  // const [subject, setSubject] = React.useState('');
  // const [parentSubject, setParentSubject] = React.useState('');
  // const [status, setStatus] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(null);
  const [assignTo, setAssignTo] = React.useState('');
  const [relatedRecords, setRelatedRecords] = React.useState();
  // const [description, setDescription] = React.useState('');

  const classes = useStyles();

  // useEffect(() => {}, [beginValue]);

  /**
   * @return {void}
   */
  const handleClick = (): void => {
    // console.log(taskId);
    // console.log(parentId);
    // console.log(subject);
    // console.log(parentSubject);
    console.log(dueDate);
    // console.log(status);
    console.log(assignTo);
    console.log(relatedRecords);
    // console.log(description);
    console.log('alskdjflsdf');
  };


  return (
    <form className={classes.root}>
      <h1>{props.title}</h1>
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={6}>
          <TextField
            className={classes.gridItem}
            key={createNewTaskTextFieldLabels[0].label}
            id={createNewTaskTextFieldLabels[0].id}
            label={createNewTaskTextFieldLabels[0].label}
            variant="outlined"
            size="small"
            sx={{mb: 1}}
            fullWidth={true}
            // disabled={true}
            // onChange={() => {setTaskId(0)}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.gridItem}
            key={createNewTaskTextFieldLabels[1].label}
            id={createNewTaskTextFieldLabels[1].id}
            label={createNewTaskTextFieldLabels[1].label}
            variant="outlined"
            size="small"
            sx={{mb: 1}}
            fullWidth={true}
            // disabled={true}
            // onChange={setParentId}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.gridItem}
            key={createNewTaskTextFieldLabels[2].label}
            id={createNewTaskTextFieldLabels[2].id}
            label={createNewTaskTextFieldLabels[2].label}
            variant="outlined"
            size="small"
            sx={{mb: 1}}
            fullWidth={true}
            // onChange={setSubject}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.gridItem}
            key={createNewTaskTextFieldLabels[3].label}
            id={createNewTaskTextFieldLabels[3].id}
            label={createNewTaskTextFieldLabels[3].label}
            variant="outlined"
            size="small"
            sx={{mb: 1}}
            fullWidth={true}
            // disabled={true}
            // onChange={setParentSubject}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{width: '100%'}} className={classes.gridItem}>
            <InputLabel
              id={createNewTaskTextFieldLabels[4].id}
              // label={createNewTaskTextFieldLabels[4].label}
            >
              Status:
            </InputLabel>
            <Select
              fullWidth
              id="search-select"
              labelId="search-label"
              // </FormControl>onChange={setStatus}
            >
              <MenuItem value={0}>Not Started</MenuItem>
              <MenuItem value={1}>In Progress</MenuItem>
              <MenuItem value={2}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              // id="due-date"
              value={dueDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                  }}
                />
              )}
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              // fullWidth={true}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <SearchBar data="Assign To" onChange={setAssignTo}></SearchBar>
        </Grid>
        <Grid item xs={6}>
          <SearchBar data="Related Record" onChange={setRelatedRecords}/>
        </Grid>

        <Grid item xs={12}>
          <TextField
            className={classes.gridItem}
            label="Task Description"
            id="task-description"
            variant="outlined"
            multiline={true}
            rows={5}
            maxRows={10}
            size="small"
            sx={{mb: 1}}
            fullWidth={true}
            // onChange={setDescription}
          />
        </Grid>
        <Grid item xs={12}>
          {!props.threeButtonForm ?
            <Button variant='contained' onClick={()=>{
              handleClick();
            }}>{props.name}</Button> :
            <Box style={{display: 'flex', justifyContent: 'center'}}>
              <Button
                variant="contained"
                style={{marginRight: '0.25rem'}}
              >
                New Task
              </Button>
              <Button
                variant="contained"
                style={{marginRight: '0.25rem'}}
              >
                Sub Task
              </Button>
              <Button
                variant="contained"
              >
                Edit Task
              </Button>
            </Box>
          }
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;
