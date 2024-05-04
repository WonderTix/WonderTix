import {FormButton} from '../../Ticketing/ticketingmanager/Event/components/FormButton';
import {PlusIcon} from '../../Ticketing/Icons';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {defaultQueryOptions} from './contactUtils';
import React, {useState} from 'react';

interface SearchBoxProps {
  onSearch: () => void;
  queries: {parameter: string; value: string}[];
  defaultParameters: object;
  updateQueries: (index, type: string, value: string) => void;
  addQuery: (parameter: string) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const {onSearch, queries, defaultParameters, updateQueries, addQuery} = props;
  const [parameters, setParameters] = useState([
    ...Object.keys(defaultParameters),
  ]);

  return (
    <aside className='text-md bg-white p-3 mb-4 rounded-xl grid'>
      <div className='flex flex-row justify-between mb-2 text-white'>
        <button
          data-test-id='contact-search-button'
          onClick={() => onSearch()}
          className='text-white bg-blue-500 hover:bg-blue-600 rounded-2xl py-1 px-4 shadow-xl hover:ring hover:ring-blue-300 hover:ring-offset-1'
        >
          Search
        </button>
        <FormButton
          className='text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-2xl shadow-xl hover:ring hover:ring-green-300 hover:ring-offset-1'
          disabled={!parameters.length}
          testID='add-search-parameter-button'
          title='Add search parameter'
          onClick={() => addQuery(parameters[0])}
        >
          <PlusIcon className='h-8 w-8' />
        </FormButton>
      </div>
      <div className='border border-zinc-300 p-3 grid gap-2 rounded-xl max-h-[150px] overflow-y-scroll'>
        {queries.map(({parameter, value}, index) => (
          <div key={index} className='grid min-[425px]:grid-cols-2 gap-2'>
            <FormControl>
              <InputLabel id={`search-parameter-select-label-${index}`}>
                Search
              </InputLabel>
              <Select
                labelId={`search-parameter-select-label-${index}`}
                id={`search-parameter-select-${index}`}
                value={parameter}
                size='small'
                label='Search'
                onChange={(event) =>
                  updateQueries(index, 'parameter', event.target.value)
                }
              >
                {queries.length > 1 && <MenuItem value=''>Remove</MenuItem>}
                {parameters.map((cur, index) => (
                  <MenuItem key={index} value={cur}>
                    {defaultQueryOptions[cur]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id={`search-value-${index}`}
              size='small'
              label='Value'
              onChange={(event) =>
                updateQueries(index, 'value', event.target.value)
              }
              value={value}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SearchBox;

