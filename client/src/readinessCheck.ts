//  Notifies /status endpoint when all page content has loaded
//
const readinessCheck = () => {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_2_URL}/status?setReady=true`);
      console.log('App is ready:', response.status);
    } catch (error) {
      console.error('Error setting app readiness:', await response.text());
    }
  });
};

export default readinessCheck;

