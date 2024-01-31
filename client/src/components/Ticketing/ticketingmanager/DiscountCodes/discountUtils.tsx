
/**
 * Type for information relating to a discount code.
 */
export type DiscountCode = {
  discountId?: number,
  code: string,
  active: boolean,
  amount?: number,
  percent?: number,
  minTickets?: number,
  minEvents?: number,
}

export const baseDiscountCode = {
  code: '',
  active: false,
};

export const createDiscountCode = async (discountCode: DiscountCode, token: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/discount`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: discountCode.code,
          active: discountCode.active,
          amount: (discountCode.amount || discountCode.amount === 0) ? Number(discountCode.amount) : null,
          percent: (discountCode.percent || discountCode.percent === 0) ? Number(discountCode.percent) : null,
          min_tickets: (discountCode.minTickets || discountCode.minTickets === 0) ? Number(discountCode.minTickets) : null,
          min_events: (discountCode.minEvents || discountCode.minEvents === 0) ? Number(discountCode.minEvents) : null,
        }),
      },
    );

    if (!response.ok) {
      console.log(response);
      console.error('Failed to create discount code');
    }
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDiscountCodes = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/discount`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );
    const discountCodes = await response.json();
    return discountCodes;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const editDiscountCode = async (discountCode: DiscountCode, token: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/discount/${discountCode.discountId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: discountCode.code,
          active: discountCode.active,
          amount: (discountCode.amount || discountCode.amount === 0) ? Number(discountCode.amount) : null,
          percent: (discountCode.percent || discountCode.percent === 0) ? Number(discountCode.percent) : null,
          min_tickets: (discountCode.minTickets || discountCode.minTickets === 0) ? Number(discountCode.minTickets) : null,
          min_events: (discountCode.minEvents || discountCode.minEvents === 0) ? Number(discountCode.minEvents) : null,
        }),
      },
    );

    if (!response.ok) {
      console.error('Failed to edit discount code');
    }
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteDiscountCode = async (discountId: number, token: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_2_URL}/discount/${discountId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.error('Failed to delete discount code');
    }
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};