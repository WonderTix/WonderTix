export interface SeasonProps {
  seasonId: number;
  token: string;
  isFormEditing: boolean;
  setIsFormEditing: (value) => void;
  setShowPopUp: (value) => void;
  setPopUpMessage: (value) => void;
  setSeasonId: (value) => void;
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
