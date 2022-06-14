import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateEventsArgs} from './args/AggregateEventsArgs';
import {Events} from '../../../models/Events';
import {AggregateEvents} from '../../outputs/AggregateEvents';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Events)
export class AggregateEventsResolver {
  @TypeGraphQL.Query((_returns) => AggregateEvents, {
    nullable: false,
  })
  async aggregateEvents(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateEventsArgs): Promise<AggregateEvents> {
    return getPrismaFromContext(ctx).events.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
