import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateWithoutReservationInput} from '../inputs/CustomersCreateWithoutReservationInput';
import {CustomersUpdateWithoutReservationInput} from '../inputs/CustomersUpdateWithoutReservationInput';

@TypeGraphQL.InputType('CustomersUpsertWithoutReservationInput', {
  isAbstract: true,
})
export class CustomersUpsertWithoutReservationInput {
  @TypeGraphQL.Field((_type) => CustomersUpdateWithoutReservationInput, {
    nullable: false,
  })
    update!: CustomersUpdateWithoutReservationInput;

  @TypeGraphQL.Field((_type) => CustomersCreateWithoutReservationInput, {
    nullable: false,
  })
    create!: CustomersCreateWithoutReservationInput;
}
