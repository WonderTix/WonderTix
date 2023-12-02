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

export const getTicketRestriction = async (eventInstanceId: number) => {
  try {
    const ticketRestrictionRes = await fetch(
      process.env.REACT_APP_API_2_URL +
        `/ticket-restriction/${eventInstanceId}`,
    );

    if (!ticketRestrictionRes.ok) {
      throw new Error('Failed to fetch ticket restrictions for event instance');
    }

    const ticketRestrictions = await ticketRestrictionRes.json();
    return ticketRestrictions;
  } catch (error) {
    console.log(error);
    return false;
  }
};
