/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
import {useAppDispatch, appSelector} from '../../app/hooks';
import {addTicketToCart, selectCartTicketCount, Ticket} from './ticketingSlice';
import {openSnackbar} from '../snackbarSlice';
import {
  Collapse,
  InputLabel, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Button, Typography,
  makeStyles, Theme,
} from '@material-ui/core';
import MultiSelectCalendar from '../../components/MultiSelectCalendar';
import EventInstanceSelect from '../events/EventInstanceSelect';
import {range} from '../../utils';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import {useReducer} from 'react';

interface TicketPickerState {
    selectedDate?: Date,
    displayedShowings: Ticket[],
    selectedTicket?: Ticket,
    qty: number,
    concessions: boolean,
    showCalendar: boolean,
    showTimes: boolean,
    showClearBtn: boolean,
    prompt: 'selectDate' | 'selectTime' | 'showSelection',
}

const initialState: TicketPickerState = {
  displayedShowings: [],
  qty: 0,
  concessions: false,
  showCalendar: true,
  showTimes: false,
  showClearBtn: false,
  prompt: 'selectDate',
};

// Action creators
const dateSelected = (d: Date, t: Ticket[]) => ({type: 'date_selected', payload: {date: d, tickets: t}});
const timeSelected = (t: Ticket) => ({type: 'time_selected', payload: t});
const resetWidget = () => ({type: 'reset'});
const changeQty = (n: number) => ({type: 'change_qty', payload: n});

const TicketPickerReducer = (state: TicketPickerState, action: any): TicketPickerState => {
  switch (action.type) {
    case 'date_selected': {
      const {tickets, date} = action.payload;
      const sameDayShows = tickets.filter((t: Ticket) => isSameDay(date, t.date));
      return {
        ...state,
        selectedDate: date,
        selectedTicket: undefined,
        displayedShowings: sameDayShows,
        showCalendar: false,
        showTimes: true,
        showClearBtn: true,
        prompt: 'selectTime',
      };
    }
    case 'time_selected': {
      return {...state, selectedTicket: action.payload, showTimes: false, prompt: 'showSelection'};
    }
    case 'reset': {
      return initialState;
    }
    case 'change_qty': {
      return {...state, qty: action.payload};
    }
    case 'toggle_concession': {
      return {...state, concessions: !state.concessions};
    }
    default:
      throw new Error('Received undefined action type');
  }
};

interface TicketPickerProps {
    tickets: Ticket[]
}
const TicketPicker = ({tickets}: TicketPickerProps) => {
  const [{
    qty,
    concessions,
    prompt,
    selectedDate,
    displayedShowings,
    selectedTicket,
    showCalendar,
    showTimes,
    showClearBtn,
  }, dispatch] = useReducer(TicketPickerReducer, initialState);

  const classes = useStyles();
  const appDispatch = useAppDispatch();
  const cartTicketCount = appSelector(selectCartTicketCount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicket && qty) {
      appDispatch(addTicketToCart({id: selectedTicket.event_instance_id, qty, concessions}));
      appDispatch(openSnackbar(`Added ${qty} ticket${qty === 1 ? '' : 's'} to cart!`));
      dispatch(resetWidget());
    }
  };

  const numAvail = selectedTicket ?
        cartTicketCount[selectedTicket.event_instance_id] ?
            selectedTicket.availableseats - cartTicketCount[selectedTicket.event_instance_id] :
            selectedTicket.availableseats :
        0;

  const promptMarkup = {
    selectDate: <Typography variant='subtitle1'>Select date below ({tickets.length} showings)</Typography>,
    selectTime: <Typography variant='subtitle1'>
      {selectedDate ? format(selectedDate, 'eee, MMM dd') : ''}
      <b> - Choose time:</b>
    </Typography>,
    showSelection: <Typography variant='subtitle1'>
      {selectedTicket ? format(selectedTicket.date, 'eee, MMM dd - h:mm a') : ''}
    </Typography>,
  };

  return (
    <>
      <Collapse in={showClearBtn}>
        <Button onClick={() => dispatch(resetWidget())} className={classes.changeDateBtn} variant='outlined'>
                    Choose different date
        </Button>
      </Collapse>
      {promptMarkup[prompt]}
      <Collapse in={showCalendar}>
        <MultiSelectCalendar
          value={tickets.map((t) => t.date)}
          onDateClicked={(d) => dispatch(dateSelected(d, tickets))}
          bindDates
        />
      </Collapse>
      <Collapse in={showTimes}>
        <EventInstanceSelect
          eventInstances={displayedShowings}
          eventInstanceSelected={(t) => dispatch(timeSelected(t))}
        />
      </Collapse>
      <FormControl className={classes.formControl}>
        <InputLabel id="qty-select-label">
          {selectedTicket ?
                        (numAvail > 0) ? 'Quantity' : 'Can\'t add more to cart' :
                        'Quantity (select ticket)'
          }
        </InputLabel>
        <Select
          labelId="qty-select-label"
          value={qty}
          disabled={selectedTicket===undefined || numAvail < 1}
          onChange={(e) => dispatch(changeQty(e.target.value as number))}
          MenuProps={{classes: {paper: classes.menuPaper}}}
        >
          {range(numAvail, false).map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <FormControlLabel
          label='Add concessions ticket'
          control={
            <Checkbox
              disabled={!selectedTicket}
              checked={concessions}
              onChange={(e) => dispatch({type: 'toggle_concession'})} name='concessions' />
          }
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button
          disabled={!qty || !selectedTicket || qty > selectedTicket.availableseats}
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
                    Get Tickets
        </Button>
      </FormControl>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  changeDateBtn: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    // textDecoration: 'underline',
    padding: theme.spacing(2),
    fontSize: '0.8em',
  },
  menuPaper: {
    maxHeight: '200px',
  },
  boundWidth: {
    maxWidth: '100%',
  },
}));


export default TicketPicker;

