import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateManyCustomersInputEnvelope} from '../inputs/TaskCreateManyCustomersInputEnvelope';
import {TaskCreateOrConnectWithoutCustomersInput} from '../inputs/TaskCreateOrConnectWithoutCustomersInput';
import {TaskCreateWithoutCustomersInput} from '../inputs/TaskCreateWithoutCustomersInput';
import {TaskScalarWhereInput} from '../inputs/TaskScalarWhereInput';
import {TaskUpdateManyWithWhereWithoutCustomersInput} from '../inputs/TaskUpdateManyWithWhereWithoutCustomersInput';
import {TaskUpdateWithWhereUniqueWithoutCustomersInput} from '../inputs/TaskUpdateWithWhereUniqueWithoutCustomersInput';
import {TaskUpsertWithWhereUniqueWithoutCustomersInput} from '../inputs/TaskUpsertWithWhereUniqueWithoutCustomersInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskUpdateManyWithoutCustomersInput', {
  isAbstract: true,
})
export class TaskUpdateManyWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => [TaskCreateWithoutCustomersInput], {
    nullable: true,
  })
    create?: TaskCreateWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskCreateOrConnectWithoutCustomersInput], {
    nullable: true,
  })
    connectOrCreate?: TaskCreateOrConnectWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskUpsertWithWhereUniqueWithoutCustomersInput], {
    nullable: true,
  })
    upsert?: TaskUpsertWithWhereUniqueWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => TaskCreateManyCustomersInputEnvelope, {
    nullable: true,
  })
    createMany?: TaskCreateManyCustomersInputEnvelope | undefined;

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

  @TypeGraphQL.Field((_type) => [TaskUpdateWithWhereUniqueWithoutCustomersInput], {
    nullable: true,
  })
    update?: TaskUpdateWithWhereUniqueWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskUpdateManyWithWhereWithoutCustomersInput], {
    nullable: true,
  })
    updateMany?: TaskUpdateManyWithWhereWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskScalarWhereInput], {
    nullable: true,
  })
    deleteMany?: TaskScalarWhereInput[] | undefined;
}
