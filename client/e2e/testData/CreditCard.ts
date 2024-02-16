// Credit card info, to be used in conjunction with the Stripe test card numbers
export interface CreditCardInfo {
  cardNumber: string;
  CVC: string;
  date: string;
}

export const VALID_VISA_CREDIT: CreditCardInfo = {
  cardNumber: '4242 4242 4242 4242',
  CVC: '999',
  date: '12 / 30',
};

