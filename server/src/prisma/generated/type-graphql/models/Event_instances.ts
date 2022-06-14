import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../scalars';
import {Events} from '../models/Events';
import {Linkedtickets} from '../models/Linkedtickets';
import {Tickets} from '../models/Tickets';
import {Event_instancesCount} from '../resolvers/outputs/Event_instancesCount';

@TypeGraphQL.ObjectType('Event_instances', {
  isAbstract: true,
})
export class Event_instances {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    eventid?: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    eventdate?: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    starttime?: Date | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    salestatus?: boolean | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    totalseats?: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    availableseats?: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    purchaseuri?: string | null;

  events?: Events | null;

  linkedtickets?: Linkedtickets[];

  tickets?: Tickets[];

  @TypeGraphQL.Field((_type) => Event_instancesCount, {
    nullable: true,
  })
    _count?: Event_instancesCount | null;
}
