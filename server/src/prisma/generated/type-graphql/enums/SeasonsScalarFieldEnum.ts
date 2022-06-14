import * as TypeGraphQL from 'type-graphql';

export enum SeasonsScalarFieldEnum {
  id = 'id',
  name = 'name',
  startdate = 'startdate',
  enddate = 'enddate'
}
TypeGraphQL.registerEnumType(SeasonsScalarFieldEnum, {
  name: 'SeasonsScalarFieldEnum',
  description: undefined,
});
