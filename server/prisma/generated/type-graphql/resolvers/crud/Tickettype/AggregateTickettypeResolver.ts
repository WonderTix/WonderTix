import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateTickettypeArgs } from "./args/AggregateTickettypeArgs";
import { Tickettype } from "../../../models/Tickettype";
import { AggregateTickettype } from "../../outputs/AggregateTickettype";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Tickettype)
export class AggregateTickettypeResolver {
  @TypeGraphQL.Query(_returns => AggregateTickettype, {
    nullable: false
  })
  async aggregateTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTickettypeArgs): Promise<AggregateTickettype> {
    return getPrismaFromContext(ctx).tickettype.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
