import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomersUpdateOneWithoutTaskInput } from "../inputs/CustomersUpdateOneWithoutTaskInput";
import { DonationsUpdateOneWithoutTaskInput } from "../inputs/DonationsUpdateOneWithoutTaskInput";
import { NullableDateTimeFieldUpdateOperationsInput } from "../inputs/NullableDateTimeFieldUpdateOperationsInput";
import { NullableEnumstateFieldUpdateOperationsInput } from "../inputs/NullableEnumstateFieldUpdateOperationsInput";
import { NullableIntFieldUpdateOperationsInput } from "../inputs/NullableIntFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { TaskUpdateManyWithoutTaskInput } from "../inputs/TaskUpdateManyWithoutTaskInput";
import { TaskUpdateOneWithoutOther_taskInput } from "../inputs/TaskUpdateOneWithoutOther_taskInput";
import { Task_notesUpdateManyWithoutTaskInput } from "../inputs/Task_notesUpdateManyWithoutTaskInput";
import { UsersUpdateOneWithoutTask_task_assign_toTousersInput } from "../inputs/UsersUpdateOneWithoutTask_task_assign_toTousersInput";
import { UsersUpdateOneWithoutTask_task_report_toTousersInput } from "../inputs/UsersUpdateOneWithoutTask_task_report_toTousersInput";

@TypeGraphQL.InputType("TaskUpdateWithoutReservationInput", {
  isAbstract: true
})
export class TaskUpdateWithoutReservationInput {
  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  subject?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  description?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableEnumstateFieldUpdateOperationsInput, {
    nullable: true
  })
  status?: NullableEnumstateFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  date_created?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  date_assigned?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  due_date?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableIntFieldUpdateOperationsInput, {
    nullable: true
  })
  rel_account?: NullableIntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => UsersUpdateOneWithoutTask_task_assign_toTousersInput, {
    nullable: true
  })
  users_task_assign_toTousers?: UsersUpdateOneWithoutTask_task_assign_toTousersInput | undefined;

  @TypeGraphQL.Field(_type => TaskUpdateOneWithoutOther_taskInput, {
    nullable: true
  })
  task?: TaskUpdateOneWithoutOther_taskInput | undefined;

  @TypeGraphQL.Field(_type => CustomersUpdateOneWithoutTaskInput, {
    nullable: true
  })
  customers?: CustomersUpdateOneWithoutTaskInput | undefined;

  @TypeGraphQL.Field(_type => DonationsUpdateOneWithoutTaskInput, {
    nullable: true
  })
  donations?: DonationsUpdateOneWithoutTaskInput | undefined;

  @TypeGraphQL.Field(_type => UsersUpdateOneWithoutTask_task_report_toTousersInput, {
    nullable: true
  })
  users_task_report_toTousers?: UsersUpdateOneWithoutTask_task_report_toTousersInput | undefined;

  @TypeGraphQL.Field(_type => TaskUpdateManyWithoutTaskInput, {
    nullable: true
  })
  other_task?: TaskUpdateManyWithoutTaskInput | undefined;

  @TypeGraphQL.Field(_type => Task_notesUpdateManyWithoutTaskInput, {
    nullable: true
  })
  task_notes?: Task_notesUpdateManyWithoutTaskInput | undefined;
}
