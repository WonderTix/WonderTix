import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {CustomersUpdateInput} from '../../../inputs/CustomersUpdateInput';
import {CustomersWhereUniqueInput} from '../../../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpdateCustomersArgs {
  @TypeGraphQL.Field((_type) => CustomersUpdateInput, {
    nullable: false,
  })
    data!: CustomersUpdateInput;

  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: false,
  })
    where!: CustomersWhereUniqueInput;
}
