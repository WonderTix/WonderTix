/**
 * Inteface of Event
 *
 * @param {string} id - unique identifier for the event
 *
 * @param {string} title - name of the event
 *
 * @param {string} description - description of the event
 *
 * @param {string} imageurl - url to thumbnail of the event
 */


export default interface Event {
  id: string;
  title: string;
  description: string;
  imageurl: string;
}
