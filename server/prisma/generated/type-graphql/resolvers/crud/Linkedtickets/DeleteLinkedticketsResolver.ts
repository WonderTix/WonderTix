import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { DeleteLinkedticketsArgs } from "./args/DeleteLinkedticketsArgs";
import { Linkedtickets } from "../../../models/Linkedtickets";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Linkedtickets)
export class DeleteLinkedticketsResolver {
  @TypeGraphQL.Mutation(_returns => Linkedtickets, {
    nullable: true
  })
  async deleteLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteLinkedticketsArgs): Promise<Linkedtickets | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).linkedtickets.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
