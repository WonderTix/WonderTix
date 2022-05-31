import * as TypeGraphQL from "type-graphql";
import { Event_instances } from "../../../models/Event_instances";
import { Linkedtickets } from "../../../models/Linkedtickets";
import { Tickettype } from "../../../models/Tickettype";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Linkedtickets)
export class LinkedticketsRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Event_instances, {
    nullable: true
  })
  async event_instances(@TypeGraphQL.Root() linkedtickets: Linkedtickets, @TypeGraphQL.Ctx() ctx: any): Promise<Event_instances | null> {
    return getPrismaFromContext(ctx).linkedtickets.findUnique({
      where: {
        id: linkedtickets.id,
      },
    }).event_instances({});
  }

  @TypeGraphQL.FieldResolver(_type => Tickettype, {
    nullable: true
  })
  async tickettype(@TypeGraphQL.Root() linkedtickets: Linkedtickets, @TypeGraphQL.Ctx() ctx: any): Promise<Tickettype | null> {
    return getPrismaFromContext(ctx).linkedtickets.findUnique({
      where: {
        id: linkedtickets.id,
      },
    }).tickettype({});
  }
}
