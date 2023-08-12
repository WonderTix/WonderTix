import * as yup from 'yup';

export const eventInstanceSchema = yup.object().shape({
  eventtime: yup.string().required('Required'),
  eventdate: yup.date().min(new Date()).required('Required'),
  totalseats: yup.number().integer().positive().required('Required'),
  ticketTypeId: yup.array().of(yup.number()).required(),
  seatsForType: yup.array().of(yup.number()).required(),
});

export const eventGeneralSchema = yup.object().shape({
  eventname: yup.string().min(1).required('Required'),
  eventdescription: yup.string().min(1).required('Required'),
  imageurl: yup.string().min(1).required('Required'),
  active: yup.boolean().required('Required'),
});
