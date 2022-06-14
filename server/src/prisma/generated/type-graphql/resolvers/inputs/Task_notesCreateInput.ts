import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateNestedOneWithoutTask_notesInput} from '../inputs/TaskCreateNestedOneWithoutTask_notesInput';

@TypeGraphQL.InputType('Task_notesCreateInput', {
  isAbstract: true,
})
export class Task_notesCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    notes?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    date_created?: Date | undefined;

  @TypeGraphQL.Field((_type) => TaskCreateNestedOneWithoutTask_notesInput, {
    nullable: true,
  })
    task?: TaskCreateNestedOneWithoutTask_notesInput | undefined;
}
