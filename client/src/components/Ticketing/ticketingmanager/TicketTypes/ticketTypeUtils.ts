export type TicketType = {
  id?: number;
  description: string;
  price: number;
  concessions: number;
};

export const emptyTicketType: TicketType = {
  description: '',
  price: 0,
  concessions: 0,
};

export const createTicketType = async (
  ticketType: TicketType,
  token: string,
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/ticket-type`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: ticketType.description,
          price: ticketType.price,
          concessions: ticketType.concessions,
        }),
      },
    );

    return await response.json();
  } catch (error) {
    return {error: error.message};
  }
};

export const getTicketTypes = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/ticket-type/editable`,
      {
        method: 'GET',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return await response.json();
  } catch (error) {
    return {error: error.message};
  }
};

export const editTicketType = async (
  ticketType: TicketType,
  token: string,
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/ticket-type/${ticketType.id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: ticketType.description,
          price: ticketType.price,
          concessions: ticketType.concessions,
        }),
      },
    );

    return await response.json();
  } catch (error) {
    return {error: error.message};
  }
};

export const deleteTicketType = async (
  ticketTypeId: number,
  token: string,
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/ticket-type/${ticketTypeId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );

    return response.status === 204 ? {} : await response.json();
  } catch (error) {
    return {error: error.message};
  }
};
