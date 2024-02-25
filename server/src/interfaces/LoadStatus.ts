/**
 * Enum for LoadStatus
 *
 * can have 4 states of responce
 * @param {string} idle - waiting for request
 *
 * @param {string} loading - recieved request, performs communication
 *
 * @param {string} success - request is sucessful, returns data
 *
 * @param {string} failed - request is not successful, returns error
 */
export type LoadStatus = 'idle' | 'loading' | 'success' | 'failed';
