import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {DeleteManyTask_notesArgs} from './args/DeleteManyTask_notesArgs';
import {Task_notes} from '../../../models/Task_notes';
import {AffectedRowsOutput} from '../../outputs/AffectedRowsOutput';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Task_notes)
export class DeleteManyTask_notesResolver {
  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyTask_notes(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyTask_notesArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).task_notes.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
