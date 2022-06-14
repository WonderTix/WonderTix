import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {UpsertSaved_reportsArgs} from './args/UpsertSaved_reportsArgs';
import {Saved_reports} from '../../../models/Saved_reports';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Saved_reports)
export class UpsertSaved_reportsResolver {
  @TypeGraphQL.Mutation((_returns) => Saved_reports, {
    nullable: false,
  })
  async upsertSaved_reports(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertSaved_reportsArgs): Promise<Saved_reports> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).saved_reports.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
