import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersRelationFilter} from '../inputs/CustomersRelationFilter';
import {DateTimeNullableFilter} from '../inputs/DateTimeNullableFilter';
import {DonationsRelationFilter} from '../inputs/DonationsRelationFilter';
import {EnumstateNullableFilter} from '../inputs/EnumstateNullableFilter';
import {IntFilter} from '../inputs/IntFilter';
import {IntNullableFilter} from '../inputs/IntNullableFilter';
import {ReservationRelationFilter} from '../inputs/ReservationRelationFilter';
import {StringNullableFilter} from '../inputs/StringNullableFilter';
import {TaskListRelationFilter} from '../inputs/TaskListRelationFilter';
import {TaskRelationFilter} from '../inputs/TaskRelationFilter';
import {Task_notesListRelationFilter} from '../inputs/Task_notesListRelationFilter';
import {UsersRelationFilter} from '../inputs/UsersRelationFilter';

@TypeGraphQL.InputType('TaskWhereInput', {
  isAbstract: true,
})
export class TaskWhereInput {
  @TypeGraphQL.Field((_type) => [TaskWhereInput], {
    nullable: true,
  })
    AND?: TaskWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskWhereInput], {
    nullable: true,
  })
    OR?: TaskWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskWhereInput], {
    nullable: true,
  })
    NOT?: TaskWhereInput[] | undefined;

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

  @TypeGraphQL.Field((_type) => UsersRelationFilter, {
    nullable: true,
  })
    users_task_assign_toTousers?: UsersRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => TaskRelationFilter, {
    nullable: true,
  })
    task?: TaskRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => CustomersRelationFilter, {
    nullable: true,
  })
    customers?: CustomersRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => DonationsRelationFilter, {
    nullable: true,
  })
    donations?: DonationsRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => ReservationRelationFilter, {
    nullable: true,
  })
    reservation?: ReservationRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => UsersRelationFilter, {
    nullable: true,
  })
    users_task_report_toTousers?: UsersRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => TaskListRelationFilter, {
    nullable: true,
  })
    other_task?: TaskListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => Task_notesListRelationFilter, {
    nullable: true,
  })
    task_notes?: Task_notesListRelationFilter | undefined;
}
