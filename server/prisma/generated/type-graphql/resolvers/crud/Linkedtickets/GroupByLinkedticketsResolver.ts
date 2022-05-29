import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { GroupByLinkedticketsArgs } from "./args/GroupByLinkedticketsArgs";
import { Linkedtickets } from "../../../models/Linkedtickets";
import { LinkedticketsGroupBy } from "../../outputs/LinkedticketsGroupBy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Linkedtickets)
export class GroupByLinkedticketsResolver {
  @TypeGraphQL.Query(_returns => [LinkedticketsGroupBy], {
    nullable: false
  })
  async groupByLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByLinkedticketsArgs): Promise<LinkedticketsGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).linkedtickets.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
