/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable require-jsdoc */
import {v4 as uuidv4} from 'uuid';

function generateShortUUID(length = 6) {
  return uuidv4().replace(/-/g, '').substring(0, length);
}

export function appendShortUUID(x: string): string {
  return x + generateShortUUID();
}
