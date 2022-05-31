import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsCreateNestedManyWithoutSeasonsInput } from "../inputs/EventsCreateNestedManyWithoutSeasonsInput";
import { TickettypeCreateNestedManyWithoutSeasonsInput } from "../inputs/TickettypeCreateNestedManyWithoutSeasonsInput";

@TypeGraphQL.InputType("SeasonsCreateInput", {
  isAbstract: true
})
export class SeasonsCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  startdate?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  enddate?: Date | undefined;

  @TypeGraphQL.Field(_type => EventsCreateNestedManyWithoutSeasonsInput, {
    nullable: true
  })
  events?: EventsCreateNestedManyWithoutSeasonsInput | undefined;

  @TypeGraphQL.Field(_type => TickettypeCreateNestedManyWithoutSeasonsInput, {
    nullable: true
  })
  tickettype?: TickettypeCreateNestedManyWithoutSeasonsInput | undefined;
}
