import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateManyUsers_task_assign_toTousersInputEnvelope } from "../inputs/TaskCreateManyUsers_task_assign_toTousersInputEnvelope";
import { TaskCreateOrConnectWithoutUsers_task_assign_toTousersInput } from "../inputs/TaskCreateOrConnectWithoutUsers_task_assign_toTousersInput";
import { TaskCreateWithoutUsers_task_assign_toTousersInput } from "../inputs/TaskCreateWithoutUsers_task_assign_toTousersInput";
import { TaskScalarWhereInput } from "../inputs/TaskScalarWhereInput";
import { TaskUpdateManyWithWhereWithoutUsers_task_assign_toTousersInput } from "../inputs/TaskUpdateManyWithWhereWithoutUsers_task_assign_toTousersInput";
import { TaskUpdateWithWhereUniqueWithoutUsers_task_assign_toTousersInput } from "../inputs/TaskUpdateWithWhereUniqueWithoutUsers_task_assign_toTousersInput";
import { TaskUpsertWithWhereUniqueWithoutUsers_task_assign_toTousersInput } from "../inputs/TaskUpsertWithWhereUniqueWithoutUsers_task_assign_toTousersInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpdateManyWithoutUsers_task_assign_toTousersInput", {
  isAbstract: true
})
export class TaskUpdateManyWithoutUsers_task_assign_toTousersInput {
  @TypeGraphQL.Field(_type => [TaskCreateWithoutUsers_task_assign_toTousersInput], {
    nullable: true
  })
  create?: TaskCreateWithoutUsers_task_assign_toTousersInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskCreateOrConnectWithoutUsers_task_assign_toTousersInput], {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutUsers_task_assign_toTousersInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskUpsertWithWhereUniqueWithoutUsers_task_assign_toTousersInput], {
    nullable: true
  })
  upsert?: TaskUpsertWithWhereUniqueWithoutUsers_task_assign_toTousersInput[] | undefined;

  @TypeGraphQL.Field(_type => TaskCreateManyUsers_task_assign_toTousersInputEnvelope, {
    nullable: true
  })
  createMany?: TaskCreateManyUsers_task_assign_toTousersInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TaskWhereUniqueInput], {
    nullable: true
  })
  set?: TaskWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskWhereUniqueInput], {
    nullable: true
  })
  disconnect?: TaskWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskWhereUniqueInput], {
    nullable: true
  })
  delete?: TaskWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskWhereUniqueInput], {
    nullable: true
  })
  connect?: TaskWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskUpdateWithWhereUniqueWithoutUsers_task_assign_toTousersInput], {
    nullable: true
  })
  update?: TaskUpdateWithWhereUniqueWithoutUsers_task_assign_toTousersInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskUpdateManyWithWhereWithoutUsers_task_assign_toTousersInput], {
    nullable: true
  })
  updateMany?: TaskUpdateManyWithWhereWithoutUsers_task_assign_toTousersInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskScalarWhereInput], {
    nullable: true
  })
  deleteMany?: TaskScalarWhereInput[] | undefined;
}
