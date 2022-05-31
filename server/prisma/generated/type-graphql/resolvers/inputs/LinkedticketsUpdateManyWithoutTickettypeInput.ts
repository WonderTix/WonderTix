import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateManyTickettypeInputEnvelope } from "../inputs/LinkedticketsCreateManyTickettypeInputEnvelope";
import { LinkedticketsCreateOrConnectWithoutTickettypeInput } from "../inputs/LinkedticketsCreateOrConnectWithoutTickettypeInput";
import { LinkedticketsCreateWithoutTickettypeInput } from "../inputs/LinkedticketsCreateWithoutTickettypeInput";
import { LinkedticketsScalarWhereInput } from "../inputs/LinkedticketsScalarWhereInput";
import { LinkedticketsUpdateManyWithWhereWithoutTickettypeInput } from "../inputs/LinkedticketsUpdateManyWithWhereWithoutTickettypeInput";
import { LinkedticketsUpdateWithWhereUniqueWithoutTickettypeInput } from "../inputs/LinkedticketsUpdateWithWhereUniqueWithoutTickettypeInput";
import { LinkedticketsUpsertWithWhereUniqueWithoutTickettypeInput } from "../inputs/LinkedticketsUpsertWithWhereUniqueWithoutTickettypeInput";
import { LinkedticketsWhereUniqueInput } from "../inputs/LinkedticketsWhereUniqueInput";

@TypeGraphQL.InputType("LinkedticketsUpdateManyWithoutTickettypeInput", {
  isAbstract: true
})
export class LinkedticketsUpdateManyWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => [LinkedticketsCreateWithoutTickettypeInput], {
    nullable: true
  })
  create?: LinkedticketsCreateWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsCreateOrConnectWithoutTickettypeInput], {
    nullable: true
  })
  connectOrCreate?: LinkedticketsCreateOrConnectWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsUpsertWithWhereUniqueWithoutTickettypeInput], {
    nullable: true
  })
  upsert?: LinkedticketsUpsertWithWhereUniqueWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsCreateManyTickettypeInputEnvelope, {
    nullable: true
  })
  createMany?: LinkedticketsCreateManyTickettypeInputEnvelope | undefined;

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

  @TypeGraphQL.Field(_type => [LinkedticketsUpdateWithWhereUniqueWithoutTickettypeInput], {
    nullable: true
  })
  update?: LinkedticketsUpdateWithWhereUniqueWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsUpdateManyWithWhereWithoutTickettypeInput], {
    nullable: true
  })
  updateMany?: LinkedticketsUpdateManyWithWhereWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsScalarWhereInput], {
    nullable: true
  })
  deleteMany?: LinkedticketsScalarWhereInput[] | undefined;
}
