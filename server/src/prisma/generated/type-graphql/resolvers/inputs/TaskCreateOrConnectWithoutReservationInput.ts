import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateWithoutReservationInput} from '../inputs/TaskCreateWithoutReservationInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskCreateOrConnectWithoutReservationInput', {
  isAbstract: true,
})
export class TaskCreateOrConnectWithoutReservationInput {
  @TypeGraphQL.Field((_type) => TaskWhereUniqueInput, {
    nullable: false,
  })
    where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TaskCreateWithoutReservationInput, {
    nullable: false,
  })
    create!: TaskCreateWithoutReservationInput;
}
