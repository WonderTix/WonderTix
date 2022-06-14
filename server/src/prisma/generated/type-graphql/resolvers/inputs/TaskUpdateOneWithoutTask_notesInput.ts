import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateOrConnectWithoutTask_notesInput} from '../inputs/TaskCreateOrConnectWithoutTask_notesInput';
import {TaskCreateWithoutTask_notesInput} from '../inputs/TaskCreateWithoutTask_notesInput';
import {TaskUpdateWithoutTask_notesInput} from '../inputs/TaskUpdateWithoutTask_notesInput';
import {TaskUpsertWithoutTask_notesInput} from '../inputs/TaskUpsertWithoutTask_notesInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskUpdateOneWithoutTask_notesInput', {
  isAbstract: true,
})
export class TaskUpdateOneWithoutTask_notesInput {
  @TypeGraphQL.Field((_type) => TaskCreateWithoutTask_notesInput, {
    nullable: true,
  })
    create?: TaskCreateWithoutTask_notesInput | undefined;

  @TypeGraphQL.Field((_type) => TaskCreateOrConnectWithoutTask_notesInput, {
    nullable: true,
  })
    connectOrCreate?: TaskCreateOrConnectWithoutTask_notesInput | undefined;

  @TypeGraphQL.Field((_type) => TaskUpsertWithoutTask_notesInput, {
    nullable: true,
  })
    upsert?: TaskUpsertWithoutTask_notesInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => TaskWhereUniqueInput, {
    nullable: true,
  })
    connect?: TaskWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TaskUpdateWithoutTask_notesInput, {
    nullable: true,
  })
    update?: TaskUpdateWithoutTask_notesInput | undefined;
}
