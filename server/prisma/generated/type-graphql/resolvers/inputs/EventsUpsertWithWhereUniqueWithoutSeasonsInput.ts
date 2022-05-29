import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsCreateWithoutSeasonsInput } from "../inputs/EventsCreateWithoutSeasonsInput";
import { EventsUpdateWithoutSeasonsInput } from "../inputs/EventsUpdateWithoutSeasonsInput";
import { EventsWhereUniqueInput } from "../inputs/EventsWhereUniqueInput";

@TypeGraphQL.InputType("EventsUpsertWithWhereUniqueWithoutSeasonsInput", {
  isAbstract: true
})
export class EventsUpsertWithWhereUniqueWithoutSeasonsInput {
  @TypeGraphQL.Field(_type => EventsWhereUniqueInput, {
    nullable: false
  })
  where!: EventsWhereUniqueInput;

  @TypeGraphQL.Field(_type => EventsUpdateWithoutSeasonsInput, {
    nullable: false
  })
  update!: EventsUpdateWithoutSeasonsInput;

  @TypeGraphQL.Field(_type => EventsCreateWithoutSeasonsInput, {
    nullable: false
  })
  create!: EventsCreateWithoutSeasonsInput;
}
