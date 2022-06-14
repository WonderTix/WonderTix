import * as TypeGraphQL from 'type-graphql';

export enum DonationsScalarFieldEnum {
  id = 'id',
  donorid = 'donorid',
  isanonymous = 'isanonymous',
  amount = 'amount',
  dononame = 'dononame',
  frequency = 'frequency',
  comments = 'comments',
  donodate = 'donodate'
}
TypeGraphQL.registerEnumType(DonationsScalarFieldEnum, {
  name: 'DonationsScalarFieldEnum',
  description: undefined,
});
