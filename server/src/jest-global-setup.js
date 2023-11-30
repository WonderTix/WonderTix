const axios = require('axios');

module.exports = async () => {
  // Fetch and set the token only if it's not already set
  if (!process.env.TEST_TOKEN) {
    try {
      const response = await axios.request({
        method: 'POST',
        url: `${process.env.AUTH0_URL}/oauth/token`,
        headers: {'content-type': 'application/json'},
        data: {
          client_id: process.env.AUTH0_SERVER_ID,
          client_secret: process.env.AUTH0_SERVER_SECRET,
          audience: process.env.AUTH0_AUDIENCE,
          grant_type: 'client_credentials',
        },
      });

      process.env.TEST_TOKEN = response.data.access_token;
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }
};
