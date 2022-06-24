import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TextField} from '@material-ui/core';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {MenuItem} from '@material-ui/core';
import {FormControl} from '@material-ui/core';
import {InputLabel} from '@material-ui/core';
import {Select} from '@material-ui/core';

/**
 * @return {React.ReactElement}
 */
const OutlinedCard = (): React.ReactElement => {
  const [toDate, setToDate] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [status, setStatus] = React.useState();
  const [isOpen, setOpen] = React.useState(false);

  /**
   * @param {any} props Properties to be passed to Item
   * @return {React.ReactElement} HTMLElement for Item
   */
  const Item = (props: any): React.ReactElement => {
    const {sx, ...other} = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) => {
            (theme.palette.mode === 'dark' ? '#101010' : '#fff');
          },
          color: (theme) => {
            (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800');
          },
          border: '1px solid',
          borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
                  Filter tasks by:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div style = {{display: 'flex', flexDirection: 'row'}}>
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  size="small"
                  style={{
                    backgroundColor: 'white',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                />
              )}
            />
            <DatePicker
              label="To"
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
              }}
              renderInput={(params:any) => (
                <TextField
                  {...params}
                  size="small"
                  style={{
                    backgroundColor: 'white',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                />
              )}
            />
          </div>
        </LocalizationProvider>
        <FormControl sx={{width: '100%', my: 2}}>
          <InputLabel
            id='set-status'
          >
                  Status:
          </InputLabel>
          <Select
            size="small"
            fullWidth
            id="set-status"
            labelId="Status"
            onChange={((newStatus: any) => {
              setStatus(newStatus);
              console.log(status);
            })}
          >
            <MenuItem value={0}>Not Started</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Completed</MenuItem>
          </Select>
        </FormControl>
        <CardActions>
          <Button
            onClick={() => {
              setOpen(true);
              console.log(isOpen);
            }}
            variant="contained"
            size="small"
          >
            Confirm
          </Button>
        </CardActions>
        <div className = "note-card">
          <Item>
            <Typography variant="body2">
                      Task 1
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
                      Task 2
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
                      Task 3
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
                      Task 4
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
                      Task 4
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
                      Task 4
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
                      Task 4
            </Typography>
          </Item>
          <Item>
            <Typography variant="body2">
                      Task 4
            </Typography>
          </Item>
        </div>
      </CardContent>
    </React.Fragment>
  );

  return (
    <div
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }
      }
    >
      <Box
        sx={
          {
            display: 'grid',
            mt: 4,
            width: '100%',
            height: 450,
            maxWidth: 360,
            bgcolor: 'text.disabled',
            border: 1,
            borderColor: 'text.primary',
          }
        }
      >
        <Card variant="outlined">{card}  </Card>
      </Box>
    </div>
  );
};

export default OutlinedCard;
