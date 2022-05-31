import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateTaskArgs } from "./args/AggregateTaskArgs";
import { Task } from "../../../models/Task";
import { AggregateTask } from "../../outputs/AggregateTask";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Task)
export class AggregateTaskResolver {
  @TypeGraphQL.Query(_returns => AggregateTask, {
    nullable: false
  })
  async aggregateTask(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTaskArgs): Promise<AggregateTask> {
    return getPrismaFromContext(ctx).task.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
