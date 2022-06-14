import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableFilter} from '../inputs/BoolNullableFilter';
import {DateTimeNullableFilter} from '../inputs/DateTimeNullableFilter';
import {EventsRelationFilter} from '../inputs/EventsRelationFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {LinkedticketsListRelationFilter} from '../inputs/LinkedticketsListRelationFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';
import {TicketsListRelationFilter} from '../inputs/TicketsListRelationFilter';

@TypeGraphQL.InputType('Event_instancesWhereInput', {
  isAbstract: true,
})
export class Event_instancesWhereInput {
  @TypeGraphQL.Field((_type) => [Event_instancesWhereInput], {
    nullable: true,
  })
    AND?: Event_instancesWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesWhereInput], {
    nullable: true,
  })
    OR?: Event_instancesWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesWhereInput], {
    nullable: true,
  })
    NOT?: Event_instancesWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
    id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    eventid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    eventdate?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    starttime?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableFilter, {
    nullable: true,
  })
    salestatus?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    totalseats?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    availableseats?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    purchaseuri?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EventsRelationFilter, {
    nullable: true,
  })
    events?: EventsRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsListRelationFilter, {
    nullable: true,
  })
    linkedtickets?: LinkedticketsListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => TicketsListRelationFilter, {
    nullable: true,
  })
    tickets?: TicketsListRelationFilter | undefined;
}
