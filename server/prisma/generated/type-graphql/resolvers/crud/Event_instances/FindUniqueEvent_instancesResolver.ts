import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueEvent_instancesArgs } from "./args/FindUniqueEvent_instancesArgs";
import { Event_instances } from "../../../models/Event_instances";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Event_instances)
export class FindUniqueEvent_instancesResolver {
  @TypeGraphQL.Query(_returns => Event_instances, {
    nullable: true
  })
  async findUniqueEvent_instances(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueEvent_instancesArgs): Promise<Event_instances | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).event_instances.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
