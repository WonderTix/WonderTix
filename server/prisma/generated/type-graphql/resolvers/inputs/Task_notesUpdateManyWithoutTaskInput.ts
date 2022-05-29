import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Task_notesCreateManyTaskInputEnvelope } from "../inputs/Task_notesCreateManyTaskInputEnvelope";
import { Task_notesCreateOrConnectWithoutTaskInput } from "../inputs/Task_notesCreateOrConnectWithoutTaskInput";
import { Task_notesCreateWithoutTaskInput } from "../inputs/Task_notesCreateWithoutTaskInput";
import { Task_notesScalarWhereInput } from "../inputs/Task_notesScalarWhereInput";
import { Task_notesUpdateManyWithWhereWithoutTaskInput } from "../inputs/Task_notesUpdateManyWithWhereWithoutTaskInput";
import { Task_notesUpdateWithWhereUniqueWithoutTaskInput } from "../inputs/Task_notesUpdateWithWhereUniqueWithoutTaskInput";
import { Task_notesUpsertWithWhereUniqueWithoutTaskInput } from "../inputs/Task_notesUpsertWithWhereUniqueWithoutTaskInput";
import { Task_notesWhereUniqueInput } from "../inputs/Task_notesWhereUniqueInput";

@TypeGraphQL.InputType("Task_notesUpdateManyWithoutTaskInput", {
  isAbstract: true
})
export class Task_notesUpdateManyWithoutTaskInput {
  @TypeGraphQL.Field(_type => [Task_notesCreateWithoutTaskInput], {
    nullable: true
  })
  create?: Task_notesCreateWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesCreateOrConnectWithoutTaskInput], {
    nullable: true
  })
  connectOrCreate?: Task_notesCreateOrConnectWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesUpsertWithWhereUniqueWithoutTaskInput], {
    nullable: true
  })
  upsert?: Task_notesUpsertWithWhereUniqueWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => Task_notesCreateManyTaskInputEnvelope, {
    nullable: true
  })
  createMany?: Task_notesCreateManyTaskInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [Task_notesWhereUniqueInput], {
    nullable: true
  })
  set?: Task_notesWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesWhereUniqueInput], {
    nullable: true
  })
  disconnect?: Task_notesWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesWhereUniqueInput], {
    nullable: true
  })
  delete?: Task_notesWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesWhereUniqueInput], {
    nullable: true
  })
  connect?: Task_notesWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesUpdateWithWhereUniqueWithoutTaskInput], {
    nullable: true
  })
  update?: Task_notesUpdateWithWhereUniqueWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesUpdateManyWithWhereWithoutTaskInput], {
    nullable: true
  })
  updateMany?: Task_notesUpdateManyWithWhereWithoutTaskInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesScalarWhereInput], {
    nullable: true
  })
  deleteMany?: Task_notesScalarWhereInput[] | undefined;
}
