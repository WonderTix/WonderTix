import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {DeleteSeasonsArgs} from './args/DeleteSeasonsArgs';
import {Seasons} from '../../../models/Seasons';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Seasons)
export class DeleteSeasonsResolver {
  @TypeGraphQL.Mutation((_returns) => Seasons, {
    nullable: true,
  })
  async deleteSeasons(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteSeasonsArgs): Promise<Seasons | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).seasons.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
