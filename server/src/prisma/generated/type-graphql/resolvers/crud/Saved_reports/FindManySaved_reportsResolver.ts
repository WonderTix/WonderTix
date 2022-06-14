import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindManySaved_reportsArgs} from './args/FindManySaved_reportsArgs';
import {Saved_reports} from '../../../models/Saved_reports';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Saved_reports)
export class FindManySaved_reportsResolver {
  @TypeGraphQL.Query((_returns) => [Saved_reports], {
    nullable: false,
  })
  async findManySaved_reports(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManySaved_reportsArgs): Promise<Saved_reports[]> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).saved_reports.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
