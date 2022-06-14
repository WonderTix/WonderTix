import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Task_notesCreateInput} from '../../../inputs/Task_notesCreateInput';

@TypeGraphQL.ArgsType()
export class CreateTask_notesArgs {
  @TypeGraphQL.Field((_type) => Task_notesCreateInput, {
    nullable: false,
  })
    data!: Task_notesCreateInput;
}
