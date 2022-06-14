import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindFirstTask_notesArgs} from './args/FindFirstTask_notesArgs';
import {Task_notes} from '../../../models/Task_notes';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Task_notes)
export class FindFirstTask_notesResolver {
  @TypeGraphQL.Query((_returns) => Task_notes, {
    nullable: true,
  })
  async findFirstTask_notes(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstTask_notesArgs): Promise<Task_notes | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).task_notes.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
