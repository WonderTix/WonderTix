import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {CreateTask_notesArgs} from './args/CreateTask_notesArgs';
import {Task_notes} from '../../../models/Task_notes';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Task_notes)
export class CreateTask_notesResolver {
  @TypeGraphQL.Mutation((_returns) => Task_notes, {
    nullable: false,
  })
  async createTask_notes(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateTask_notesArgs): Promise<Task_notes> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).task_notes.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
