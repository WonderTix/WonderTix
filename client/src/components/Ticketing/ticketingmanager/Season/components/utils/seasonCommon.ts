export interface seasonEventInfo {
  active: boolean;
  eventdescription: string;
  eventid: number;
  eventname: string;
  imageurl: string;
  seasonid_fk: number | null;
  seasonticketeligible: boolean;
  deletedat?: string | null;
}

export const initialSeasonEventInfo: seasonEventInfo = {
  active: false,
  eventdescription: '',
  eventid: 0,
  eventname: '',
  imageurl: '',
  seasonid_fk: null,
  seasonticketeligible: false,
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
  seasonTicketTypeData: SeasonTicketValues[];
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

export const seasonTicketDefaultValues: SeasonTicketValues = {
  tickettypeid_fk: 1,
  description: '(Test) General Admission',
  price: 0,
  concessionprice: 0,
};
