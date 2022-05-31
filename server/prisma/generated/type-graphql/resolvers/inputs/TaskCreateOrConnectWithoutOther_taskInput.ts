import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateWithoutOther_taskInput } from "../inputs/TaskCreateWithoutOther_taskInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskCreateOrConnectWithoutOther_taskInput", {
  isAbstract: true
})
export class TaskCreateOrConnectWithoutOther_taskInput {
  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: false
  })
  where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field(_type => TaskCreateWithoutOther_taskInput, {
    nullable: false
  })
  create!: TaskCreateWithoutOther_taskInput;
}
