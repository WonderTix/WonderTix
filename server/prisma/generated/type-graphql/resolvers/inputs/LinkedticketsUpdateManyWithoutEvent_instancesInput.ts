import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateManyEvent_instancesInputEnvelope } from "../inputs/LinkedticketsCreateManyEvent_instancesInputEnvelope";
import { LinkedticketsCreateOrConnectWithoutEvent_instancesInput } from "../inputs/LinkedticketsCreateOrConnectWithoutEvent_instancesInput";
import { LinkedticketsCreateWithoutEvent_instancesInput } from "../inputs/LinkedticketsCreateWithoutEvent_instancesInput";
import { LinkedticketsScalarWhereInput } from "../inputs/LinkedticketsScalarWhereInput";
import { LinkedticketsUpdateManyWithWhereWithoutEvent_instancesInput } from "../inputs/LinkedticketsUpdateManyWithWhereWithoutEvent_instancesInput";
import { LinkedticketsUpdateWithWhereUniqueWithoutEvent_instancesInput } from "../inputs/LinkedticketsUpdateWithWhereUniqueWithoutEvent_instancesInput";
import { LinkedticketsUpsertWithWhereUniqueWithoutEvent_instancesInput } from "../inputs/LinkedticketsUpsertWithWhereUniqueWithoutEvent_instancesInput";
import { LinkedticketsWhereUniqueInput } from "../inputs/LinkedticketsWhereUniqueInput";

@TypeGraphQL.InputType("LinkedticketsUpdateManyWithoutEvent_instancesInput", {
  isAbstract: true
})
export class LinkedticketsUpdateManyWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => [LinkedticketsCreateWithoutEvent_instancesInput], {
    nullable: true
  })
  create?: LinkedticketsCreateWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsCreateOrConnectWithoutEvent_instancesInput], {
    nullable: true
  })
  connectOrCreate?: LinkedticketsCreateOrConnectWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsUpsertWithWhereUniqueWithoutEvent_instancesInput], {
    nullable: true
  })
  upsert?: LinkedticketsUpsertWithWhereUniqueWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsCreateManyEvent_instancesInputEnvelope, {
    nullable: true
  })
  createMany?: LinkedticketsCreateManyEvent_instancesInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsWhereUniqueInput], {
    nullable: true
  })
  set?: LinkedticketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsWhereUniqueInput], {
    nullable: true
  })
  disconnect?: LinkedticketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsWhereUniqueInput], {
    nullable: true
  })
  delete?: LinkedticketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsWhereUniqueInput], {
    nullable: true
  })
  connect?: LinkedticketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsUpdateWithWhereUniqueWithoutEvent_instancesInput], {
    nullable: true
  })
  update?: LinkedticketsUpdateWithWhereUniqueWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsUpdateManyWithWhereWithoutEvent_instancesInput], {
    nullable: true
  })
  updateMany?: LinkedticketsUpdateManyWithWhereWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsScalarWhereInput], {
    nullable: true
  })
  deleteMany?: LinkedticketsScalarWhereInput[] | undefined;
}
