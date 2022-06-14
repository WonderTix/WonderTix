import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsOrderByWithRelationInput} from '../inputs/EventsOrderByWithRelationInput';
import {LinkedticketsOrderByRelationAggregateInput} from '../inputs/LinkedticketsOrderByRelationAggregateInput';
import {TicketsOrderByRelationAggregateInput} from '../inputs/TicketsOrderByRelationAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('Event_instancesOrderByWithRelationInput', {
  isAbstract: true,
})
export class Event_instancesOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    eventid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    eventdate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    starttime?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    salestatus?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    totalseats?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    availableseats?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    purchaseuri?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => EventsOrderByWithRelationInput, {
    nullable: true,
  })
    events?: EventsOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsOrderByRelationAggregateInput, {
    nullable: true,
  })
    linkedtickets?: LinkedticketsOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TicketsOrderByRelationAggregateInput, {
    nullable: true,
  })
    tickets?: TicketsOrderByRelationAggregateInput | undefined;
}
