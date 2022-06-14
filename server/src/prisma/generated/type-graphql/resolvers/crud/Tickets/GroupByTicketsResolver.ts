import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {GroupByTicketsArgs} from './args/GroupByTicketsArgs';
import {Tickets} from '../../../models/Tickets';
import {TicketsGroupBy} from '../../outputs/TicketsGroupBy';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Tickets)
export class GroupByTicketsResolver {
  @TypeGraphQL.Query((_returns) => [TicketsGroupBy], {
    nullable: false,
  })
  async groupByTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByTicketsArgs): Promise<TicketsGroupBy[]> {
    const {_count, _avg, _sum, _min, _max} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.groupBy({
      ...args,
      ...Object.fromEntries(
          Object.entries({_count, _avg, _sum, _min, _max}).filter(([_, v]) => v != null),
      ),
    });
  }
}
