import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateOrConnectWithoutOther_taskInput } from "../inputs/TaskCreateOrConnectWithoutOther_taskInput";
import { TaskCreateWithoutOther_taskInput } from "../inputs/TaskCreateWithoutOther_taskInput";
import { TaskUpdateWithoutOther_taskInput } from "../inputs/TaskUpdateWithoutOther_taskInput";
import { TaskUpsertWithoutOther_taskInput } from "../inputs/TaskUpsertWithoutOther_taskInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpdateOneWithoutOther_taskInput", {
  isAbstract: true
})
export class TaskUpdateOneWithoutOther_taskInput {
  @TypeGraphQL.Field(_type => TaskCreateWithoutOther_taskInput, {
    nullable: true
  })
  create?: TaskCreateWithoutOther_taskInput | undefined;

  @TypeGraphQL.Field(_type => TaskCreateOrConnectWithoutOther_taskInput, {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutOther_taskInput | undefined;

  @TypeGraphQL.Field(_type => TaskUpsertWithoutOther_taskInput, {
    nullable: true
  })
  upsert?: TaskUpsertWithoutOther_taskInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => TaskWhereUniqueInput, {
    nullable: true
  })
  connect?: TaskWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TaskUpdateWithoutOther_taskInput, {
    nullable: true
  })
  update?: TaskUpdateWithoutOther_taskInput | undefined;
}
