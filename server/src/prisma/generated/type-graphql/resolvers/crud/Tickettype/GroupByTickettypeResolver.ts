import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {GroupByTickettypeArgs} from './args/GroupByTickettypeArgs';
import {Tickettype} from '../../../models/Tickettype';
import {TickettypeGroupBy} from '../../outputs/TickettypeGroupBy';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Tickettype)
export class GroupByTickettypeResolver {
  @TypeGraphQL.Query((_returns) => [TickettypeGroupBy], {
    nullable: false,
  })
  async groupByTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByTickettypeArgs): Promise<TickettypeGroupBy[]> {
    const {_count, _avg, _sum, _min, _max} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.groupBy({
      ...args,
      ...Object.fromEntries(
          Object.entries({_count, _avg, _sum, _min, _max}).filter(([_, v]) => v != null),
      ),
    });
  }
}
