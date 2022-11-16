/* eslint-disable max-len */
/**
 * Copyright © 2021 Aditya Sharoff, Gregory Hairfeld, Jesse Coyle, Francis Phan, William Papsco, Jack Sherman, Geoffrey Corvera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

export type SnackbarState = {message: string, shown: boolean}

/**
 * Gets exported and used by other events
 *
 * @module
 * @param {string} name - called 'snackbar'
 * @param {string} message - empty string at beginning
 * @param {boolean} shown - default false
 * @param {object} reducers - Either snackbar is opened or closed
 */
const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {message: '', shown: false},
  reducers: {
    openSnackbar: (_, action: PayloadAction<string>) => ({message: action.payload, shown: true}),
    closeSnackbar: () => ({message: '', shown: false}),
  },
});

export const {openSnackbar, closeSnackbar} = snackbarSlice.actions;
export const selectSnackbar = (state: RootState) => state.snackbar;

export default snackbarSlice.reducer;
