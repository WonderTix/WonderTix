import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableFilter} from '../inputs/BoolNullableFilter';
import {Event_instancesListRelationFilter} from '../inputs/Event_instancesListRelationFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {SeasonsRelationFilter} from '../inputs/SeasonsRelationFilter';
import {StringFilter} from '../inputs/StringFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('EventsWhereInput', {
  isAbstract: true,
})
export class EventsWhereInput {
  @TypeGraphQL.Field((_type) => [EventsWhereInput], {
    nullable: true,
  })
    AND?: EventsWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [EventsWhereInput], {
    nullable: true,
  })
    OR?: EventsWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [EventsWhereInput], {
    nullable: true,
  })
    NOT?: EventsWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
    id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    seasonid?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
    eventname?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    eventdescription?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableFilter, {
    nullable: true,
  })
    active?: BoolNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    image_url?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => SeasonsRelationFilter, {
    nullable: true,
  })
    seasons?: SeasonsRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesListRelationFilter, {
    nullable: true,
  })
    event_instances?: Event_instancesListRelationFilter | undefined;
}
