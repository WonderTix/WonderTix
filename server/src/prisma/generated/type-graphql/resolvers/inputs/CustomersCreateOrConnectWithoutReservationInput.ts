import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateWithoutReservationInput} from '../inputs/CustomersCreateWithoutReservationInput';
import {CustomersWhereUniqueInput} from '../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.InputType('CustomersCreateOrConnectWithoutReservationInput', {
  isAbstract: true,
})
export class CustomersCreateOrConnectWithoutReservationInput {
  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: false,
  })
    where!: CustomersWhereUniqueInput;

  @TypeGraphQL.Field((_type) => CustomersCreateWithoutReservationInput, {
    nullable: false,
  })
    create!: CustomersCreateWithoutReservationInput;
}
