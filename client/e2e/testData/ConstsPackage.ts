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

export const ANE_Package2 = new addNewEvents_Package(
  "Test_event",
  "An event for testing",
  "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg"
);

export const ANE_Package3 = new addNewEvents_Package(
  "The Crucible1",
  "111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg"
);

export const ANE_Package4 = new addNewEvents_Package(
  "The Crucible",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "https://upload.wikimedia.org/wikipedia/en/7/75/Cruciblecover.jpg"
);

//This is the passin data template for adding a new showing
export class addNewShowing_Package {
  constructor(
    public event_ShowingDate: string,
    public event_ShowingTime: string,
    public event_ShowingQuantity: string
  ) {}
}
// This is an instance of the object
export const ANS_Package1 = new addNewShowing_Package(
  "2023-10-11",
  "00:10",
  "10"
);

export const ANS_Package2 = new addNewShowing_Package(
  "2023-10-17",
  "10:20",
  "010"
);

// This is the passin date template for searching for a specific showing
export class searchDeleteShowing_Package {
  constructor(
    public showing_Date:string
  ) {}
}

// This is an instance of the object
export const SDS_Package1 = new searchDeleteShowing_Package(
  "Wed, Oct 11 2023"
);

export const SDS_Package2 = new searchDeleteShowing_Package(
  "Tue, Oct 17 2023"
);
// This is the passin data template for the test:addDeleteEvents_Package in EventsPage.spect.ts.
export class goToEventFromManage_Package {
    constructor(
      public event_FullName: string
    ) {}
  }

// This is an instance of the object
export const GTE_Package1 = new goToEventFromManage_Package(
    "Test_event Playbill Test_event Description An event for testing"
  );

// This is the passin data template for the test:editShowing in EventsPage.spect.ts.
export class editShowing_Package {
  constructor(
    public eventShowingDate: string,
    public eventShowingQuantity: string,
    public eventShowingDateString: string
  ) {}
}

// This is an instance of the object

export const ES_Package1 = new editShowing_Package(
  "2021-09-16",
  "101",
  ""
);

export const ES_Package2 = new editShowing_Package(
  "2021-09-15",
  "100",
  "Wed, Sep 15 2021"
);