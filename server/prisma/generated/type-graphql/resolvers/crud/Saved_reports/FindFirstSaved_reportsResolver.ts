import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstSaved_reportsArgs } from "./args/FindFirstSaved_reportsArgs";
import { Saved_reports } from "../../../models/Saved_reports";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Saved_reports)
export class FindFirstSaved_reportsResolver {
  @TypeGraphQL.Query(_returns => Saved_reports, {
    nullable: true
  })
  async findFirstSaved_reports(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstSaved_reportsArgs): Promise<Saved_reports | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).saved_reports.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
