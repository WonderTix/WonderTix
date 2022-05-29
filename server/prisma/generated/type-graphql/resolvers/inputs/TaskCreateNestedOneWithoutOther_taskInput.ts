import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateOrConnectWithoutOther_taskInput } from "../inputs/TaskCreateOrConnectWithoutOther_taskInput";
import { TaskCreateWithoutOther_taskInput } from "../inputs/TaskCreateWithoutOther_taskInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskCreateNestedOneWithoutOther_taskInput", {
  isAbstract: true
})
export class TaskCreateNestedOneWithoutOther_taskInput {
  @TypeGraphQL.Field(_type => TaskCreateWithoutOther_taskInput, {
    nullable: true
  })
  create?: TaskCreateWithoutOther_taskInput | undefined;

  @TypeGraphQL.Field(_type => TaskCreateOrConnectWithoutOther_taskInput, {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutOther_taskInput | undefined;

  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: true
  })
  connect?: TaskWhereUniqueInput | undefined;
}
