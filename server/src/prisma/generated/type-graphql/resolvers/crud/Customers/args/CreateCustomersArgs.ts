import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {CustomersCreateInput} from '../../../inputs/CustomersCreateInput';

@TypeGraphQL.ArgsType()
export class CreateCustomersArgs {
  @TypeGraphQL.Field((_type) => CustomersCreateInput, {
    nullable: false,
  })
    data!: CustomersCreateInput;
}
