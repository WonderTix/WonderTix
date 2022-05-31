import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpdateEvent_instancesArgs } from "./args/UpdateEvent_instancesArgs";
import { Event_instances } from "../../../models/Event_instances";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Event_instances)
export class UpdateEvent_instancesResolver {
  @TypeGraphQL.Mutation(_returns => Event_instances, {
    nullable: true
  })
  async updateEvent_instances(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateEvent_instancesArgs): Promise<Event_instances | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).event_instances.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
