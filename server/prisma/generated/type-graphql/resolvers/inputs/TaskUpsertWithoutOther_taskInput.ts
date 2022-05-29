import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateWithoutOther_taskInput } from "../inputs/TaskCreateWithoutOther_taskInput";
import { TaskUpdateWithoutOther_taskInput } from "../inputs/TaskUpdateWithoutOther_taskInput";

@TypeGraphQL.InputType("TaskUpsertWithoutOther_taskInput", {
  isAbstract: true
})
export class TaskUpsertWithoutOther_taskInput {
  @TypeGraphQL.Field(_type => TaskUpdateWithoutOther_taskInput, {
    nullable: false
  })
  update!: TaskUpdateWithoutOther_taskInput;

  @TypeGraphQL.Field(_type => TaskCreateWithoutOther_taskInput, {
    nullable: false
  })
  create!: TaskCreateWithoutOther_taskInput;
}
