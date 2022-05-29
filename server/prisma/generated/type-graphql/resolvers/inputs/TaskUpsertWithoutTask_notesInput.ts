import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateWithoutTask_notesInput } from "../inputs/TaskCreateWithoutTask_notesInput";
import { TaskUpdateWithoutTask_notesInput } from "../inputs/TaskUpdateWithoutTask_notesInput";

@TypeGraphQL.InputType("TaskUpsertWithoutTask_notesInput", {
  isAbstract: true
})
export class TaskUpsertWithoutTask_notesInput {
  @TypeGraphQL.Field(_type => TaskUpdateWithoutTask_notesInput, {
    nullable: false
  })
  update!: TaskUpdateWithoutTask_notesInput;

  @TypeGraphQL.Field(_type => TaskCreateWithoutTask_notesInput, {
    nullable: false
  })
  create!: TaskCreateWithoutTask_notesInput;
}
