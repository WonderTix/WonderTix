import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskUpdateWithoutUsers_task_assign_toTousersInput } from "../inputs/TaskUpdateWithoutUsers_task_assign_toTousersInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpdateWithWhereUniqueWithoutUsers_task_assign_toTousersInput", {
  isAbstract: true
})
export class TaskUpdateWithWhereUniqueWithoutUsers_task_assign_toTousersInput {
  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: false
  })
  where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field(_type => TaskUpdateWithoutUsers_task_assign_toTousersInput, {
    nullable: false
  })
  data!: TaskUpdateWithoutUsers_task_assign_toTousersInput;
}
