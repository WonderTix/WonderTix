/* eslint-disable require-jsdoc */
import {appendShortUUID} from './supportFunctions/uuidFunctions';

export interface EventInfo {
  eventName: string;
  eventDescription: string;
  eventURL: string;
}

export class EventInfo {
  constructor(event: EventInfo) {
    this.eventName = appendShortUUID(event.eventName);
    this.eventDescription = event.eventDescription;
    this.eventURL = event.eventURL;
  }
}

export const EVENT_INFO_1: EventInfo = {
  eventName: 'Test_event',
  eventDescription: 'An event for testing',
  eventURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
};

export const EVENT_INFO_2: EventInfo = {
  eventName: 'The Crucible1',
  eventDescription:
    'Test event 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL:
    'https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg',
 };

export const EVENT_INFO_3: EventInfo = {
  eventName: 'The Crucible',
  eventDescription:
    'Test event 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL: 'https://upload.wikimedia.org/wikipedia/en/7/75/Cruciblecover.jpg',
};

export const EVENT_INFO_4: EventInfo = {
  eventName: 'The Martyr',
  eventDescription:
    'Test event 4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL:
    'https://upload.wikimedia.org/wikipedia/commons/9/9e/Martirio_de_San_Esteban_%28Correa_de_Vivar%29.jpg',
};

export const EVENT_INFO_5: EventInfo = {
  eventName: 'Purple',
  eventDescription:
    'Test event 5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eventURL:
    'https://upload.wikimedia.org/wikipedia/en/6/62/Barney%27s-Great-Adventure-Poster.jpeg',
};
