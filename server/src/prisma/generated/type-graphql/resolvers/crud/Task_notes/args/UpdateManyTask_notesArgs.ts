import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Task_notesUpdateManyMutationInput} from '../../../inputs/Task_notesUpdateManyMutationInput';
import {Task_notesWhereInput} from '../../../inputs/Task_notesWhereInput';

@TypeGraphQL.ArgsType()
export class UpdateManyTask_notesArgs {
  @TypeGraphQL.Field((_type) => Task_notesUpdateManyMutationInput, {
    nullable: false,
  })
    data!: Task_notesUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => Task_notesWhereInput, {
    nullable: true,
  })
    where?: Task_notesWhereInput | undefined;
}
