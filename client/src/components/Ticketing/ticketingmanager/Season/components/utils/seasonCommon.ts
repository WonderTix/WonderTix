export interface seasonEventInfo {
  active: boolean;
  eventdescription: string;
  eventid: number;
  eventname: string;
  imageurl: string;
  seasonid_fk: number | null;
  subscriptioneligible: boolean;
  deletedat?: string | null;
}

export const initialSeasonEventInfo: seasonEventInfo = {
  active: false,
  eventdescription: '',
  eventid: 0,
  eventname: '',
  imageurl: '',
  seasonid_fk: null,
  subscriptioneligible: false,
  deletedat: null,
};

export interface SeasonProps {
  seasonId: number;
  token: string;
  isFormEditing: boolean;
  eventsInSeason: seasonEventInfo[];
  setEventsInSeason: (value) => void;
  setIsFormEditing: (value) => void;
  setShowPopUp: (value) => void;
  setPopUpMessage: (value) => void;
  setSeasonId: (value) => void;
  disabled: boolean;
}

export interface SeasonInfo {
  seasonid: number;
  name: string;
  startdate: string;
  enddate: string;
  imageurl: string;
}

export const seasonDefaultValues: SeasonInfo = {
  seasonid: 0,
  name: '',
  startdate: '',
  enddate: '',
  imageurl: '',
};

export interface SeasonTicketValues {
  tickettypeid_fk: number,
  description: string,
  price: number,
  concessionprice: number,
}
