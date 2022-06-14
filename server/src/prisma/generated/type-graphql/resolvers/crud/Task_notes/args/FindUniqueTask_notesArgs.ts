import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Task_notesWhereUniqueInput} from '../../../inputs/Task_notesWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueTask_notesArgs {
  @TypeGraphQL.Field((_type) => Task_notesWhereUniqueInput, {
    nullable: false,
  })
    where!: Task_notesWhereUniqueInput;
}
