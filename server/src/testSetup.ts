import axios from 'axios';

let token = '';

beforeAll(async () => {
  console.log('Setting up Auth0 token for API tests');
  const headers = {
    'content-type': 'application/json',
  };
  const body = {
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
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
  token = await (await tokenRequest).data.access_token;
});

export const getToken = () => token;
