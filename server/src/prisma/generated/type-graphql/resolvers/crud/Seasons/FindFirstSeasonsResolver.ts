import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindFirstSeasonsArgs} from './args/FindFirstSeasonsArgs';
import {Seasons} from '../../../models/Seasons';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Seasons)
export class FindFirstSeasonsResolver {
  @TypeGraphQL.Query((_returns) => Seasons, {
    nullable: true,
  })
  async findFirstSeasons(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstSeasonsArgs): Promise<Seasons | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).seasons.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
