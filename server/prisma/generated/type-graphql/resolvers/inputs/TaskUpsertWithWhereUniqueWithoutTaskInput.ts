import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateWithoutTaskInput } from "../inputs/TaskCreateWithoutTaskInput";
import { TaskUpdateWithoutTaskInput } from "../inputs/TaskUpdateWithoutTaskInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpsertWithWhereUniqueWithoutTaskInput", {
  isAbstract: true
})
export class TaskUpsertWithWhereUniqueWithoutTaskInput {
  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: false
  })
  where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field(_type => TaskUpdateWithoutTaskInput, {
    nullable: false
  })
  update!: TaskUpdateWithoutTaskInput;

  @TypeGraphQL.Field(_type => TaskCreateWithoutTaskInput, {
    nullable: false
  })
  create!: TaskCreateWithoutTaskInput;
}
