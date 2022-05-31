import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateNestedManyWithoutUsers_task_assign_toTousersInput } from "../inputs/TaskCreateNestedManyWithoutUsers_task_assign_toTousersInput";
import { TaskCreateNestedManyWithoutUsers_task_report_toTousersInput } from "../inputs/TaskCreateNestedManyWithoutUsers_task_report_toTousersInput";

@TypeGraphQL.InputType("UsersCreateInput", {
  isAbstract: true
})
export class UsersCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  username?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  pass_hash?: string | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  is_superadmin?: boolean | undefined;

  @TypeGraphQL.Field(_type => TaskCreateNestedManyWithoutUsers_task_assign_toTousersInput, {
    nullable: true
  })
  task_task_assign_toTousers?: TaskCreateNestedManyWithoutUsers_task_assign_toTousersInput | undefined;

  @TypeGraphQL.Field(_type => TaskCreateNestedManyWithoutUsers_task_report_toTousersInput, {
    nullable: true
  })
  task_task_report_toTousers?: TaskCreateNestedManyWithoutUsers_task_report_toTousersInput | undefined;
}
