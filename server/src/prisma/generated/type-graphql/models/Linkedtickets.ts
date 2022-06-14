import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../scalars';
import {Event_instances} from '../models/Event_instances';
import {Tickettype} from '../models/Tickettype';

@TypeGraphQL.ObjectType('Linkedtickets', {
  isAbstract: true,
})
export class Linkedtickets {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    event_instance_id?: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    ticket_type?: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    dummy?: string | null;

  event_instances?: Event_instances | null;

  tickettype?: Tickettype | null;
}
