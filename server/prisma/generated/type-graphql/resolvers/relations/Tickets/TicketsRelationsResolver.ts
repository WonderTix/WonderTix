import * as TypeGraphQL from "type-graphql";
import { Customers } from "../../../models/Customers";
import { Event_instances } from "../../../models/Event_instances";
import { Tickets } from "../../../models/Tickets";
import { Tickettype } from "../../../models/Tickettype";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Tickets)
export class TicketsRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Customers, {
    nullable: true
  })
  async customers(@TypeGraphQL.Root() tickets: Tickets, @TypeGraphQL.Ctx() ctx: any): Promise<Customers | null> {
    return getPrismaFromContext(ctx).tickets.findUnique({
      where: {
        ticketno: tickets.ticketno,
      },
    }).customers({});
  }

  @TypeGraphQL.FieldResolver(_type => Event_instances, {
    nullable: true
  })
  async event_instances(@TypeGraphQL.Root() tickets: Tickets, @TypeGraphQL.Ctx() ctx: any): Promise<Event_instances | null> {
    return getPrismaFromContext(ctx).tickets.findUnique({
      where: {
        ticketno: tickets.ticketno,
      },
    }).event_instances({});
  }

  @TypeGraphQL.FieldResolver(_type => Tickettype, {
    nullable: true
  })
  async tickettype(@TypeGraphQL.Root() tickets: Tickets, @TypeGraphQL.Ctx() ctx: any): Promise<Tickettype | null> {
    return getPrismaFromContext(ctx).tickets.findUnique({
      where: {
        ticketno: tickets.ticketno,
      },
    }).tickettype({});
  }
}
