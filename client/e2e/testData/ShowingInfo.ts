/* eslint-disable require-jsdoc */

export interface ShowingInfo {
  showingDate: string;
  showingTime24hour: string;
  showingTime12hour: string;
  showingQuantity: string;
  showingWholeDate: string;
  showingDatePickerFormat: string;
}

export const SHOWING_INFO_1: ShowingInfo = {
  showingDate: '2032-10-11',
  showingTime24hour: '00:10',
  showingTime12hour: '12:10 AM',
  showingQuantity: '10',
  showingWholeDate: 'Wed, Oct 11 2032',
  showingDatePickerFormat: 'WEDOCT11',
};

export const SHOWING_INFO_2: ShowingInfo = {
  showingDate: '2032-10-17',
  showingTime24hour: '10:20',
  showingTime12hour: '10:20 AM',
  showingQuantity: '10',
  showingWholeDate: 'Tue, Oct 17 2032',
  showingDatePickerFormat: 'TUEOCT17',
};

export const SHOWING_INFO_3: ShowingInfo = {
  showingDate: '2030-09-16',
  showingTime24hour: '12:31',
  showingTime12hour: '12:31 PM',
  showingQuantity: '101',
  showingWholeDate: 'Thu, Sep 16 2030',
  showingDatePickerFormat: 'THUSEP16',
};

export const SHOWING_INFO_4: ShowingInfo = {
  showingDate: '2030-09-15',
  showingTime24hour: '12:30',
  showingTime12hour: '12:30 PM',
  showingQuantity: '100',
  showingWholeDate: 'Wed, Sep 15 2030',
  showingDatePickerFormat: 'WEDSEP15',
};

export const SHOWING_INFO_5: ShowingInfo = {
  showingDate: '2030-09-17',
  showingTime24hour: '09:15',
  showingTime12hour: '9:15 AM',
  showingQuantity: '10',
  showingWholeDate: 'Fri, Sep 17 2030',
  showingDatePickerFormat: 'FRISEP17',
};
