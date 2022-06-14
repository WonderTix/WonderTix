import * as TypeGraphQL from 'type-graphql';

export enum CustomersScalarFieldEnum {
  id = 'id',
  custname = 'custname',
  email = 'email',
  phone = 'phone',
  custaddress = 'custaddress',
  newsletter = 'newsletter',
  donorbadge = 'donorbadge',
  seatingaccom = 'seatingaccom',
  vip = 'vip',
  volunteer_list = 'volunteer_list'
}
TypeGraphQL.registerEnumType(CustomersScalarFieldEnum, {
  name: 'CustomersScalarFieldEnum',
  description: undefined,
});
