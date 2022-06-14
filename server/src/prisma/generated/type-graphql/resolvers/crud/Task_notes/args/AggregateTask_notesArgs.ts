import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Task_notesOrderByWithRelationInput} from '../../../inputs/Task_notesOrderByWithRelationInput';
import {Task_notesWhereInput} from '../../../inputs/Task_notesWhereInput';
import {Task_notesWhereUniqueInput} from '../../../inputs/Task_notesWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateTask_notesArgs {
  @TypeGraphQL.Field((_type) => Task_notesWhereInput, {
    nullable: true,
  })
    where?: Task_notesWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [Task_notesOrderByWithRelationInput], {
    nullable: true,
  })
    orderBy?: Task_notesOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => Task_notesWhereUniqueInput, {
    nullable: true,
  })
    cursor?: Task_notesWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;
}
