// This is the passin data template for the test:addNewEvents in EventsPage.spect.ts.
export class addNewEvents_Package {
  constructor(
    public event_Name: string,
    public event_Description: string,
    public event_URL: string
  ) {}
}

// This is an instance of the object
export const ANE_Package1 = new addNewEvents_Package(
  "S",
  "123",
  "http://"
);

// This is the passin data template for the test:addDeleteEvents_Package in EventsPage.spect.ts.
export class addDeleteEvents_Package {
    constructor(
      public event_Name: string,
      public event_Description: string,
      public event_URL: string,
      public event_Showing1Date: string,
      public event_Showing1Time: string,
      public event_Showing1Quantity: string,
      public event_Showing2Date: string,
      public event_Showing2Time: string,
      public event_Showing2Quantity: string,
      public event_FullName: string
    ) {}
  }

// This is an instance of the object
export const ADE_package1 = new addDeleteEvents_Package(
    "Test_event",
    "An event for testing",
    "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg",
    "2023-10-11",
    "00:10",
    "10",
    "2023-10-17",
    "10:20",
    "010",
    "Test_event Playbill Test_event Description An event for testing"
  );

// This is the passin data template for the test:editevents1_Package in EventsPage.spect.ts.
export class editevents1_Package {
    constructor(
      public event_RevisedName: string,
      public event_Name: string,
      public event_RevisedDescription: string,
      public event_Description: string,
      public event_RevisedURL: string,
      public event_URL: string
    ) {}
  }

// This is an instance of the object
export const EDE_package1 = new editevents1_Package(
  "The Crucible1",
  "The Crucible",
  "111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg",
  "https://upload.wikimedia.org/wikipedia/en/7/75/Cruciblecover.jpg"
);

// This is the passin data template for the test:editShowing in EventsPage.spect.ts.
export class editShowing_Package {
  constructor(
    public eventShowingDate: string,
    public eventShowingQuantity: string,
    public eventShowing1Date: string,
    public eventShowing1Quantity: string,
    public eventShowing1DateString: string
  ) {}
}

// This is an instance of the object
export const ES_Package1 = new editShowing_Package(
  "2021-09-16",
  "101",
  "2021-09-15",
  "100",
  "Wed, Sep 15 2021"
);


