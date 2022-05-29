import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsWhereInput } from "../inputs/EventsWhereInput";

@TypeGraphQL.InputType("EventsRelationFilter", {
  isAbstract: true
})
export class EventsRelationFilter {
  @TypeGraphQL.Field(_type => EventsWhereInput, {
    nullable: true
  })
  is?: EventsWhereInput | undefined;

  @TypeGraphQL.Field(_type => EventsWhereInput, {
    nullable: true
  })
  isNot?: EventsWhereInput | undefined;
}
