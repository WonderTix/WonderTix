import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../scalars';
import {Event_instances} from '../models/Event_instances';
import {Seasons} from '../models/Seasons';
import {EventsCount} from '../resolvers/outputs/EventsCount';

@TypeGraphQL.ObjectType('Events', {
  isAbstract: true,
})
export class Events {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    seasonid?: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
    eventname!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    eventdescription?: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    active?: boolean | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    image_url?: string | null;

  seasons?: Seasons | null;

  event_instances?: Event_instances[];

  @TypeGraphQL.Field((_type) => EventsCount, {
    nullable: true,
  })
    _count?: EventsCount | null;
}
