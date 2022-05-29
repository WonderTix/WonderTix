import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateEvent_instancesArgs } from "./args/AggregateEvent_instancesArgs";
import { Event_instances } from "../../../models/Event_instances";
import { AggregateEvent_instances } from "../../outputs/AggregateEvent_instances";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Event_instances)
export class AggregateEvent_instancesResolver {
  @TypeGraphQL.Query(_returns => AggregateEvent_instances, {
    nullable: false
  })
  async aggregateEvent_instances(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateEvent_instancesArgs): Promise<AggregateEvent_instances> {
    return getPrismaFromContext(ctx).event_instances.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
