import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {ReservationScalarWhereInput} from '../inputs/ReservationScalarWhereInput';
import {ReservationUpdateManyMutationInput} from '../inputs/ReservationUpdateManyMutationInput';

@TypeGraphQL.InputType('ReservationUpdateManyWithWhereWithoutCustomersInput', {
  isAbstract: true,
})
export class ReservationUpdateManyWithWhereWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => ReservationScalarWhereInput, {
    nullable: false,
  })
    where!: ReservationScalarWhereInput;

  @TypeGraphQL.Field((_type) => ReservationUpdateManyMutationInput, {
    nullable: false,
  })
    data!: ReservationUpdateManyMutationInput;
}
