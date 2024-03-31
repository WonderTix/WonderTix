import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {
  getSubscriptionFilterFunction,
  getSubscriptionSortFunction,
  Subscription,
  useFetchSeasons,
} from './SubscriptionRedemptionUtils';
import {SubscriptionRedemptionContainer} from './SubscriptionRedemptionContainer';
import {getData} from '../Event/components/ShowingUtils';

interface SubscriptionsRedemptionProps {
  token: string;
  setPopUpProps: any;
  showPopUp: boolean;
}

export const SubscriptionsRedemptionContainer = (
  props: SubscriptionsRedemptionProps,
) => {
  const {token, showPopUp, setPopUpProps} = props;
  const {seasons} = useFetchSeasons('?current=true');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [queries, setQueries] = useState({
    seasons: [],
    name: '',
    email: '',
  });
  const [filters, setFilters] = useState({
    filter: 3,
    sort: 3,
  });
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (token) {
      const queriesFormatted = queries.seasons
        .map((season) => `seasonid=${season.id}`)
        .concat(
          queries.name
            ? queries.name.split(' ').map((name) => `name=${name}`)
            : [],
        );
      getData(
        `${
          process.env.REACT_APP_API_2_URL
        }/subscription-types/subscriptions/search?${queriesFormatted.join(
          '&',
        )}${queries.email ? `&email=${queries.email}` : ''}`,
        setSubscriptions,
        controller.signal,
        token,
      ).catch((error) => console.error(error, 'Error Fetching Subscriptions'));
    }
    return () => controller.abort();
  }, [search]);

  return (
    <main className='md:ml-[18rem] md:mt-40 md:mb-[11rem] tab:mx-[5rem] mx-[1.5rem] my-[9rem] grid grid-cols-12 gap-2'>
      <header className='col-span-12'>
        <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-500 mb-14'>
          Subscriptions
        </h1>
      </header>
      <div className='col-span-12 mb-4 min-[1200px]:mb-0 min-[1200px]:col-span-4 min-[1440px]:col-span-3'>
        <div className='bg-white flex flex-col rounded-xl shadow-xl gap-3 p-4 min-[1200px]:sticky min-[1200px]:top-20'>
          <div className='flex flex-row justify-between'>
            <h2 className='text-zinc-500 font-semibold text-xl'>Search</h2>
            <button
              className='text-white bg-blue-500 hover:bg-blue-600 rounded-2xl py-1 px-4 shadow-xl'
              onClick={() => {
                setSearch((prev) => !prev);
                setEditing(false);
              }}
            >
              Search
            </button>
          </div>
          <div className='flex flex-col min-[500px]:max-[1199px]:grid grid-cols-2 border border-zinc-300 rounded-xl p-4 gap-2'>
            <TextField
              id='name'
              label='Customer Name'
              onChange={(event) =>
                setQueries((prev) => ({...prev, name: event.target.value}))
              }
              value={queries.name}
            />
            <TextField
              id='email'
              label='Customer Email'
              onChange={(event) =>
                setQueries((prev) => ({...prev, email: event.target.value}))
              }
              value={queries.email}
            />
            <Autocomplete
              id='season-select'
              multiple
              filterSelectedOptions
              options={seasons.map((season) => ({
                id: season.seasonid,
                label: season.name,
              }))}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={queries.seasons}
              onChange={(_, newVal) =>
                setQueries((prev) => ({...prev, seasons: newVal}))
              }
              inputValue={inputValue}
              onInputChange={(_, newVal) => setInputValue(newVal)}
              renderInput={(params) => (
                <TextField {...params} label='Seasons' placeholder='Season' />
              )}
            />
          </div>
          <h2 className='text-zinc-500 font-semibold text-xl text-start'>
            Filter
          </h2>
          <div className='flex flex-col min-[500px]:max-[1199px]:grid grid-cols-2 border border-zinc-300 rounded-xl p-4 gap-2'>
            <FormControl>
              <InputLabel id='sort-label'>Sort</InputLabel>
              <Select
                labelId='sort-label'
                id='sort-select'
                value={filters.sort}
                label='Sort'
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    sort: +event.target.value,
                  }))
                }
              >
                <MenuItem value={0}>Customer Name</MenuItem>
                <MenuItem value={1}>Customer Email</MenuItem>
                <MenuItem value={2}>Season</MenuItem>
                <MenuItem value={3}>Subscription Type</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='filter-label'>Filter</InputLabel>
              <Select
                labelId='filter-label'
                id='filter-select'
                value={filters.filter}
                label='Filter'
                onChange={(event) => {
                  setFilters((prev) => ({
                    ...prev,
                    filter: +event.target.value,
                  }));
                  setEditing(false);
                }}
              >
                <MenuItem value={0}>Fully Redeemed</MenuItem>
                <MenuItem value={1}>Partially Redeemed</MenuItem>
                <MenuItem value={3}>All Subscriptions</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <aside className='col-span-12 min-[1200px]:col-span-8 min-[1440px]:col-span-9 flex flex-col items-center gap-3'>
        {subscriptions
          .filter(getSubscriptionFilterFunction(filters.filter))
          .sort(getSubscriptionSortFunction(filters.sort))
          .map((subscription) => (
            <SubscriptionRedemptionContainer
              key={`${subscription.id}-${subscription.ticketsredeemed}-${search}-${filters.filter}`}
              subscription={subscription}
              setReload={setSearch}
              setSubscriptions={setSubscriptions}
              token={token}
              setDisabled={setEditing}
              disabled={editing}
              setPopUpProps={setPopUpProps}
              showPopUp={showPopUp}
            />
          ))}
      </aside>
    </main>
  );
};
