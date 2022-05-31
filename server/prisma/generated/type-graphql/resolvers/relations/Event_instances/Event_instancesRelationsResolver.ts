import * as TypeGraphQL from "type-graphql";
import { Event_instances } from "../../../models/Event_instances";
import { Events } from "../../../models/Events";
import { Linkedtickets } from "../../../models/Linkedtickets";
import { Tickets } from "../../../models/Tickets";
import { Event_instancesLinkedticketsArgs } from "./args/Event_instancesLinkedticketsArgs";
import { Event_instancesTicketsArgs } from "./args/Event_instancesTicketsArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Event_instances)
export class Event_instancesRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Events, {
    nullable: true
  })
  async events(@TypeGraphQL.Root() event_instances: Event_instances, @TypeGraphQL.Ctx() ctx: any): Promise<Events | null> {
    return getPrismaFromContext(ctx).event_instances.findUnique({
      where: {
        id: event_instances.id,
      },
    }).events({});
  }

  @TypeGraphQL.FieldResolver(_type => [Linkedtickets], {
    nullable: false
  })
  async linkedtickets(@TypeGraphQL.Root() event_instances: Event_instances, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: Event_instancesLinkedticketsArgs): Promise<Linkedtickets[]> {
    return getPrismaFromContext(ctx).event_instances.findUnique({
      where: {
        id: event_instances.id,
      },
    }).linkedtickets(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Tickets], {
    nullable: false
  })
  async tickets(@TypeGraphQL.Root() event_instances: Event_instances, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: Event_instancesTicketsArgs): Promise<Tickets[]> {
    return getPrismaFromContext(ctx).event_instances.findUnique({
      where: {
        id: event_instances.id,
      },
    }).tickets(args);
  }
}
