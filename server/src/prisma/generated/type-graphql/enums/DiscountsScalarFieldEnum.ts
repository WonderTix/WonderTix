import * as TypeGraphQL from 'type-graphql';

export enum DiscountsScalarFieldEnum {
  id = 'id',
  code = 'code',
  amount = 'amount',
  enddate = 'enddate',
  startdate = 'startdate',
  usagelimit = 'usagelimit',
  min_tickets = 'min_tickets',
  min_events = 'min_events'
}
TypeGraphQL.registerEnumType(DiscountsScalarFieldEnum, {
  name: 'DiscountsScalarFieldEnum',
  description: undefined,
});
