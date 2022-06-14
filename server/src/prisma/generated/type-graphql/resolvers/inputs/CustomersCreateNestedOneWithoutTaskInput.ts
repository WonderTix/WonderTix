import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateOrConnectWithoutTaskInput} from '../inputs/CustomersCreateOrConnectWithoutTaskInput';
import {CustomersCreateWithoutTaskInput} from '../inputs/CustomersCreateWithoutTaskInput';
import {CustomersWhereUniqueInput} from '../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.InputType('CustomersCreateNestedOneWithoutTaskInput', {
  isAbstract: true,
})
export class CustomersCreateNestedOneWithoutTaskInput {
  @TypeGraphQL.Field((_type) => CustomersCreateWithoutTaskInput, {
    nullable: true,
  })
    create?: CustomersCreateWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersCreateOrConnectWithoutTaskInput, {
    nullable: true,
  })
    connectOrCreate?: CustomersCreateOrConnectWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: true,
  })
    connect?: CustomersWhereUniqueInput | undefined;
}
