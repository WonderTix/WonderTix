import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpsertEvent_instancesArgs } from "./args/UpsertEvent_instancesArgs";
import { Event_instances } from "../../../models/Event_instances";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Event_instances)
export class UpsertEvent_instancesResolver {
  @TypeGraphQL.Mutation(_returns => Event_instances, {
    nullable: false
  })
  async upsertEvent_instances(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertEvent_instancesArgs): Promise<Event_instances> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).event_instances.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
