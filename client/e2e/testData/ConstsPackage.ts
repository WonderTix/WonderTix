// This is the passin data template for the test:addNewEvents in EventsPage.spect.ts.
export interface EventsInfo {
  eventName: string;
  eventDescription: string;
  eventURL: string;
  eventFullName: string;
 }

// This is an instance of the object
export const EventsInfo1: EventsInfo = {
  eventName: "S",
  eventDescription: "123",
  eventURL: "http://",
  eventFullName: "S Playbill S Description 123"
};

export const EventsInfo2: EventsInfo = {
  eventName: "Test_event",
  eventDescription: "An event for testing",
  eventURL: "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg",
  eventFullName: "Test_event Playbill Test_event Description An event for testing"
};

export const EventsInfo3: EventsInfo = {
  eventName: "The Crucible1",
  eventDescription: "111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  eventURL: "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg",
  eventFullName: "The Crucible1 Playbill The Crucible1 Description 111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
};

export const EventsInfo4: EventsInfo = {
  eventName: "The Crucible",
  eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  eventURL: "https://upload.wikimedia.org/wikipedia/en/7/75/Cruciblecover.jpg",
  eventFullName: "The Crucible Playbill The Crucible Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
};

//This is the passin data template for adding/editing a new showing
export interface ShowingInfo {
  showingDate: string;
  showingTime: string;
  showingQuantity: string;
  showingWholeDate: string;
}

// This is an instance of the object
export const ShowingInfo1: ShowingInfo = {
  showingDate: "2023-10-11",
  showingTime: "00:10",
  showingQuantity: "10",
  showingWholeDate: "Wed, Oct 11 2023"
};

export const ShowingInfo2: ShowingInfo = {
  showingDate: "2023-10-17",
  showingTime: "10:20",
  showingQuantity: "010",
  showingWholeDate: "Tue, Oct 17 2023"
};

export const ShowingInfo3: ShowingInfo = {
  showingDate: "2021-09-16",
  showingTime: "",
  showingQuantity: "101",
  showingWholeDate: ""
};

export const ShowingInfo4: ShowingInfo = {
  showingDate: "2021-09-15",
  showingTime: "",
  showingQuantity: "100",
  showingWholeDate: "Wed, Sep 15 2021"
};

export interface CreditCard {
  cardNumber: string;
  CVC: string;
  date: string;
};

export const ValidVisaCredit: CreditCard = {
  cardNumber: '4242424242424242',
  CVC: '999',
  date: '12/12/2099',
};

export interface Customer {
  firstName: string;
  lastName: string;
  streetAddress: string;
  postCode: string;
  country: string;
  phoneNumber: string;
  email: string;
}

export const JohnDoe: Customer = {
  firstName: 'John',
  lastName: 'Doe',
  streetAddress: '8 Strawberry Ln, Yarmouth Port, MA',
  postCode: '02675',
  country: 'USA',
  phoneNumber: '(508) 362-3909',
  email: 'test@wondertix.com',
};
