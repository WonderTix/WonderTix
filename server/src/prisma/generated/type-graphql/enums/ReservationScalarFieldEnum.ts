import * as TypeGraphQL from 'type-graphql';

export enum ReservationScalarFieldEnum {
  transno = 'transno',
  custid = 'custid',
  eventid = 'eventid',
  eventname = 'eventname',
  eventdate = 'eventdate',
  showtime = 'showtime',
  numtickets = 'numtickets'
}
TypeGraphQL.registerEnumType(ReservationScalarFieldEnum, {
  name: 'ReservationScalarFieldEnum',
  description: undefined,
});
