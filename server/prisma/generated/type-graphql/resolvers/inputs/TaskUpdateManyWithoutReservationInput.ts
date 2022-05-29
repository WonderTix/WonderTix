import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateManyReservationInputEnvelope } from "../inputs/TaskCreateManyReservationInputEnvelope";
import { TaskCreateOrConnectWithoutReservationInput } from "../inputs/TaskCreateOrConnectWithoutReservationInput";
import { TaskCreateWithoutReservationInput } from "../inputs/TaskCreateWithoutReservationInput";
import { TaskScalarWhereInput } from "../inputs/TaskScalarWhereInput";
import { TaskUpdateManyWithWhereWithoutReservationInput } from "../inputs/TaskUpdateManyWithWhereWithoutReservationInput";
import { TaskUpdateWithWhereUniqueWithoutReservationInput } from "../inputs/TaskUpdateWithWhereUniqueWithoutReservationInput";
import { TaskUpsertWithWhereUniqueWithoutReservationInput } from "../inputs/TaskUpsertWithWhereUniqueWithoutReservationInput";
import { TaskWhereUniqueInput } from "../inputs/TaskWhereUniqueInput";

@TypeGraphQL.InputType("TaskUpdateManyWithoutReservationInput", {
  isAbstract: true
})
export class TaskUpdateManyWithoutReservationInput {
  @TypeGraphQL.Field(_type => [TaskCreateWithoutReservationInput], {
    nullable: true
  })
  create?: TaskCreateWithoutReservationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskCreateOrConnectWithoutReservationInput], {
    nullable: true
  })
  connectOrCreate?: TaskCreateOrConnectWithoutReservationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskUpsertWithWhereUniqueWithoutReservationInput], {
    nullable: true
  })
  upsert?: TaskUpsertWithWhereUniqueWithoutReservationInput[] | undefined;

  @TypeGraphQL.Field(_type => TaskCreateManyReservationInputEnvelope, {
    nullable: true
  })
  createMany?: TaskCreateManyReservationInputEnvelope | undefined;

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

  @TypeGraphQL.Field(_type => [TaskUpdateWithWhereUniqueWithoutReservationInput], {
    nullable: true
  })
  update?: TaskUpdateWithWhereUniqueWithoutReservationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskUpdateManyWithWhereWithoutReservationInput], {
    nullable: true
  })
  updateMany?: TaskUpdateManyWithWhereWithoutReservationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskScalarWhereInput], {
    nullable: true
  })
  deleteMany?: TaskScalarWhereInput[] | undefined;
}
