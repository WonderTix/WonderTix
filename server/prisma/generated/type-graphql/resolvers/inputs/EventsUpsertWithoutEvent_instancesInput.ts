import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsCreateWithoutEvent_instancesInput } from "../inputs/EventsCreateWithoutEvent_instancesInput";
import { EventsUpdateWithoutEvent_instancesInput } from "../inputs/EventsUpdateWithoutEvent_instancesInput";

@TypeGraphQL.InputType("EventsUpsertWithoutEvent_instancesInput", {
  isAbstract: true
})
export class EventsUpsertWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => EventsUpdateWithoutEvent_instancesInput, {
    nullable: false
  })
  update!: EventsUpdateWithoutEvent_instancesInput;

  @TypeGraphQL.Field(_type => EventsCreateWithoutEvent_instancesInput, {
    nullable: false
  })
  create!: EventsCreateWithoutEvent_instancesInput;
}
