import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {ReservationCreateWithoutTaskInput} from '../inputs/ReservationCreateWithoutTaskInput';
import {ReservationWhereUniqueInput} from '../inputs/ReservationWhereUniqueInput';

@TypeGraphQL.InputType('ReservationCreateOrConnectWithoutTaskInput', {
  isAbstract: true,
})
export class ReservationCreateOrConnectWithoutTaskInput {
  @TypeGraphQL.Field((_type) => ReservationWhereUniqueInput, {
    nullable: false,
  })
    where!: ReservationWhereUniqueInput;

  @TypeGraphQL.Field((_type) => ReservationCreateWithoutTaskInput, {
    nullable: false,
  })
    create!: ReservationCreateWithoutTaskInput;
}
