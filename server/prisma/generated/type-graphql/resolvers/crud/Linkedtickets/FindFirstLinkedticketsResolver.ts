import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstLinkedticketsArgs } from "./args/FindFirstLinkedticketsArgs";
import { Linkedtickets } from "../../../models/Linkedtickets";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Linkedtickets)
export class FindFirstLinkedticketsResolver {
  @TypeGraphQL.Query(_returns => Linkedtickets, {
    nullable: true
  })
  async findFirstLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstLinkedticketsArgs): Promise<Linkedtickets | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).linkedtickets.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
