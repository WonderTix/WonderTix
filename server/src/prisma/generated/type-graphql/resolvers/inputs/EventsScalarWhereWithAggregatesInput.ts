import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableWithAggregatesFilter} from '../inputs/BoolNullableWithAggregatesFilter';
import {IntNullableWithAggregatesFilter} from '../inputs/IntNullableWithAggregatesFilter';
import {IntWithAggregatesFilter} from '../inputs/IntWithAggregatesFilter';
import {StringNullableWithAggregatesFilter} from '../inputs/StringNullableWithAggregatesFilter';
import {StringWithAggregatesFilter} from '../inputs/StringWithAggregatesFilter';

@TypeGraphQL.InputType('EventsScalarWhereWithAggregatesInput', {
  isAbstract: true,
})
export class EventsScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [EventsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    AND?: EventsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [EventsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    OR?: EventsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [EventsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    NOT?: EventsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
    id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    seasonid?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
    eventname?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    eventdescription?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableWithAggregatesFilter, {
    nullable: true,
  })
    active?: BoolNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    image_url?: StringNullableWithAggregatesFilter | undefined;
}
