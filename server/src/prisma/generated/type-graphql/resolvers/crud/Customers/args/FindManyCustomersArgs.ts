import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {CustomersOrderByWithRelationInput} from '../../../inputs/CustomersOrderByWithRelationInput';
import {CustomersWhereInput} from '../../../inputs/CustomersWhereInput';
import {CustomersWhereUniqueInput} from '../../../inputs/CustomersWhereUniqueInput';
import {CustomersScalarFieldEnum} from '../../../../enums/CustomersScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindManyCustomersArgs {
  @TypeGraphQL.Field((_type) => CustomersWhereInput, {
    nullable: true,
  })
    where?: CustomersWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [CustomersOrderByWithRelationInput], {
    nullable: true,
  })
    orderBy?: CustomersOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: true,
  })
    cursor?: CustomersWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [CustomersScalarFieldEnum], {
    nullable: true,
  })
    distinct?: Array<'id' | 'custname' | 'email' | 'phone' | 'custaddress' | 'newsletter' | 'donorbadge' | 'seatingaccom' | 'vip' | 'volunteer_list'> | undefined;
}
