import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {ReservationCreateWithoutTaskInput} from '../inputs/ReservationCreateWithoutTaskInput';
import {ReservationUpdateWithoutTaskInput} from '../inputs/ReservationUpdateWithoutTaskInput';

@TypeGraphQL.InputType('ReservationUpsertWithoutTaskInput', {
  isAbstract: true,
})
export class ReservationUpsertWithoutTaskInput {
  @TypeGraphQL.Field((_type) => ReservationUpdateWithoutTaskInput, {
    nullable: false,
  })
    update!: ReservationUpdateWithoutTaskInput;

  @TypeGraphQL.Field((_type) => ReservationCreateWithoutTaskInput, {
    nullable: false,
  })
    create!: ReservationCreateWithoutTaskInput;
}
