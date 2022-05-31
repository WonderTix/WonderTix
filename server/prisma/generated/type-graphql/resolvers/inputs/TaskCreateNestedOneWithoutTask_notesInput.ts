import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateOrConnectWithoutTask_notesInput } from "../inputs/TaskCreateOrConnectWithoutTask_notesInput";
import { TaskCreateWithoutTask_notesInput } from "../inputs/TaskCreateWithoutTask_notesInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskCreateNestedOneWithoutTask_notesInput", {
  isAbstract: true
})
export class TaskCreateNestedOneWithoutTask_notesInput {
  @TypeGraphQL.Field(_type => TaskCreateWithoutTask_notesInput, {
    nullable: true
  })
  create?: TaskCreateWithoutTask_notesInput | undefined;

  @TypeGraphQL.Field(_type => TaskCreateOrConnectWithoutTask_notesInput, {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutTask_notesInput | undefined;

  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: true
  })
  connect?: TaskWhereUniqueInput | undefined;
}
