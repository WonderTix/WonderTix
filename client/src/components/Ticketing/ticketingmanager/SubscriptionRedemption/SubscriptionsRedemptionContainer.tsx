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
  getSeasonFilterFunction,
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
  const {seasons} = useFetchSeasons();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [queries, setQueries] = useState({
    seasons: [],
    name: '',
    email: '',
  });
  const [filters, setFilters] = useState({
    subscriptionFilter: 'all',
    seasonFilter: 'all',
    sort: 'type',
  });
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    const formattedQueries = queries.seasons.map(
      (season) => `seasonid=${season.id}`,
    );

    if (queries.name) {
      formattedQueries.push(
        ...queries.name
          .trim()
          .split(' ')
          .map((name) => `name=${name}`),
      );
    }

    if (queries.email) {
      formattedQueries.push(`email=${queries.email.trim()}`);
    }

    getData(
      `${
        process.env.REACT_APP_API_2_URL
      }/subscription-types/subscriptions/search?${formattedQueries.join('&')}`,
      setSubscriptions,
      controller.signal,
      token,
    ).catch((error) => console.error(error, 'Error Fetching Subscriptions'));

    return () => controller.abort();
  }, [search]);

  return (
    <main className='grid grid-cols-12 gap-2 min-[2000px]:w-[70%]'>
      <header className='col-span-12'>
        <h1 className='font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-500 mb-14'>
          Subscription Redemption
        </h1>
      </header>
      <div className='col-span-12 mb-4 min-[1200px]:mb-0 min-[1200px]:col-span-4 lg:col-span-3'>
        <aside className='bg-white flex flex-col rounded-xl shadow-xl gap-3 p-4 min-[1200px]:sticky min-[1200px]:top-20'>
          <h2 className='text-zinc-500 font-semibold text-xl flex flex-row justify-between'>
            Search
            <button
              className='text-white bg-blue-500 hover:bg-blue-600 rounded-2xl py-1 px-4 shadow-xl'
              onClick={() => {
                setSearch(!search);
                setEditing(false);
              }}
            >
              Search
            </button>
          </h2>
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
            Filter & Sort
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
                    sort: event.target.value,
                  }))
                }
              >
                <MenuItem value='name'>Customer Name</MenuItem>
                <MenuItem value='email'>Customer Email</MenuItem>
                <MenuItem value='season'>Season</MenuItem>
                <MenuItem value='type'>Subscription Type</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='subscription-filter-label'>
                Subscription Filter
              </InputLabel>
              <Select
                labelId='subscription-filter-label'
                id='subscription-filter-select'
                value={filters.subscriptionFilter}
                label='Subscription Filter'
                onChange={(event) => {
                  setFilters((prev) => ({
                    ...prev,
                    subscriptionFilter: event.target.value,
                  }));
                  setEditing(false);
                }}
              >
                <MenuItem value='fully'>Fully Redeemed</MenuItem>
                <MenuItem value='partially'>Partially Redeemed</MenuItem>
                <MenuItem value='all'>All Subscriptions</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='season-filter-label'>Season Filter</InputLabel>
              <Select
                labelId='season-filter-label'
                id='season-filter-select'
                value={filters.seasonFilter}
                label='Season Filter'
                onChange={(event) => {
                  setFilters((prev) => ({
                    ...prev,
                    seasonFilter: event.target.value,
                  }));
                  setEditing(false);
                }}
              >
                <MenuItem value='present'>Present Seasons</MenuItem>
                <MenuItem value='past'>Past Seasons</MenuItem>
                <MenuItem value='all'>All Seasons</MenuItem>
              </Select>
            </FormControl>
          </div>
        </aside>
      </div>
      <section className='col-span-12 min-[1200px]:col-span-8 lg:col-span-9 flex flex-col items-center gap-3'>
        {subscriptions
          .filter(
            (sub) =>
              getSubscriptionFilterFunction(filters.subscriptionFilter)(sub) &&
              getSeasonFilterFunction(filters.seasonFilter)(sub),
          )
          .sort(getSubscriptionSortFunction(filters.sort))
          .map((subscription) => (
            <SubscriptionRedemptionContainer
              key={`${subscription.id}-${subscription.ticketsredeemed}-${search}-${filters.subscriptionFilter}-${filters.seasonFilter}`}
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
      </section>
    </main>
  );
};
