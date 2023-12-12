/* eslint-disable require-jsdoc */
import {appendShortUUID} from './supportFunctions/uuidFunctions';

export interface SeasonInfo {
  seasonName: string;
  seasonStart: string;
  seasonEnd: string;
  seasonImgURL: string;
}

export class SeasonInfo {
  constructor(season: SeasonInfo) {
    this.seasonName = appendShortUUID(season.seasonName);
    this.seasonStart = season.seasonStart;
    this.seasonEnd = season.seasonEnd;
    this.seasonImgURL = season.seasonImgURL;
  }
}

export const SEASON_INFO_1: SeasonInfo = {
  seasonName: 'Test_Season1',
  seasonStart: '2020-02-02',
  seasonEnd: '2020-03-02',
  seasonImgURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
};

export const SEASON_INFO_2: SeasonInfo = {
  seasonName: 'Test_Season2',
  seasonStart: '2021-02-02',
  seasonEnd: '2021-03-02',
  seasonImgURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
};
