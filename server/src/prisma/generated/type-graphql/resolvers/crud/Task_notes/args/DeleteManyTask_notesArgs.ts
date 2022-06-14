import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Task_notesWhereInput} from '../../../inputs/Task_notesWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyTask_notesArgs {
  @TypeGraphQL.Field((_type) => Task_notesWhereInput, {
    nullable: true,
  })
    where?: Task_notesWhereInput | undefined;
}
