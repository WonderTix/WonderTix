import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesCreateWithoutTicketsInput } from "../inputs/Event_instancesCreateWithoutTicketsInput";
import { Event_instancesUpdateWithoutTicketsInput } from "../inputs/Event_instancesUpdateWithoutTicketsInput";

@TypeGraphQL.InputType("Event_instancesUpsertWithoutTicketsInput", {
  isAbstract: true
})
export class Event_instancesUpsertWithoutTicketsInput {
  @TypeGraphQL.Field(_type => Event_instancesUpdateWithoutTicketsInput, {
    nullable: false
  })
  update!: Event_instancesUpdateWithoutTicketsInput;

  @TypeGraphQL.Field(_type => Event_instancesCreateWithoutTicketsInput, {
    nullable: false
  })
  create!: Event_instancesCreateWithoutTicketsInput;
}
