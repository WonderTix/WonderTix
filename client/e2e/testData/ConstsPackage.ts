// This is the passin data template for the test:addNewEvents in EventsPage.spect.ts.
export interface EventsInfo {
  eventName: string;
  eventDescription: string;
  eventURL: string;
  eventFullName: string;
  suffix: string;
 }

// This is an instance of the object
export const EventsInfo1: EventsInfo = {
  eventName: "S",
  eventDescription: "123",
  eventURL: "http://",
  eventFullName: "S Playbill S Description 123",
  suffix:"Playbill"
};

export const EventsInfo2: EventsInfo = {
  eventName: "Test_event",
  eventDescription: "An event for testing",
  eventURL: "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg",
  eventFullName: "Test_event Playbill Test_event Description An event for testing",
  suffix:"Playbill"
};

export const EventsInfo3: EventsInfo = {
  eventName: "Testcase",
  eventDescription: "111Description",
  eventURL: "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg",
  eventFullName: "Testcase Playbill 111Description",
  suffix:"Playbill"
};

export const EventsInfo4: EventsInfo = {
  eventName: "Testcase",
  eventDescription: "Description",
  eventURL: "https://upload.wikimedia.org/wikipedia/en/7/75/Cruciblecover.jpg",
  eventFullName: "Testcase Playbill Description",
  suffix:"Playbill"
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
  showingTime: "16:15",
  showingQuantity: "101",
  showingWholeDate: ""
};

export const ShowingInfo4: ShowingInfo = {
  showingDate: "2021-09-15",
  showingTime: "16:15",
  showingQuantity: "100",
  showingWholeDate: "Wed, Sep 15 2021"
};