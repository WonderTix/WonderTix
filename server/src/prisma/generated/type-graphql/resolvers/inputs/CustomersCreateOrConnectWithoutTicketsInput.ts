import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateWithoutTicketsInput} from '../inputs/CustomersCreateWithoutTicketsInput';
import {CustomersWhereUniqueInput} from '../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.InputType('CustomersCreateOrConnectWithoutTicketsInput', {
  isAbstract: true,
})
export class CustomersCreateOrConnectWithoutTicketsInput {
  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: false,
  })
    where!: CustomersWhereUniqueInput;

  @TypeGraphQL.Field((_type) => CustomersCreateWithoutTicketsInput, {
    nullable: false,
  })
    create!: CustomersCreateWithoutTicketsInput;
}
