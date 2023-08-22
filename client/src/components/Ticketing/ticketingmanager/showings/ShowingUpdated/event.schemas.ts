import * as yup from 'yup';

export const eventInstanceSchema = yup.object().shape({
  eventtime: yup.string().required('Required'),
  eventdate: yup.date().required('Required'),
  totalseats: yup.number().integer().positive().required('Required'),
  instanceTicketTypes: yup.array().of(
      yup.object().shape({
        typeID: yup.number().integer().required('Required'),
        typeQuantity: yup.number()
            .integer()
            .min(1, 'Must Be Greater Than 0')
            .test('ticket count check',
                'Cannot Exceed Total Seats',
                function test(value) {
                  // eslint-disable-next-line no-invalid-this
                  return value <= this.options.context.totalseats;
                }),
      })),
});

export const eventGeneralSchema = yup.object().shape({
  eventname: yup.string().min(1).required('Required'),
  eventdescription: yup.string().min(1).required('Required'),
  imageurl: yup.string().min(1).required('Required'),
  active: yup.boolean().required('Required'),
});
