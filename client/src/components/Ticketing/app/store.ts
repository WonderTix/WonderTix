import {configureStore} from '@reduxjs/toolkit';
import donationSlice from '../ticketingmanager/donationSlice';
import snackbarReducer from '../ticketingmanager/snackbarSlice';
import ticketingReducer from '../ticketingmanager/ticketingSlice';

/**
 * Handles store configuration
 */
const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    ticketing: ticketingReducer,
    donation: donationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
