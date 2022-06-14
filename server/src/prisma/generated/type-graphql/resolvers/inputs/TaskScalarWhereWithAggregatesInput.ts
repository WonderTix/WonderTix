import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DateTimeNullableWithAggregatesFilter} from '../inputs/DateTimeNullableWithAggregatesFilter';
import {EnumstateNullableWithAggregatesFilter} from '../inputs/EnumstateNullableWithAggregatesFilter';
import {IntNullableWithAggregatesFilter} from '../inputs/IntNullableWithAggregatesFilter';
import {IntWithAggregatesFilter} from '../inputs/IntWithAggregatesFilter';
import {StringNullableWithAggregatesFilter} from '../inputs/StringNullableWithAggregatesFilter';

@TypeGraphQL.InputType('TaskScalarWhereWithAggregatesInput', {
  isAbstract: true,
})
export class TaskScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [TaskScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    AND?: TaskScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    OR?: TaskScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    NOT?: TaskScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
    id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    parent_id?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    subject?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    description?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumstateNullableWithAggregatesFilter, {
    nullable: true,
  })
    status?: EnumstateNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    assign_to?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    report_to?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
    date_created?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
    date_assigned?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
    due_date?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    rel_contact?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    rel_donation?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    rel_ticket_order?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    rel_account?: IntNullableWithAggregatesFilter | undefined;
}
