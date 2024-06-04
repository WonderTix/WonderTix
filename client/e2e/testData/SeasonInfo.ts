/* eslint-disable require-jsdoc */
import {appendShortUUID} from './supportFunctions/uuidFunctions';

export interface SeasonInfo {
  seasonName: string;
  seasonStart: string;
  seasonEnd: string;
  seasonWholeStart: string;
  seasonWholeEnd: string;
  seasonImgURL: string;
}

export class SeasonInfo {
  constructor(season: SeasonInfo) {
    this.seasonName = appendShortUUID(season.seasonName);
    this.seasonStart = season.seasonStart;
    this.seasonEnd = season.seasonEnd;
    this.seasonWholeStart = season.seasonWholeStart;
    this.seasonWholeEnd = season.seasonWholeEnd;
    this.seasonImgURL = season.seasonImgURL;
  }
}

export const SEASON_INFO_1: SeasonInfo = {
  seasonName: 'Test_Season1',
  seasonStart: '2029-02-02',
  seasonEnd: '2029-03-02',
  seasonWholeStart: 'February 02, 2029',
  seasonWholeEnd: 'March 02, 2029',
  seasonImgURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
};

export const SEASON_INFO_2: SeasonInfo = {
  seasonName: 'Test_Season2',
  seasonStart: '2030-02-02',
  seasonEnd: '2030-03-02',
  seasonWholeStart: 'February 02, 2030',
  seasonWholeEnd: 'March 02, 2030',
  seasonImgURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
};
