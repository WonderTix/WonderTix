import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {GroupByEvent_instancesArgs} from './args/GroupByEvent_instancesArgs';
import {Event_instances} from '../../../models/Event_instances';
import {Event_instancesGroupBy} from '../../outputs/Event_instancesGroupBy';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Event_instances)
export class GroupByEvent_instancesResolver {
  @TypeGraphQL.Query((_returns) => [Event_instancesGroupBy], {
    nullable: false,
  })
  async groupByEvent_instances(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByEvent_instancesArgs): Promise<Event_instancesGroupBy[]> {
    const {_count, _avg, _sum, _min, _max} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).event_instances.groupBy({
      ...args,
      ...Object.fromEntries(
          Object.entries({_count, _avg, _sum, _min, _max}).filter(([_, v]) => v != null),
      ),
    });
  }
}
