/* eslint-disable require-jsdoc */
import {v4 as uuidv4} from 'uuid';
import { CustomerInfo, EventInfo, SeasonInfo } from './interfaces';

function generateShortUUID(length = 6) {
  return uuidv4().replace(/-/g, '').substring(0, length);
}

export function createUniqueEvent(event: EventInfo, useShortID: boolean = true): EventInfo {
  const uniqueSuffix = useShortID ? generateShortUUID() : uuidv4();
  const eventName = `${event.eventName} [${uniqueSuffix}]`;

  return {
    eventName: eventName,
    eventDescription: event.eventDescription,
    eventURL: event.eventURL,
    eventFullName: `${eventName} Playbill ${eventName} Description ${event.eventDescription}`,
  };
}

export function createUniqueSeason(season: SeasonInfo, useShortID: boolean = true): SeasonInfo {
  const uniqueSuffix = useShortID ? generateShortUUID() : uuidv4();
  const seasonName = `${season.seasonName} [${uniqueSuffix}]`;

  return {
    seasonName: seasonName,
    seasonStart: season.seasonStart,
    seasonEnd: season.seasonEnd,
    seasonImgURL: season.seasonImgURL,
  };
}


export function createUniqueCustomer(baseCustomer: CustomerInfo): CustomerInfo {
  const uniqueId = generateShortUUID(6);
  return {
    ...baseCustomer,
    firstName: `${baseCustomer.firstName}${uniqueId}`,
    lastName: baseCustomer.lastName,
    fullName: `${baseCustomer.firstName}${uniqueId} ${baseCustomer.lastName}`,
    email: `${baseCustomer.firstName.toLowerCase()}.${baseCustomer.lastName.toLowerCase()}.${uniqueId}@wondertix.com`,
    phoneNumber: generatePhoneNumber()
  };
}

function generatePhoneNumber() {
  // Generates a random 10-digit phone number
  const randomDigits = () => Math.floor(Math.random() * 9000000000) + 1000000000;
  return `(${randomDigits().toString().substring(0, 3)}) ${randomDigits().toString().substring(3, 6)}-${randomDigits().toString().substring(6, 10)}`;
}
