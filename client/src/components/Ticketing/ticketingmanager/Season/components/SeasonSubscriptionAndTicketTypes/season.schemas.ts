import * as yup from 'yup';

export const subscriptionTypesSchema = yup.object().shape({
  subscriptionTypes: yup.array().of(
    yup.object().shape({
      subscriptiontypeid_fk: yup
        .number()
        .integer('Must be an integer')
        .required('Required'),
      price: yup
        .number()
        .min(0, 'Positive Price Required')
        .required('Required'),
      ticketlimit: yup
        .number()
        .integer('Must be an integer')
        .min(1, 'Must be greater than 0'),
      subscriptionlimit: yup
        .number()
        .integer('Must be an integer')
        .min(1, 'Must be greater than 0'),
    }),
  ),
});

export const ticketTypeSchema = yup.object().shape({
  ticketTypes: yup.array().of(
    yup.object().shape({
      tickettypeid_fk: yup
        .number()
        .integer('Must be an integer')
        .required('Required'),
      fee: yup.number().min(0, 'Positive Fee Required').required('Required'),
      price: yup
        .number()
        .min(0, 'Positive Price Required')
        .required('Required'),
    }),
  ),
});
