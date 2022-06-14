import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindUniqueSeasonsArgs} from './args/FindUniqueSeasonsArgs';
import {Seasons} from '../../../models/Seasons';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Seasons)
export class FindUniqueSeasonsResolver {
  @TypeGraphQL.Query((_returns) => Seasons, {
    nullable: true,
  })
  async findUniqueSeasons(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueSeasonsArgs): Promise<Seasons | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).seasons.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
