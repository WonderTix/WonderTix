import React from 'react';
import {FormButton} from '../../Ticketing/ticketingmanager/Event/components/FormButton';
import {PlusIcon, SearchIcon} from '../../Ticketing/Icons';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

interface SearchBoxProps {
  onSearch: () => void;
  queries: {parameter: string; value: string}[];
  defaultParameters: {[key: string]: string};
  updateQueries: (index: number, type: string, value: string) => void;
  addQuery: (parameter: string) => void;
  header?: string;
  queryMax?: number;
}

const SearchBox = (props: SearchBoxProps) => {
  const {onSearch, queries, defaultParameters, updateQueries, addQuery, header, queryMax} = props;
  const parameters = [...Object.keys(defaultParameters)];

  return (
    <aside className='text-md bg-white p-3 mb-4 rounded-xl grid'>
      <div className='grid grid-cols-2 mb-2 text-white'>
        {header && <h2 className='text-zinc-500 font-semibold text-xl flex items-center'>{header}</h2>}
        <div className='col-start-2 flex flex-row justify-end gap-2'>
        <FormButton
          testID='contact-search-button'
          title='Search'
          disabled={false}
          onClick={() => onSearch()}
          className='text-white bg-blue-500 hover:bg-blue-600 rounded-xl p-1 shadow-xl hover:ring hover:ring-blue-300 hover:ring-offset-1 justify-self-end'
        >
          <SearchIcon className='h-8 w-8'/>
        </FormButton>
        <FormButton
          className='text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-xl p-1 shadow-xl hover:ring hover:ring-green-300 hover:ring-offset-1 justify-self-end'
          disabled={!parameters.length || queryMax && queries.length >= queryMax}
          testID='add-search-parameter-button'
          title='Add Search Field'
          onClick={() => addQuery(parameters[0])}
        >
          <PlusIcon className='h-8 w-8' />
        </FormButton>
        </div>
      </div>
      <div className='border border-zinc-300 p-3 grid gap-2 rounded-xl max-h-[150px] overflow-y-scroll'>
        {queries.map(({parameter, value}, index) => (
          <div key={index} className='grid min-[425px]:grid-cols-2 gap-2'>
            <FormControl>
              <InputLabel id={`search-parameter-select-label-${index}`}>
                Search Field
              </InputLabel>
              <Select
                labelId={`search-parameter-select-label-${index}`}
                id={`search-parameter-select-${index}`}
                value={parameter}
                size='small'
                label='Search Field'
                onChange={(event) =>
                  updateQueries(index, 'parameter', event.target.value)
                }
              >
                {queries.length > 1 && <MenuItem value=''>Remove</MenuItem>}
                {parameters.map((cur, index) => (
                  <MenuItem key={index} value={cur}>
                    {defaultParameters[cur]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id={`search-value-${index}`}
              size='small'
              label='Search Value'
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
