import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UsersCreateOrConnectWithoutTask_task_report_toTousersInput } from "../inputs/UsersCreateOrConnectWithoutTask_task_report_toTousersInput";
import { UsersCreateWithoutTask_task_report_toTousersInput } from "../inputs/UsersCreateWithoutTask_task_report_toTousersInput";
import { UsersWhereUniqueInput } from "../inputs/UsersWhereUniqueInput";

@TypeGraphQL.InputType("UsersCreateNestedOneWithoutTask_task_report_toTousersInput", {
  isAbstract: true
})
export class UsersCreateNestedOneWithoutTask_task_report_toTousersInput {
  @TypeGraphQL.Field(_type => UsersCreateWithoutTask_task_report_toTousersInput, {
    nullable: true
  })
  create?: UsersCreateWithoutTask_task_report_toTousersInput | undefined;

  @TypeGraphQL.Field(_type => UsersCreateOrConnectWithoutTask_task_report_toTousersInput, {
    nullable: true
  })
  connectOrCreate?: UsersCreateOrConnectWithoutTask_task_report_toTousersInput | undefined;

  @TypeGraphQL.Field(_type => UsersWhereUniqueInput, {
    nullable: true
  })
  connect?: UsersWhereUniqueInput | undefined;
}
