import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueSaved_reportsArgs } from "./args/FindUniqueSaved_reportsArgs";
import { Saved_reports } from "../../../models/Saved_reports";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Saved_reports)
export class FindUniqueSaved_reportsResolver {
  @TypeGraphQL.Query(_returns => Saved_reports, {
    nullable: true
  })
  async findUniqueSaved_reports(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueSaved_reportsArgs): Promise<Saved_reports | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).saved_reports.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
