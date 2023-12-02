export const getAllTicketTypes = async (token: string) => {
  try {
    const getAllTicketTypesRes = await fetch(
      process.env.REACT_APP_API_2_URL + '/ticket-type',
      {
        credentials: 'include',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!getAllTicketTypesRes.ok) {
      throw new Error('Failed to fetch all ticket types');
    }

    const allTicketTypes = await getAllTicketTypesRes.json();
    return allTicketTypes;
  } catch (error) {
    console.log(error);
    return false;
  }
};
