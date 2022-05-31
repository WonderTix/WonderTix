import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesWhereInput } from "../inputs/Event_instancesWhereInput";

@TypeGraphQL.InputType("Event_instancesRelationFilter", {
  isAbstract: true
})
export class Event_instancesRelationFilter {
  @TypeGraphQL.Field(_type => Event_instancesWhereInput, {
    nullable: true
  })
  is?: Event_instancesWhereInput | undefined;

  @TypeGraphQL.Field(_type => Event_instancesWhereInput, {
    nullable: true
  })
  isNot?: Event_instancesWhereInput | undefined;
}
