import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateWithoutReservationInput} from '../inputs/TaskCreateWithoutReservationInput';
import {TaskUpdateWithoutReservationInput} from '../inputs/TaskUpdateWithoutReservationInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskUpsertWithWhereUniqueWithoutReservationInput', {
  isAbstract: true,
})
export class TaskUpsertWithWhereUniqueWithoutReservationInput {
  @TypeGraphQL.Field((_type) => TaskWhereUniqueInput, {
    nullable: false,
  })
    where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TaskUpdateWithoutReservationInput, {
    nullable: false,
  })
    update!: TaskUpdateWithoutReservationInput;

  @TypeGraphQL.Field((_type) => TaskCreateWithoutReservationInput, {
    nullable: false,
  })
    create!: TaskCreateWithoutReservationInput;
}
