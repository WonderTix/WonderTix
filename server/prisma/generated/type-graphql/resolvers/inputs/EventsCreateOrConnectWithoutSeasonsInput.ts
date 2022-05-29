import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsCreateWithoutSeasonsInput } from "../inputs/EventsCreateWithoutSeasonsInput";
import { EventsWhereUniqueInput } from "../inputs/EventsWhereUniqueInput";

@TypeGraphQL.InputType("EventsCreateOrConnectWithoutSeasonsInput", {
  isAbstract: true
})
export class EventsCreateOrConnectWithoutSeasonsInput {
  @TypeGraphQL.Field(_type => EventsWhereUniqueInput, {
    nullable: false
  })
  where!: EventsWhereUniqueInput;

  @TypeGraphQL.Field(_type => EventsCreateWithoutSeasonsInput, {
    nullable: false
  })
  create!: EventsCreateWithoutSeasonsInput;
}
