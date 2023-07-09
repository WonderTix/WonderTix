import {configureStore} from '@reduxjs/toolkit';

// import userSlice from '../ticketingmanager/userSlice';
import donationSlice from '../ticketingmanager/donationSlice';
import eventsReducer from '../ticketingmanager/Events/events_pages/eventsSlice';
import snackbarReducer from '../ticketingmanager/snackbarSlice';
import ticketingReducer from '../ticketingmanager/ticketing/ticketingSlice';

/**
 * Handles store configuration
 */
const store = configureStore(
    {
      reducer: {

        events: eventsReducer,
        snackbar: snackbarReducer,
        ticketing: ticketingReducer,
        // user: userSlice,
        donation: donationSlice,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    },
);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
