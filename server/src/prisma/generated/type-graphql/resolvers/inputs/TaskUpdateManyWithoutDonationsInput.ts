import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateManyDonationsInputEnvelope} from '../inputs/TaskCreateManyDonationsInputEnvelope';
import {TaskCreateOrConnectWithoutDonationsInput} from '../inputs/TaskCreateOrConnectWithoutDonationsInput';
import {TaskCreateWithoutDonationsInput} from '../inputs/TaskCreateWithoutDonationsInput';
import {TaskScalarWhereInput} from '../inputs/TaskScalarWhereInput';
import {TaskUpdateManyWithWhereWithoutDonationsInput} from '../inputs/TaskUpdateManyWithWhereWithoutDonationsInput';
import {TaskUpdateWithWhereUniqueWithoutDonationsInput} from '../inputs/TaskUpdateWithWhereUniqueWithoutDonationsInput';
import {TaskUpsertWithWhereUniqueWithoutDonationsInput} from '../inputs/TaskUpsertWithWhereUniqueWithoutDonationsInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskUpdateManyWithoutDonationsInput', {
  isAbstract: true,
})
export class TaskUpdateManyWithoutDonationsInput {
  @TypeGraphQL.Field((_type) => [TaskCreateWithoutDonationsInput], {
    nullable: true,
  })
    create?: TaskCreateWithoutDonationsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskCreateOrConnectWithoutDonationsInput], {
    nullable: true,
  })
    connectOrCreate?: TaskCreateOrConnectWithoutDonationsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskUpsertWithWhereUniqueWithoutDonationsInput], {
    nullable: true,
  })
    upsert?: TaskUpsertWithWhereUniqueWithoutDonationsInput[] | undefined;

  @TypeGraphQL.Field((_type) => TaskCreateManyDonationsInputEnvelope, {
    nullable: true,
  })
    createMany?: TaskCreateManyDonationsInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [TaskWhereUniqueInput], {
    nullable: true,
  })
    set?: TaskWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskWhereUniqueInput], {
    nullable: true,
  })
    disconnect?: TaskWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskWhereUniqueInput], {
    nullable: true,
  })
    delete?: TaskWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskWhereUniqueInput], {
    nullable: true,
  })
    connect?: TaskWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskUpdateWithWhereUniqueWithoutDonationsInput], {
    nullable: true,
  })
    update?: TaskUpdateWithWhereUniqueWithoutDonationsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskUpdateManyWithWhereWithoutDonationsInput], {
    nullable: true,
  })
    updateMany?: TaskUpdateManyWithWhereWithoutDonationsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskScalarWhereInput], {
    nullable: true,
  })
    deleteMany?: TaskScalarWhereInput[] | undefined;
}
