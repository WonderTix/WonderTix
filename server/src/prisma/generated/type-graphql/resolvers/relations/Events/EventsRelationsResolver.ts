import * as TypeGraphQL from 'type-graphql';
import {Event_instances} from '../../../models/Event_instances';
import {Events} from '../../../models/Events';
import {Seasons} from '../../../models/Seasons';
import {EventsEvent_instancesArgs} from './args/EventsEvent_instancesArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Events)
export class EventsRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Seasons, {
    nullable: true,
  })
  async seasons(@TypeGraphQL.Root() events: Events, @TypeGraphQL.Ctx() ctx: any): Promise<Seasons | null> {
    return getPrismaFromContext(ctx).events.findUnique({
      where: {
        id: events.id,
      },
    }).seasons({});
  }

  @TypeGraphQL.FieldResolver((_type) => [Event_instances], {
    nullable: false,
  })
  async event_instances(@TypeGraphQL.Root() events: Events, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: EventsEvent_instancesArgs): Promise<Event_instances[]> {
    return getPrismaFromContext(ctx).events.findUnique({
      where: {
        id: events.id,
      },
    }).event_instances(args);
  }
}
