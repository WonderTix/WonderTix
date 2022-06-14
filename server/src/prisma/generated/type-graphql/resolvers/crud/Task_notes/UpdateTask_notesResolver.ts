import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {UpdateTask_notesArgs} from './args/UpdateTask_notesArgs';
import {Task_notes} from '../../../models/Task_notes';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Task_notes)
export class UpdateTask_notesResolver {
  @TypeGraphQL.Mutation((_returns) => Task_notes, {
    nullable: true,
  })
  async updateTask_notes(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateTask_notesArgs): Promise<Task_notes | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).task_notes.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
