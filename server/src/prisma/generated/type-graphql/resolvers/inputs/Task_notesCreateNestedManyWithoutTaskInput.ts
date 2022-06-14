import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Task_notesCreateManyTaskInputEnvelope} from '../inputs/Task_notesCreateManyTaskInputEnvelope';
import {Task_notesCreateOrConnectWithoutTaskInput} from '../inputs/Task_notesCreateOrConnectWithoutTaskInput';
import {Task_notesCreateWithoutTaskInput} from '../inputs/Task_notesCreateWithoutTaskInput';
import {Task_notesWhereUniqueInput} from '../inputs/Task_notesWhereUniqueInput';

@TypeGraphQL.InputType('Task_notesCreateNestedManyWithoutTaskInput', {
  isAbstract: true,
})
export class Task_notesCreateNestedManyWithoutTaskInput {
  @TypeGraphQL.Field((_type) => [Task_notesCreateWithoutTaskInput], {
    nullable: true,
  })
    create?: Task_notesCreateWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Task_notesCreateOrConnectWithoutTaskInput], {
    nullable: true,
  })
    connectOrCreate?: Task_notesCreateOrConnectWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field((_type) => Task_notesCreateManyTaskInputEnvelope, {
    nullable: true,
  })
    createMany?: Task_notesCreateManyTaskInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [Task_notesWhereUniqueInput], {
    nullable: true,
  })
    connect?: Task_notesWhereUniqueInput[] | undefined;
}
