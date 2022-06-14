import * as TypeGraphQL from 'type-graphql';

export enum UsersScalarFieldEnum {
  id = 'id',
  username = 'username',
  pass_hash = 'pass_hash',
  is_superadmin = 'is_superadmin'
}
TypeGraphQL.registerEnumType(UsersScalarFieldEnum, {
  name: 'UsersScalarFieldEnum',
  description: undefined,
});
