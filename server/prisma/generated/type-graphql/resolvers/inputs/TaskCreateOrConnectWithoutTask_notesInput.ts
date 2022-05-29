import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateWithoutTask_notesInput } from "../inputs/TaskCreateWithoutTask_notesInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskCreateOrConnectWithoutTask_notesInput", {
  isAbstract: true
})
export class TaskCreateOrConnectWithoutTask_notesInput {
  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: false
  })
  where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field(_type => TaskCreateWithoutTask_notesInput, {
    nullable: false
  })
  create!: TaskCreateWithoutTask_notesInput;
}
