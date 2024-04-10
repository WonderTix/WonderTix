import * as yup from 'yup';

export const eventInstanceSchema = yup.object().shape({
  eventtime: yup.string().required('Required'),
  eventdate: yup.date().required('Required'),
  detail: yup.string().max(255, 'Must be less than 256 characters'),
  totalseats: yup.number().integer().positive().required('Required'),
  instanceTicketTypes: yup.array().of(
    yup.object().shape({
      tickettypeid_fk: yup
        .number()
        .integer('Must be an integer')
        .required('Required'),
      ticketlimit: yup
        .number()
        .integer('Must be an integer')
        .min(1, 'Must be greater than 0')
        .test(
          'ticket count check',
          'Cannot exceed total seats',
          function test(value) {
            // eslint-disable-next-line no-invalid-this
            return value <= this.options.context.totalseats;
          },
        ),
      fee: yup.number().min(0, 'Must be 0 or greater').required('Required'),
      price: yup.number().min(0, 'Must be 0 or greater').required('Required'),
    }),
  ),
});

export const eventGeneralSchema = yup.object().shape({
  eventname: yup.string().min(1).max(255, 'Must be less than 256 characters').required('Required'),
  eventdescription: yup.string().min(1).max(255, 'Must be less than 256 characters').required('Required'),
  imageurl: yup
    .string()
    .max(255, 'Image url can not be longer than 255 characters'),
  active: yup.boolean().required('Required'),
});
