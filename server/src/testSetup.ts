import axios from 'axios';
import {readFileSync, writeFileSync} from 'fs';

const envFile = readFileSync('.env', 'utf8');
const token = RegExp(/AUTH0_TOKEN=(.*)/).exec(envFile)?.[1] ?? null;

beforeAll(async () => {
  if (!token) {
    console.log('Setting up Auth0 token for API tests');
    const headers = {
      'content-type': 'application/json',
    };
    const body = {
      client_id: process.env.AUTH0_CLIENT_ID_TK,
      client_secret: process.env.AUTH0_CLIENT_SECRET_TK,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: 'client_credentials',
    };
    const config = {
      headers: headers,
    };
    const tokenRequest = axios.post(
        `${process.env.AUTH0_URL}/oauth/token`,
        body,
        config,
    );
    process.env.AUTH0_TOKEN = (await tokenRequest).data.access_token;
    if (!token) {
      writeFileSync(
          '.env',
          `AUTH0_TOKEN=${process.env.AUTH0_TOKEN}`,
          {flag: 'w'},
      );
    }
  } else {
    console.log('Auth0 token already set');
  }
});

export const getToken = () => token;
