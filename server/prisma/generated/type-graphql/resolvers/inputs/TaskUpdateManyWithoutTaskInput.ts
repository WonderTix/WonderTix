import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateManyTaskInputEnvelope } from "../inputs/TaskCreateManyTaskInputEnvelope";
import { TaskCreateOrConnectWithoutTaskInput } from "../inputs/TaskCreateOrConnectWithoutTaskInput";
import { TaskCreateWithoutTaskInput } from "../inputs/TaskCreateWithoutTaskInput";
import { TaskScalarWhereInput } from "../inputs/TaskScalarWhereInput";
import { TaskUpdateManyWithWhereWithoutTaskInput } from "../inputs/TaskUpdateManyWithWhereWithoutTaskInput";
import { TaskUpdateWithWhereUniqueWithoutTaskInput } from "../inputs/TaskUpdateWithWhereUniqueWithoutTaskInput";
import { TaskUpsertWithWhereUniqueWithoutTaskInput } from "../inputs/TaskUpsertWithWhereUniqueWithoutTaskInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpdateManyWithoutTaskInput", {
  isAbstract: true
})
export class TaskUpdateManyWithoutTaskInput {
  @TypeGraphQL.Field(_type => [TaskCreateWithoutTaskInput], {
    nullable: true
  })
  create?: TaskCreateWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskCreateOrConnectWithoutTaskInput], {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskUpsertWithWhereUniqueWithoutTaskInput], {
    nullable: true
  })
  upsert?: TaskUpsertWithWhereUniqueWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => TaskCreateManyTaskInputEnvelope, {
    nullable: true
  })
  createMany?: TaskCreateManyTaskInputEnvelope | undefined;

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

  @TypeGraphQL.Field(_type => [TaskUpdateWithWhereUniqueWithoutTaskInput], {
    nullable: true
  })
  update?: TaskUpdateWithWhereUniqueWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskUpdateManyWithWhereWithoutTaskInput], {
    nullable: true
  })
  updateMany?: TaskUpdateManyWithWhereWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskScalarWhereInput], {
    nullable: true
  })
  deleteMany?: TaskScalarWhereInput[] | undefined;
}
