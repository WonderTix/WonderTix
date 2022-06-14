import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateManyReservationInputEnvelope} from '../inputs/TaskCreateManyReservationInputEnvelope';
import {TaskCreateOrConnectWithoutReservationInput} from '../inputs/TaskCreateOrConnectWithoutReservationInput';
import {TaskCreateWithoutReservationInput} from '../inputs/TaskCreateWithoutReservationInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskCreateNestedManyWithoutReservationInput', {
  isAbstract: true,
})
export class TaskCreateNestedManyWithoutReservationInput {
  @TypeGraphQL.Field((_type) => [TaskCreateWithoutReservationInput], {
    nullable: true,
  })
    create?: TaskCreateWithoutReservationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskCreateOrConnectWithoutReservationInput], {
    nullable: true,
  })
    connectOrCreate?: TaskCreateOrConnectWithoutReservationInput[] | undefined;

  @TypeGraphQL.Field((_type) => TaskCreateManyReservationInputEnvelope, {
    nullable: true,
  })
    createMany?: TaskCreateManyReservationInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [TaskWhereUniqueInput], {
    nullable: true,
  })
    connect?: TaskWhereUniqueInput[] | undefined;
}
