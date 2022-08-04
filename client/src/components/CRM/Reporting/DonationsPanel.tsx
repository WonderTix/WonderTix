import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {donationFiltersTextField} from '../../../utils/arrays';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DonationsPanel = ({
  fetchData,
  setOpen,
  savedName,
  setSavedName,
}: {
  fetchData: any,
  setOpen: any,
  savedName: any,
  setSavedName: any,
}) => {
  const [dononame, setDononame] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [beginValue, setBeginValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());

  React.useEffect(() => {
    if (savedName === '') return;

    /* TODO
      Dynamic queries/Filter no longer being used by API.
      Need to redesign these POST requests.
    */

    const body = {
      table_name: savedName,
      query_attr: `donations/?${parseUrl()}`,
    };

    fetch(process.env.REACT_APP_ROOT_URL + `/api/saved_reports`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }).then((res) => console.log(res));

    setSavedName('');
  });

  const parseUrl = () => {
    const filters = [];

    if (dononame !== '') {
      filters.push(`filters[dononame][$contains]=${dononame}`);
    }
    if (amount !== '') filters.push(`filters[amount][$gt]=${amount}`);
    if (beginValue) {
      filters.push(`filters[donodate][$gt]=${beginValue.toLocaleString()}`);
    }
    if (endValue) {
      filters.push(`filters[donodate][$lt]=${endValue.toLocaleString()}`);
    }

    return filters.join('&');
  };

  const handleChange = (e: any) => {
    switch (e.target.id) {
      case 'dononame':
        setDononame(e.target.value);
        break;
      case 'amount':
        setAmount(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {donationFiltersTextField.map((filter) => {
        return (
          <input type="text" placeholder={filter.label}
            key={filter.id}
            id={filter.id}
            className="input w-full max-w-xs border
             border-zinc-300 p-3 mb-3 rounded-xl "
            onChange={handleChange} />
        );
      })}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className='flex flex-col  gap-2'>
          <div className='text-sm text-zinc-500'>Start from</div>
          <DatePicker selected={beginValue}
            onChange={(date:Date) => setBeginValue(date)} value={beginValue}
            className='border border-zinc-200 text-sm px-2 py-3 rounded-xl' />
          <div className='text-sm text-zinc-500'>To</div>
          <DatePicker selected={endValue}
            onChange={(date:Date) => setEndValue(date)} value={endValue}
            className='border border-zinc-200 text-sm
            px-2 py-3 rounded-xl mb-2' />
        </div>
      </LocalizationProvider>
      <div className='flex flex-col gap-2 mt-2'>
        <button className='bg-blue-600 text-white px-6 py-2
              rounded-xl shadow-xl hover:scale-105 duration-300
               hover:bg-blue-800' onClick={() => fetchData(parseUrl())}>
                 Run</button>
        <button className='bg-blue-600 text-white px-6 py-2
              rounded-xl shadow-xl hover:scale-105 duration-300
               hover:bg-blue-800' onClick={() => setOpen(true)}>Save</button>
      </div>
    </div>
  );
};

export default DonationsPanel;
