import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateTicketsArgs } from "./args/AggregateTicketsArgs";
import { Tickets } from "../../../models/Tickets";
import { AggregateTickets } from "../../outputs/AggregateTickets";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Tickets)
export class AggregateTicketsResolver {
  @TypeGraphQL.Query(_returns => AggregateTickets, {
    nullable: false
  })
  async aggregateTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTicketsArgs): Promise<AggregateTickets> {
    return getPrismaFromContext(ctx).tickets.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
