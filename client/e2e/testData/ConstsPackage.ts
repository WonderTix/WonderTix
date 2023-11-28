/* eslint-disable require-jsdoc */
import {v4} from 'uuid';

// Enums for the standard dropdowns
export enum Accommodations {
  None = 'None',
  Wheelchair = 'Wheel Chair',
  Aisle = 'Aisle Seat',
  Ground = 'First/Ground floor',
  ASL = 'ASL Interpreter',
  Wide = 'Wide Seats',
  Other = 'Other'
}

// This is the passin data template for the test:addNewEvents in EventsPage.spect.ts.
export interface EventsInfoTemplate {
  eventName: string;
  eventDescription: string;
  eventURL: string;
  eventFullName: string;
 }

// This is an instance of the object
export const EventsInfoTemplate1: EventsInfoTemplate = {
  eventName: 'S',
  eventDescription: '123',
  eventURL: 'http://',
  eventFullName: 'S Playbill S Description 123',
};

export const EventsInfoTemplate2: EventsInfoTemplate = {
  eventName: 'Test_event',
  eventDescription: 'An event for testing',
  eventURL: 'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
  eventFullName: 'Test_event Playbill Test_event Description An event for testing',
};

export const EventsInfoTemplate3: EventsInfoTemplate = {
  eventName: 'The Crucible1',
  eventDescription: '111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL: 'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
  eventFullName: 'The Crucible1 Playbill The Crucible1 Description 111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const EventsInfoTemplate4: EventsInfoTemplate = {
  eventName: 'The Crucible',
  eventDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL: 'https://upload.wikimedia.org/wikipedia/en/7/75/Cruciblecover.jpg',
  eventFullName: 'The Crucible Playbill The Crucible Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const EventsInfoTemplate5: EventsInfoTemplate = {
  eventName: 'The Martyr',
  eventDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Martirio_de_San_Esteban_%28Correa_de_Vivar%29.jpg',
  eventFullName: 'The Martyr Playbill The Martyr Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const EventsInfoTemplate6: EventsInfoTemplate = {
  eventName: 'Purple',
  eventDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL: 'https://upload.wikimedia.org/wikipedia/en/6/62/Barney%27s-Great-Adventure-Poster.jpeg',
  eventFullName: 'Purple Playbill Purple Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export class EventsInfo {
  eventName: string;
  eventDescription: string;
  eventURL: string;
  eventFullName: string;

  constructor(event: EventsInfoTemplate, UID=true) {
    if (UID) {
      this.eventName = event.eventName + v4();
    } else {
      this.eventName = event.eventName;
    }
    this.eventDescription = event.eventDescription;
    this.eventURL = event.eventURL;
    this.eventFullName = this.eventName + ' Playbill ' + this.eventName + ' Description ' + this.eventDescription;
  }
}

export const EventsInfo1 = new EventsInfo(EventsInfoTemplate1);
export const EventsInfo2 = new EventsInfo(EventsInfoTemplate2);
export const EventsInfo3 = new EventsInfo(EventsInfoTemplate3);
export const EventsInfo4 = new EventsInfo(EventsInfoTemplate4);
export const EventsInfo5 = new EventsInfo(EventsInfoTemplate5);
export const EventsInfo6 = new EventsInfo(EventsInfoTemplate6);

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

export interface SeasonsInfo {
  seasonName: string;
  seasonStart: string;
  seasonEnd: string;
  seasonImgURL: string;
 }

 export const SeasonInfo1: SeasonsInfo = {
  seasonName: 'TestName',
  seasonStart: '2020-02-02',
  seasonEnd: '2020-03-02',
  seasonImgURL: 'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg'
 };

 export const SeasonInfo2: SeasonsInfo = {
  seasonName: 'NewName',
  seasonStart: '2021-02-02',
  seasonEnd: '2021-03-02',
  seasonImgURL: 'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg'
 };

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
