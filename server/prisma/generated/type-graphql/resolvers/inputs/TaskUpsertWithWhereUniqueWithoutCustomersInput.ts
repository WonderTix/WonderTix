import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateWithoutCustomersInput } from "../inputs/TaskCreateWithoutCustomersInput";
import { TaskUpdateWithoutCustomersInput } from "../inputs/TaskUpdateWithoutCustomersInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpsertWithWhereUniqueWithoutCustomersInput", {
  isAbstract: true
})
export class TaskUpsertWithWhereUniqueWithoutCustomersInput {
  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: false
  })
  where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field(_type => TaskUpdateWithoutCustomersInput, {
    nullable: false
  })
  update!: TaskUpdateWithoutCustomersInput;

  @TypeGraphQL.Field(_type => TaskCreateWithoutCustomersInput, {
    nullable: false
  })
  create!: TaskCreateWithoutCustomersInput;
}
