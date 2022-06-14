import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateOrConnectWithoutDonationsInput} from '../inputs/CustomersCreateOrConnectWithoutDonationsInput';
import {CustomersCreateWithoutDonationsInput} from '../inputs/CustomersCreateWithoutDonationsInput';
import {CustomersWhereUniqueInput} from '../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.InputType('CustomersCreateNestedOneWithoutDonationsInput', {
  isAbstract: true,
})
export class CustomersCreateNestedOneWithoutDonationsInput {
  @TypeGraphQL.Field((_type) => CustomersCreateWithoutDonationsInput, {
    nullable: true,
  })
    create?: CustomersCreateWithoutDonationsInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersCreateOrConnectWithoutDonationsInput, {
    nullable: true,
  })
    connectOrCreate?: CustomersCreateOrConnectWithoutDonationsInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: true,
  })
    connect?: CustomersWhereUniqueInput | undefined;
}
