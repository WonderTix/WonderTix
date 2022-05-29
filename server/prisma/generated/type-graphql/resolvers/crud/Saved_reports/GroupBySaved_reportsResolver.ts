import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { GroupBySaved_reportsArgs } from "./args/GroupBySaved_reportsArgs";
import { Saved_reports } from "../../../models/Saved_reports";
import { Saved_reportsGroupBy } from "../../outputs/Saved_reportsGroupBy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Saved_reports)
export class GroupBySaved_reportsResolver {
  @TypeGraphQL.Query(_returns => [Saved_reportsGroupBy], {
    nullable: false
  })
  async groupBySaved_reports(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupBySaved_reportsArgs): Promise<Saved_reportsGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).saved_reports.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
