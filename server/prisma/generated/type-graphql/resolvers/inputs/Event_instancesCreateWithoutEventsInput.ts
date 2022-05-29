import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateNestedManyWithoutEvent_instancesInput } from "../inputs/LinkedticketsCreateNestedManyWithoutEvent_instancesInput";
import { TicketsCreateNestedManyWithoutEvent_instancesInput } from "../inputs/TicketsCreateNestedManyWithoutEvent_instancesInput";

@TypeGraphQL.InputType("Event_instancesCreateWithoutEventsInput", {
  isAbstract: true
})
export class Event_instancesCreateWithoutEventsInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  eventdate?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  starttime?: Date | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  salestatus?: boolean | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  totalseats?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  availableseats?: number | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  purchaseuri?: string | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsCreateNestedManyWithoutEvent_instancesInput, {
    nullable: true
  })
  linkedtickets?: LinkedticketsCreateNestedManyWithoutEvent_instancesInput | undefined;

  @TypeGraphQL.Field(_type => TicketsCreateNestedManyWithoutEvent_instancesInput, {
    nullable: true
  })
  tickets?: TicketsCreateNestedManyWithoutEvent_instancesInput | undefined;
}
