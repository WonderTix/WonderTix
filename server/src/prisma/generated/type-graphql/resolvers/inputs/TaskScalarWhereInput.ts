import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DateTimeNullableFilter} from '../inputs/DateTimeNullableFilter';
import {EnumstateNullableFilter} from '../inputs/EnumstateNullableFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';

@TypeGraphQL.InputType('TaskScalarWhereInput', {
  isAbstract: true,
})
export class TaskScalarWhereInput {
  @TypeGraphQL.Field((_type) => [TaskScalarWhereInput], {
    nullable: true,
  })
    AND?: TaskScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskScalarWhereInput], {
    nullable: true,
  })
    OR?: TaskScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskScalarWhereInput], {
    nullable: true,
  })
    NOT?: TaskScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
    id?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    parent_id?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    subject?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
    description?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumstateNullableFilter, {
    nullable: true,
  })
    status?: EnumstateNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    assign_to?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    report_to?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    date_created?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    date_assigned?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
    due_date?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    rel_contact?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    rel_donation?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    rel_ticket_order?: IntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableFilter, {
    nullable: true,
  })
    rel_account?: IntNullableFilter | undefined;
}
