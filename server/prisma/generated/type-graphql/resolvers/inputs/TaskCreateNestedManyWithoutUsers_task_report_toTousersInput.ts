import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateManyUsers_task_report_toTousersInputEnvelope } from "../inputs/TaskCreateManyUsers_task_report_toTousersInputEnvelope";
import { TaskCreateOrConnectWithoutUsers_task_report_toTousersInput } from "../inputs/TaskCreateOrConnectWithoutUsers_task_report_toTousersInput";
import { TaskCreateWithoutUsers_task_report_toTousersInput } from "../inputs/TaskCreateWithoutUsers_task_report_toTousersInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskCreateNestedManyWithoutUsers_task_report_toTousersInput", {
  isAbstract: true
})
export class TaskCreateNestedManyWithoutUsers_task_report_toTousersInput {
  @TypeGraphQL.Field(_type => [TaskCreateWithoutUsers_task_report_toTousersInput], {
    nullable: true
  })
  create?: TaskCreateWithoutUsers_task_report_toTousersInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskCreateOrConnectWithoutUsers_task_report_toTousersInput], {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutUsers_task_report_toTousersInput[] | undefined;

  @TypeGraphQL.Field(_type => TaskCreateManyUsers_task_report_toTousersInputEnvelope, {
    nullable: true
  })
  createMany?: TaskCreateManyUsers_task_report_toTousersInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TaskWhereUniqueInput], {
    nullable: true
  })
  connect?: TaskWhereUniqueInput[] | undefined;
}
