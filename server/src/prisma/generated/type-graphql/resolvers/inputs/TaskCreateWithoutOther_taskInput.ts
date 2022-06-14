import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateNestedOneWithoutTaskInput} from '../inputs/CustomersCreateNestedOneWithoutTaskInput';
import {DonationsCreateNestedOneWithoutTaskInput} from '../inputs/DonationsCreateNestedOneWithoutTaskInput';
import {ReservationCreateNestedOneWithoutTaskInput} from '../inputs/ReservationCreateNestedOneWithoutTaskInput';
import {TaskCreateNestedOneWithoutOther_taskInput} from '../inputs/TaskCreateNestedOneWithoutOther_taskInput';
import {Task_notesCreateNestedManyWithoutTaskInput} from '../inputs/Task_notesCreateNestedManyWithoutTaskInput';
import {UsersCreateNestedOneWithoutTask_task_assign_toTousersInput} from '../inputs/UsersCreateNestedOneWithoutTask_task_assign_toTousersInput';
import {UsersCreateNestedOneWithoutTask_task_report_toTousersInput} from '../inputs/UsersCreateNestedOneWithoutTask_task_report_toTousersInput';
import {state} from '../../enums/state';

@TypeGraphQL.InputType('TaskCreateWithoutOther_taskInput', {
  isAbstract: true,
})
export class TaskCreateWithoutOther_taskInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    subject?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    description?: string | undefined;

  @TypeGraphQL.Field((_type) => state, {
    nullable: true,
  })
    status?: 'not_started' | 'in_progress' | 'completed' | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    date_created?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    date_assigned?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    due_date?: Date | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    rel_account?: number | undefined;

  @TypeGraphQL.Field((_type) => UsersCreateNestedOneWithoutTask_task_assign_toTousersInput, {
    nullable: true,
  })
    users_task_assign_toTousers?: UsersCreateNestedOneWithoutTask_task_assign_toTousersInput | undefined;

  @TypeGraphQL.Field((_type) => TaskCreateNestedOneWithoutOther_taskInput, {
    nullable: true,
  })
    task?: TaskCreateNestedOneWithoutOther_taskInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersCreateNestedOneWithoutTaskInput, {
    nullable: true,
  })
    customers?: CustomersCreateNestedOneWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => DonationsCreateNestedOneWithoutTaskInput, {
    nullable: true,
  })
    donations?: DonationsCreateNestedOneWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => ReservationCreateNestedOneWithoutTaskInput, {
    nullable: true,
  })
    reservation?: ReservationCreateNestedOneWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => UsersCreateNestedOneWithoutTask_task_report_toTousersInput, {
    nullable: true,
  })
    users_task_report_toTousers?: UsersCreateNestedOneWithoutTask_task_report_toTousersInput | undefined;

  @TypeGraphQL.Field((_type) => Task_notesCreateNestedManyWithoutTaskInput, {
    nullable: true,
  })
    task_notes?: Task_notesCreateNestedManyWithoutTaskInput | undefined;
}
