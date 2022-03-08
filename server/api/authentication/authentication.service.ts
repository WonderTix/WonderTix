//this file is mainly for supporting queries regarding user login/authentication info.
import { pool } from '../db';

const bcrypt = require('bcryptjs');

export const allUsers = () => {
  const allUsersQuery = 'SELECT * from user_acct'
  return pool.query(allUsersQuery);
}

export const findUser = (username: string) => {
    const userQuery = `SELECT * FROM user_acct WHERE username = ${username}`;
    return pool.query(userQuery);
  };

export const findUserId = (id: any) => {
    const idQuery = `SELECT username FROM user_acct WHERE id = ${id}`;
    return pool.query(idQuery);
  };