import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsCreateOrConnectWithoutEvent_instancesInput } from "../inputs/EventsCreateOrConnectWithoutEvent_instancesInput";
import { EventsCreateWithoutEvent_instancesInput } from "../inputs/EventsCreateWithoutEvent_instancesInput";
import { EventsWhereUniqueInput } from "../inputs/EventsWhereUniqueInput";

@TypeGraphQL.InputType("EventsCreateNestedOneWithoutEvent_instancesInput", {
  isAbstract: true
})
export class EventsCreateNestedOneWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => EventsCreateWithoutEvent_instancesInput, {
    nullable: true
  })
  create?: EventsCreateWithoutEvent_instancesInput | undefined;

  @TypeGraphQL.Field(_type => EventsCreateOrConnectWithoutEvent_instancesInput, {
    nullable: true
  })
  connectOrCreate?: EventsCreateOrConnectWithoutEvent_instancesInput | undefined;

  @TypeGraphQL.Field(_type => EventsWhereUniqueInput, {
    nullable: true
  })
  connect?: EventsWhereUniqueInput | undefined;
}
