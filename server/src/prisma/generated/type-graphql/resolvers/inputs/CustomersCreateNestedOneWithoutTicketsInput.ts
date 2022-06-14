import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateOrConnectWithoutTicketsInput} from '../inputs/CustomersCreateOrConnectWithoutTicketsInput';
import {CustomersCreateWithoutTicketsInput} from '../inputs/CustomersCreateWithoutTicketsInput';
import {CustomersWhereUniqueInput} from '../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.InputType('CustomersCreateNestedOneWithoutTicketsInput', {
  isAbstract: true,
})
export class CustomersCreateNestedOneWithoutTicketsInput {
  @TypeGraphQL.Field((_type) => CustomersCreateWithoutTicketsInput, {
    nullable: true,
  })
    create?: CustomersCreateWithoutTicketsInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersCreateOrConnectWithoutTicketsInput, {
    nullable: true,
  })
    connectOrCreate?: CustomersCreateOrConnectWithoutTicketsInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: true,
  })
    connect?: CustomersWhereUniqueInput | undefined;
}
