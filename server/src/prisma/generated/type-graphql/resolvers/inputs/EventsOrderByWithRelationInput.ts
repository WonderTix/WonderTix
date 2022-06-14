import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesOrderByRelationAggregateInput} from '../inputs/Event_instancesOrderByRelationAggregateInput';
import {SeasonsOrderByWithRelationInput} from '../inputs/SeasonsOrderByWithRelationInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('EventsOrderByWithRelationInput', {
  isAbstract: true,
})
export class EventsOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    seasonid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    eventname?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    eventdescription?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    active?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    image_url?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SeasonsOrderByWithRelationInput, {
    nullable: true,
  })
    seasons?: SeasonsOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesOrderByRelationAggregateInput, {
    nullable: true,
  })
    event_instances?: Event_instancesOrderByRelationAggregateInput | undefined;
}
