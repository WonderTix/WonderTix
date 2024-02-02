export const getAllTicketRestrictions = async () => {
  try {
    const allTicketRestrictionRes = await fetch(
      process.env.REACT_APP_API_2_URL + '/ticket-restriction',
    );

    if (!allTicketRestrictionRes.ok) {
      throw new Error('Failed to fetch ticket all restrictions');
    }

    const allTicketRestrictions = await allTicketRestrictionRes.json();
    return allTicketRestrictions;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getDiscountCode = async (code: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/discount/code/${code}?active=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch discount code ${code}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
