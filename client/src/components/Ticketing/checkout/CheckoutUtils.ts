export const validateContactInput = (values) => {
  const errors = {};

  if (values.seatingaccom === 'Other' && !values.otherSeatingAcc) {
    errors['otherSeatingAcc'] = 'Please Input Accommodation';
  }

  if (!values.email?.match(new RegExp('.+@.+\\..+'))) {
    errors['email'] = 'Invalid';
  } else if (!values.confirmEmail) {
    errors['confirmEmail'] = 'Invalid';
  } else if (values.email !== values.confirmEmail) {
    errors['email'] = 'Email does not match';
    errors['confirmEmail'] = 'Email does not match';
  }

  if (
    values.phone &&
    !values.phone.match(
      new RegExp(
        '^(\\+?\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
      ),
    )
  ) {
    errors['phone'] = 'Invalid';
  }

  Object.keys(baseContact).forEach((key) => {
    if (
      [
        'firstname',
        'lastname',
        'address',
        'postalcode',
        'email',
        'confirmEmail',
      ].includes(key) &&
      !values[key]
    ) {
      errors[key] = 'Required';
    }
  });

  return errors;
};

export const validateContactInputAdmin = (values) => {
  const errors = {};

  if (!values.email?.match(new RegExp('.+@.+\\..+'))) {
    errors['email'] = 'Invalid';
  } else if (!values.confirmEmail) {
    errors['confirmEmail'] = 'Invalid';
  } else if (values.email !== values.confirmEmail) {
    errors['email'] = 'Email does not match';
    errors['confirmEmail'] = 'Email does not match';
  }

  if (
    values.phone &&
    !values.phone.match(
      new RegExp(
        '^(\\+?\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
      ),
    )
  ) {
    errors['phone'] = 'Invalid';
  }

  if (
    values.seatingAcc === 'Other' &&
    (!values.otherSeatingAcc || values.otherSeatingAcc === '')
  ) {
    errors['otherSeatingAcc'] = 'Please Input Accommodation';
  }

  if (values.donation < 0) {
    errors['donation'] = 'Invalid';
  }

  Object.keys(baseContact).forEach((key) => {
    if (
      ['firstname', 'lastname', 'email', 'confirmEmail'].includes(key) &&
      (!values[key] || values[key] === '')
    ) {
      errors[key] = 'Required';
    }
  });
  return errors;
};

/**
 * Info needed for contact at checkout
 *
 * @module
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} address
 * @param {string} city
 * @param {string} state
 * @param {string} postalcode
 * @param {string} country
 * @param {string} phone
 * @param {string} email
 * @param {string} visitsource
 * @param {string} seatingaccom
 * @param {string} otherSeatingAcc
 * @param {string} comments
 * @param {boolean} newsletter
 */

export interface CheckoutContact {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
  phone: string;
  email: string;
  confirmEmail: string;
  visitsource: string;
  seatingaccom: string;
  otherSeatingAcc: string;
  comments: string;
  newsletter: boolean;
  donation?: number;
}

export const baseContact: CheckoutContact = {
  firstname: '',
  lastname: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postalcode: '',
  phone: '',
  email: '',
  confirmEmail: '',
  visitsource: '',
  seatingaccom: 'None',
  otherSeatingAcc: '',
  comments: '',
  newsletter: true,
};
