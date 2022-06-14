import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateTask_notesArgs} from './args/AggregateTask_notesArgs';
import {Task_notes} from '../../../models/Task_notes';
import {AggregateTask_notes} from '../../outputs/AggregateTask_notes';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Task_notes)
export class AggregateTask_notesResolver {
  @TypeGraphQL.Query((_returns) => AggregateTask_notes, {
    nullable: false,
  })
  async aggregateTask_notes(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTask_notesArgs): Promise<AggregateTask_notes> {
    return getPrismaFromContext(ctx).task_notes.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
