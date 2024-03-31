import * as yup from 'yup';

export const subscriptionTicketItemSchema = yup.object().shape({
  subscriptionticketitems: yup.array().of(
    yup.object().shape({
      eventid: yup
        .number()
        .integer('Must be an integer')
        .min(0, 'Must select event')
        .required('Required'),
      eventinstanceid: yup
        .number()
        .integer('Must be an integer')
        .min(0, 'Must select a showing')
        .required('Required'),
      ticketrestrictionid: yup
        .number()
        .integer('Must be an integer')
        .min(0, 'Must select a ticket restriction')
        .required('Required'),
    }),
  ),
});

