import * as TypeGraphQL from "type-graphql";
import { Linkedtickets } from "../../../models/Linkedtickets";
import { Seasons } from "../../../models/Seasons";
import { Tickets } from "../../../models/Tickets";
import { Tickettype } from "../../../models/Tickettype";
import { TickettypeLinkedticketsArgs } from "./args/TickettypeLinkedticketsArgs";
import { TickettypeTicketsArgs } from "./args/TickettypeTicketsArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Tickettype)
export class TickettypeRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Seasons, {
    nullable: true
  })
  async seasons(@TypeGraphQL.Root() tickettype: Tickettype, @TypeGraphQL.Ctx() ctx: any): Promise<Seasons | null> {
    return getPrismaFromContext(ctx).tickettype.findUnique({
      where: {
        id: tickettype.id,
      },
    }).seasons({});
  }

  @TypeGraphQL.FieldResolver(_type => [Linkedtickets], {
    nullable: false
  })
  async linkedtickets(@TypeGraphQL.Root() tickettype: Tickettype, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: TickettypeLinkedticketsArgs): Promise<Linkedtickets[]> {
    return getPrismaFromContext(ctx).tickettype.findUnique({
      where: {
        id: tickettype.id,
      },
    }).linkedtickets(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Tickets], {
    nullable: false
  })
  async tickets(@TypeGraphQL.Root() tickettype: Tickettype, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: TickettypeTicketsArgs): Promise<Tickets[]> {
    return getPrismaFromContext(ctx).tickettype.findUnique({
      where: {
        id: tickettype.id,
      },
    }).tickets(args);
  }
}
