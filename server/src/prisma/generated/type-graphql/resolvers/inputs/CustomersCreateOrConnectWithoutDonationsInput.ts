import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateWithoutDonationsInput} from '../inputs/CustomersCreateWithoutDonationsInput';
import {CustomersWhereUniqueInput} from '../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.InputType('CustomersCreateOrConnectWithoutDonationsInput', {
  isAbstract: true,
})
export class CustomersCreateOrConnectWithoutDonationsInput {
  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: false,
  })
    where!: CustomersWhereUniqueInput;

  @TypeGraphQL.Field((_type) => CustomersCreateWithoutDonationsInput, {
    nullable: false,
  })
    create!: CustomersCreateWithoutDonationsInput;
}
