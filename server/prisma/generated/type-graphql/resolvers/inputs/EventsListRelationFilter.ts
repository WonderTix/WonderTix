import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsWhereInput } from "../inputs/EventsWhereInput";

@TypeGraphQL.InputType("EventsListRelationFilter", {
  isAbstract: true
})
export class EventsListRelationFilter {
  @TypeGraphQL.Field(_type => EventsWhereInput, {
    nullable: true
  })
  every?: EventsWhereInput | undefined;

  @TypeGraphQL.Field(_type => EventsWhereInput, {
    nullable: true
  })
  some?: EventsWhereInput | undefined;

  @TypeGraphQL.Field(_type => EventsWhereInput, {
    nullable: true
  })
  none?: EventsWhereInput | undefined;
}
