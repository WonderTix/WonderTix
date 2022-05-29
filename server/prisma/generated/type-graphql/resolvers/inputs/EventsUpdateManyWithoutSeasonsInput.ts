import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsCreateManySeasonsInputEnvelope } from "../inputs/EventsCreateManySeasonsInputEnvelope";
import { EventsCreateOrConnectWithoutSeasonsInput } from "../inputs/EventsCreateOrConnectWithoutSeasonsInput";
import { EventsCreateWithoutSeasonsInput } from "../inputs/EventsCreateWithoutSeasonsInput";
import { EventsScalarWhereInput } from "../inputs/EventsScalarWhereInput";
import { EventsUpdateManyWithWhereWithoutSeasonsInput } from "../inputs/EventsUpdateManyWithWhereWithoutSeasonsInput";
import { EventsUpdateWithWhereUniqueWithoutSeasonsInput } from "../inputs/EventsUpdateWithWhereUniqueWithoutSeasonsInput";
import { EventsUpsertWithWhereUniqueWithoutSeasonsInput } from "../inputs/EventsUpsertWithWhereUniqueWithoutSeasonsInput";
import { EventsWhereUniqueInput } from "../inputs/EventsWhereUniqueInput";

@TypeGraphQL.InputType("EventsUpdateManyWithoutSeasonsInput", {
  isAbstract: true
})
export class EventsUpdateManyWithoutSeasonsInput {
  @TypeGraphQL.Field(_type => [EventsCreateWithoutSeasonsInput], {
    nullable: true
  })
  create?: EventsCreateWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsCreateOrConnectWithoutSeasonsInput], {
    nullable: true
  })
  connectOrCreate?: EventsCreateOrConnectWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsUpsertWithWhereUniqueWithoutSeasonsInput], {
    nullable: true
  })
  upsert?: EventsUpsertWithWhereUniqueWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => EventsCreateManySeasonsInputEnvelope, {
    nullable: true
  })
  createMany?: EventsCreateManySeasonsInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [EventsWhereUniqueInput], {
    nullable: true
  })
  set?: EventsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsWhereUniqueInput], {
    nullable: true
  })
  disconnect?: EventsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsWhereUniqueInput], {
    nullable: true
  })
  delete?: EventsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsWhereUniqueInput], {
    nullable: true
  })
  connect?: EventsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsUpdateWithWhereUniqueWithoutSeasonsInput], {
    nullable: true
  })
  update?: EventsUpdateWithWhereUniqueWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsUpdateManyWithWhereWithoutSeasonsInput], {
    nullable: true
  })
  updateMany?: EventsUpdateManyWithWhereWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsScalarWhereInput], {
    nullable: true
  })
  deleteMany?: EventsScalarWhereInput[] | undefined;
}
