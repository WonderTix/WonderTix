import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const axios = require('axios').default;

let token = '';

// Set up a token for the API tests
beforeAll(async () => {
  try {
    const testInfo = await prisma.testInfo.findFirst({
      where: {
        id: 1,
      },
    });
    if (testInfo) {
      const tokenValue = testInfo.token;
      token = tokenValue;
    } else {
      console.info('No token value found');
    }
  } catch (error) {
    console.error('Error getting token value: ', error);
  } finally {
    await prisma.$disconnect();
  }
  if (!token) {
    console.info('Setting up Auth0 token for API tests');

    const options = {
      method: 'POST',
      url: `${process.env.AUTH0_URL}/oauth/token`,
      headers: {'content-type': 'application/json'},
      data: {
        client_id: process.env.AUTH0_SERVER_ID,
        client_secret: process.env.AUTH0_SERVER_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      },
    };
    token = await axios.request(options).then(
        function(response: { data: { access_token: any } }) {
          return response.data.access_token;
        },
        function(error: any) {
          console.error(error);
        },
    );
    const tokenRequest = await axios.request(options);
    token = tokenRequest.data.access_token;
    try {
      await prisma.testInfo.update({
        where: {
          id: 1,
        },
        data: {
          token: token,
        },
      });
    } catch (error) {
      console.error('Error updating token value: ', error);
    } finally {
      await prisma.$disconnect();
    }
  } else {
    console.info('Auth0 token already set');
  }
});

export const getToken = () => token;
