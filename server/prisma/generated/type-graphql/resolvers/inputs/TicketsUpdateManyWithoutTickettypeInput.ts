import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsCreateManyTickettypeInputEnvelope } from "../inputs/TicketsCreateManyTickettypeInputEnvelope";
import { TicketsCreateOrConnectWithoutTickettypeInput } from "../inputs/TicketsCreateOrConnectWithoutTickettypeInput";
import { TicketsCreateWithoutTickettypeInput } from "../inputs/TicketsCreateWithoutTickettypeInput";
import { TicketsScalarWhereInput } from "../inputs/TicketsScalarWhereInput";
import { TicketsUpdateManyWithWhereWithoutTickettypeInput } from "../inputs/TicketsUpdateManyWithWhereWithoutTickettypeInput";
import { TicketsUpdateWithWhereUniqueWithoutTickettypeInput } from "../inputs/TicketsUpdateWithWhereUniqueWithoutTickettypeInput";
import { TicketsUpsertWithWhereUniqueWithoutTickettypeInput } from "../inputs/TicketsUpsertWithWhereUniqueWithoutTickettypeInput";
import { TicketsWhereUniqueInput } from "../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.InputType("TicketsUpdateManyWithoutTickettypeInput", {
  isAbstract: true
})
export class TicketsUpdateManyWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => [TicketsCreateWithoutTickettypeInput], {
    nullable: true
  })
  create?: TicketsCreateWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsCreateOrConnectWithoutTickettypeInput], {
    nullable: true
  })
  connectOrCreate?: TicketsCreateOrConnectWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsUpsertWithWhereUniqueWithoutTickettypeInput], {
    nullable: true
  })
  upsert?: TicketsUpsertWithWhereUniqueWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => TicketsCreateManyTickettypeInputEnvelope, {
    nullable: true
  })
  createMany?: TicketsCreateManyTickettypeInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TicketsWhereUniqueInput], {
    nullable: true
  })
  set?: TicketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsWhereUniqueInput], {
    nullable: true
  })
  disconnect?: TicketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsWhereUniqueInput], {
    nullable: true
  })
  delete?: TicketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsWhereUniqueInput], {
    nullable: true
  })
  connect?: TicketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsUpdateWithWhereUniqueWithoutTickettypeInput], {
    nullable: true
  })
  update?: TicketsUpdateWithWhereUniqueWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsUpdateManyWithWhereWithoutTickettypeInput], {
    nullable: true
  })
  updateMany?: TicketsUpdateManyWithWhereWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsScalarWhereInput], {
    nullable: true
  })
  deleteMany?: TicketsScalarWhereInput[] | undefined;
}
