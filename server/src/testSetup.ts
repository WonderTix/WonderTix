import axios from 'axios';

let token = '';

beforeAll(async () => {
  console.log('Setting up Auth0 token for API tests');
  const body = {client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
  };

  const tokenRequest = await axios.post(
      `${process.env.AUTH0_URL}/oauth/token`,
      body,
  );

  token = tokenRequest.data.access_token;
});

export const getToken = () => token;
