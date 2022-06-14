import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {GroupBySeasonsArgs} from './args/GroupBySeasonsArgs';
import {Seasons} from '../../../models/Seasons';
import {SeasonsGroupBy} from '../../outputs/SeasonsGroupBy';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Seasons)
export class GroupBySeasonsResolver {
  @TypeGraphQL.Query((_returns) => [SeasonsGroupBy], {
    nullable: false,
  })
  async groupBySeasons(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupBySeasonsArgs): Promise<SeasonsGroupBy[]> {
    const {_count, _avg, _sum, _min, _max} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).seasons.groupBy({
      ...args,
      ...Object.fromEntries(
          Object.entries({_count, _avg, _sum, _min, _max}).filter(([_, v]) => v != null),
      ),
    });
  }
}
