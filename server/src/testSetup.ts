/* eslint-disable require-jsdoc */
// import {PrismaClient} from '@prisma/client';

// const prisma = new PrismaClient();
// const axios = require('axios').default;

// let token = '';

// // Set up a token for the API tests
// beforeAll(async () => {
//   try {
//     const testInfo = await prisma.testInfo.findFirst({
//       where: {
//         id: 1,
//       },
//     });
//     if (testInfo) {
//       const tokenValue = testInfo.token;
//       token = tokenValue;
//     } else {
//       console.info('No token value found');
//     }
//   } catch (error) {
//     console.error('Error getting token value: ', error);
//   } finally {
//     await prisma.$disconnect();
//   }
//   if (!token) {
//     console.info('Setting up Auth0 token for API tests');

//     const options = {
//       method: 'POST',
//       url: `${process.env.AUTH0_URL}/oauth/token`,
//       headers: {'content-type': 'application/json'},
//       data: {
//         client_id: process.env.AUTH0_SERVER_ID,
//         client_secret: process.env.AUTH0_SERVER_SECRET,
//         audience: process.env.AUTH0_AUDIENCE,
//         grant_type: 'client_credentials',
//       },
//     };
// //    token = await axios.request(options).then(
// //        function(response: { data: { access_token: any } }) {
//     //       return response.data.access_token;
//     //     },
//     //     function(error: any) {
//     //       console.error(error);
//     //     },
//     // );
//     const tokenRequest = await axios.request(options);
//     token = tokenRequest.data.access_token;
//     try {
//       await prisma.testInfo.update({
//         where: {
//           id: 1,
//         },
//         data: {
//           token: token,
//         },
//       });
//     } catch (error) {
//       console.error('Error updating token value: ', error);
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     console.info('Auth0 token already set');
//   }
// });

// export const getToken = () => token;

const axios = require('axios').default;

const authModule = require('./jest-global-setup.js');

// Function to fetch token
async function fetchToken() {
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
  try {
    const response = await axios.request(options);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}

// Set up a token for the API tests
beforeAll(async () => {
  await authModule();
  if (!process.env.TEST_TOKEN) {
    console.info('Fetching new Auth0 token for API tests');
    const token = await fetchToken();
    if (token) {
      process.env.TEST_TOKEN = token; // Setting token for this process
    }
  } else {
    console.info('Using existing token from environment variable');
  }
});

export const getToken = () => process.env.TEST_TOKEN;
