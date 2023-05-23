/**
 * User Interface
 *
 * @param {string} username - user name for the account
 *
 * @param {number} id - unique identifier of the account
 *
 * @param {boolean} is_superadmin - flag to identify if user
 *  has administrative permissions
 */

export default interface User {
    username: string;
    id: number;
    is_superadmin: boolean;
}
