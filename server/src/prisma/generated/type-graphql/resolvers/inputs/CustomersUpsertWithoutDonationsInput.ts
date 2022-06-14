import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateWithoutDonationsInput} from '../inputs/CustomersCreateWithoutDonationsInput';
import {CustomersUpdateWithoutDonationsInput} from '../inputs/CustomersUpdateWithoutDonationsInput';

@TypeGraphQL.InputType('CustomersUpsertWithoutDonationsInput', {
  isAbstract: true,
})
export class CustomersUpsertWithoutDonationsInput {
  @TypeGraphQL.Field((_type) => CustomersUpdateWithoutDonationsInput, {
    nullable: false,
  })
    update!: CustomersUpdateWithoutDonationsInput;

  @TypeGraphQL.Field((_type) => CustomersCreateWithoutDonationsInput, {
    nullable: false,
  })
    create!: CustomersCreateWithoutDonationsInput;
}
