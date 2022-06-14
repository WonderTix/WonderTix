import * as TypeGraphQL from 'type-graphql';

export enum Event_instancesScalarFieldEnum {
  id = 'id',
  eventid = 'eventid',
  eventdate = 'eventdate',
  starttime = 'starttime',
  salestatus = 'salestatus',
  totalseats = 'totalseats',
  availableseats = 'availableseats',
  purchaseuri = 'purchaseuri'
}
TypeGraphQL.registerEnumType(Event_instancesScalarFieldEnum, {
  name: 'Event_instancesScalarFieldEnum',
  description: undefined,
});
