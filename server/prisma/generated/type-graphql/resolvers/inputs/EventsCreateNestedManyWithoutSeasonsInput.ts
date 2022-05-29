import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsCreateManySeasonsInputEnvelope } from "../inputs/EventsCreateManySeasonsInputEnvelope";
import { EventsCreateOrConnectWithoutSeasonsInput } from "../inputs/EventsCreateOrConnectWithoutSeasonsInput";
import { EventsCreateWithoutSeasonsInput } from "../inputs/EventsCreateWithoutSeasonsInput";
import { EventsWhereUniqueInput } from "../inputs/EventsWhereUniqueInput";

@TypeGraphQL.InputType("EventsCreateNestedManyWithoutSeasonsInput", {
  isAbstract: true
})
export class EventsCreateNestedManyWithoutSeasonsInput {
  @TypeGraphQL.Field(_type => [EventsCreateWithoutSeasonsInput], {
    nullable: true
  })
  create?: EventsCreateWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsCreateOrConnectWithoutSeasonsInput], {
    nullable: true
  })
  connectOrCreate?: EventsCreateOrConnectWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field(_type => EventsCreateManySeasonsInputEnvelope, {
    nullable: true
  })
  createMany?: EventsCreateManySeasonsInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [EventsWhereUniqueInput], {
    nullable: true
  })
  connect?: EventsWhereUniqueInput[] | undefined;
}
