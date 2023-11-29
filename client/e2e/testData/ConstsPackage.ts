/* eslint-disable require-jsdoc */
import {v4 as uuidv4} from 'uuid';

function generateShortUUID(length = 6) {
  return uuidv4().replace(/-/g, '').substring(0, length);
}

// Enums for the standard dropdowns
export enum Accommodations {
  None = 'None',
  Wheelchair = 'Wheel Chair',
  Aisle = 'Aisle Seat',
  Ground = 'First/Ground floor',
  ASL = 'ASL Interpreter',
  Wide = 'Wide Seats',
  Other = 'Other',
}

// This is the passin data template for the test:addNewEvents in EventsPage.spect.ts.
export interface EventInfoTemplate {
  eventName: string;
  eventDescription: string;
  eventURL: string;
  eventFullName: string;
}

// This is an instance of the object
export const EventInfoTemplate1: EventInfoTemplate = {
  eventName: 'S',
  eventDescription: '123',
  eventURL: 'http://',
  eventFullName: 'S Playbill S Description 123',
};

export const EventInfoTemplate2: EventInfoTemplate = {
  eventName: 'Test_event',
  eventDescription: 'An event for testing',
  eventURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
  eventFullName:
    'Test_event Playbill Test_event Description An event for testing',
};

export const EventInfoTemplate3: EventInfoTemplate = {
  eventName: 'The Crucible1',
  eventDescription:
    '111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
  eventFullName:
    'The Crucible1 Playbill The Crucible1 Description 111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const EventInfoTemplate4: EventInfoTemplate = {
  eventName: 'The Crucible',
  eventDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL: 'https://upload.wikimedia.org/wikipedia/en/7/75/Cruciblecover.jpg',
  eventFullName:
    'The Crucible Playbill The Crucible Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const EventInfoTemplate5: EventInfoTemplate = {
  eventName: 'The Martyr',
  eventDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL:
    'https://upload.wikimedia.org/wikipedia/commons/9/9e/Martirio_de_San_Esteban_%28Correa_de_Vivar%29.jpg',
  eventFullName:
    'The Martyr Playbill The Martyr Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const EventInfoTemplate6: EventInfoTemplate = {
  eventName: 'Purple',
  eventDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL:
    'https://upload.wikimedia.org/wikipedia/en/6/62/Barney%27s-Great-Adventure-Poster.jpeg',
  eventFullName:
    'Purple Playbill Purple Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export class EventInfo {
  eventName: string;
  eventDescription: string;
  eventURL: string;
  eventFullName: string;

  constructor(event: EventInfoTemplate, useShortID: boolean = true) {
    // Append either a short or long UUID to the event name
    this.eventName =
      event.eventName +
      ' [' +
      (useShortID ? generateShortUUID() : uuidv4()) +
      ']';
    this.eventDescription = event.eventDescription;
    this.eventDescription = event.eventDescription;
    this.eventURL = event.eventURL;
    this.eventFullName =
      this.eventName +
      ' Playbill ' +
      this.eventName +
      ' Description ' +
      this.eventDescription;
  }
}

export const EventInfo1 = new EventInfo(EventInfoTemplate1);
export const EventInfo2 = new EventInfo(EventInfoTemplate2);
export const EventInfo3 = new EventInfo(EventInfoTemplate3);
export const EventInfo4 = new EventInfo(EventInfoTemplate4);
export const EventInfo5 = new EventInfo(EventInfoTemplate5);
export const EventInfo6 = new EventInfo(EventInfoTemplate6);

//  This is the passin data template for adding/editing a new showing
export interface ShowingInfo {
  showingDate: string;
  showingTime: string;
  showingQuantity: string;
  showingWholeDate: string;
  showingDateTime: string;
}

// This is an instance of the object
export const ShowingInfo1: ShowingInfo = {
  showingDate: '2023-10-11',
  showingTime: '00:10',
  showingQuantity: '10',
  showingWholeDate: 'Wed, Oct 11 2023',
  showingDateTime: 'Wed, Oct 11 2023 12:10 AM',
};

export const ShowingInfo2: ShowingInfo = {
  showingDate: '2023-10-17',
  showingTime: '10:20',
  showingQuantity: '010',
  showingWholeDate: 'Tue, Oct 17 2023',
  showingDateTime: 'Tue, Oct 17 2023 10:20 AM',
};

export const ShowingInfo3: ShowingInfo = {
  showingDate: '2021-09-16',
  showingTime: '',
  showingQuantity: '101',
  showingWholeDate: '',
  showingDateTime: '',
};

export const ShowingInfo4: ShowingInfo = {
  showingDate: '2021-09-15',
  showingTime: '',
  showingQuantity: '100',
  showingWholeDate: 'Wed, Sep 15 2021',
  showingDateTime: 'Wed, Sep 15 2021',
};

export const ShowingInfo5: ShowingInfo = {
  showingDate: '2021-09-17',
  showingTime: '09:15',
  showingQuantity: '10',
  showingWholeDate: 'Fri, Sep 17 2021',
  showingDateTime: 'Fri, Sep 17 2021 09:15 AM',
};

export interface SeasonInfoTemplate {
  seasonName: string;
  seasonStart: string;
  seasonEnd: string;
  seasonImgURL: string;
}

export const SeasonInfoTemplate1: SeasonInfoTemplate = {
  seasonName: 'Test_Season1',
  seasonStart: '2020-02-02',
  seasonEnd: '2020-03-02',
  seasonImgURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
};

export const SeasonInfoTemplate2: SeasonInfoTemplate = {
  seasonName: 'Test_Season2',
  seasonStart: '2021-02-02',
  seasonEnd: '2021-03-02',
  seasonImgURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
};
export class SeasonInfo {
  seasonName: string;
  seasonStart: string;
  seasonEnd: string;
  seasonImgURL: string;

  constructor(season: SeasonInfoTemplate, useShortID: boolean = true) {
    // Append either a short or long UUID to the season name
    this.seasonName =
      season.seasonName +
      ' [' +
      (useShortID ? generateShortUUID() : uuidv4()) +
      ']';
    this.seasonName = season.seasonName;
    this.seasonStart = season.seasonStart;
    this.seasonEnd = season.seasonEnd;
    this.seasonImgURL = season.seasonImgURL;
  }
}

// Credit card info, to be used in conjunction with the Stripe test card numbers
export interface CreditCard {
  cardNumber: string;
  CVC: string;
  date: string;
}

export const ValidVisaCredit: CreditCard = {
  cardNumber: '4242 4242 4242 4242',
  CVC: '999',
  date: '12 / 30',
};

// Customer const to be used for testing.  Includes all information related to a specific customer that might be used during an order process.
export interface Customer {
  firstName: string;
  lastName: string;
  fullName: string;
  streetAddress: string;
  postCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  newsletterSignup: boolean;
  getConcession: boolean;
  donationAmount: string;
  getNewsletter: boolean;
  heardAboutFrom: string;
  accommodations: Accommodations;
  comments: string;
}

export const JohnDoe: Customer = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  streetAddress: '8 Strawberry Ln, Yarmouth Port, MA',
  postCode: '02675',
  country: 'USA',
  phoneNumber: '(508) 362-3909',
  email: 'test@wondertix.com',
  newsletterSignup: false,
  getConcession: false,
  donationAmount: '0',
  getNewsletter: false,
  heardAboutFrom: '',
  accommodations: Accommodations.None,
  comments: '',
};

export const JaneDoe: Customer = {
  firstName: 'Jane',
  lastName: 'Doe',
  fullName: 'Jane Doe',
  streetAddress: '618 William Street, Key West, FL',
  postCode: '33040',
  country: 'USA',
  phoneNumber: '(207)283-8797',
  email: 'test@wondertix.com',
  newsletterSignup: false,
  getConcession: false,
  donationAmount: '0',
  getNewsletter: false,
  heardAboutFrom: '',
  accommodations: Accommodations.ASL,
  comments: '',
};
