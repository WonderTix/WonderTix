/* eslint-disable require-jsdoc */

export interface ShowingInfo {
  showingDate: string;
  showingTime: string;
  showingQuantity: string;
  showingWholeDate: string;
  showingDateTime: string;
}

export const SHOWING_INFO_1: ShowingInfo = {
  showingDate: '2023-10-11',
  showingTime: '00:10',
  showingQuantity: '10',
  showingWholeDate: 'Wed, Oct 11 2023',
  showingDateTime: 'Wed, Oct 11 2023 12:10 AM',
};

export const SHOWING_INFO_2: ShowingInfo = {
  showingDate: '2023-10-17',
  showingTime: '10:20',
  showingQuantity: '010',
  showingWholeDate: 'Tue, Oct 17 2023',
  showingDateTime: 'Tue, Oct 17 2023 10:20 AM',
};

export const SHOWING_INFO_3: ShowingInfo = {
  showingDate: '2021-09-16',
  showingTime: '',
  showingQuantity: '101',
  showingWholeDate: '',
  showingDateTime: '',
};

export const SHOWING_INFO_4: ShowingInfo = {
  showingDate: '2021-09-15',
  showingTime: '',
  showingQuantity: '100',
  showingWholeDate: 'Wed, Sep 15 2021',
  showingDateTime: 'Wed, Sep 15 2021',
};

export const SHOWING_INFO_5: ShowingInfo = {
  showingDate: '2021-09-17',
  showingTime: '09:15',
  showingQuantity: '10',
  showingWholeDate: 'Fri, Sep 17 2021',
  showingDateTime: 'Fri, Sep 17 2021 09:15 AM',
};
