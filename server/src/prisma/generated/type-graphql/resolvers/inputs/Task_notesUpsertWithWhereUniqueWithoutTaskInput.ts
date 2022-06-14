import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Task_notesCreateWithoutTaskInput} from '../inputs/Task_notesCreateWithoutTaskInput';
import {Task_notesUpdateWithoutTaskInput} from '../inputs/Task_notesUpdateWithoutTaskInput';
import {Task_notesWhereUniqueInput} from '../inputs/Task_notesWhereUniqueInput';

@TypeGraphQL.InputType('Task_notesUpsertWithWhereUniqueWithoutTaskInput', {
  isAbstract: true,
})
export class Task_notesUpsertWithWhereUniqueWithoutTaskInput {
  @TypeGraphQL.Field((_type) => Task_notesWhereUniqueInput, {
    nullable: false,
  })
    where!: Task_notesWhereUniqueInput;

  @TypeGraphQL.Field((_type) => Task_notesUpdateWithoutTaskInput, {
    nullable: false,
  })
    update!: Task_notesUpdateWithoutTaskInput;

  @TypeGraphQL.Field((_type) => Task_notesCreateWithoutTaskInput, {
    nullable: false,
  })
    create!: Task_notesCreateWithoutTaskInput;
}
