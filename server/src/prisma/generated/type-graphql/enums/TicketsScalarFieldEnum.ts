import * as TypeGraphQL from 'type-graphql';

export enum TicketsScalarFieldEnum {
  ticketno = 'ticketno',
  type = 'type',
  eventinstanceid = 'eventinstanceid',
  custid = 'custid',
  paid = 'paid',
  active = 'active',
  checkedin = 'checkedin',
  checkedin_ts = 'checkedin_ts',
  payment_intent = 'payment_intent',
  comments = 'comments'
}
TypeGraphQL.registerEnumType(TicketsScalarFieldEnum, {
  name: 'TicketsScalarFieldEnum',
  description: undefined,
});
