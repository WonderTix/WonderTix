import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesCreateWithoutTicketsInput } from "../inputs/Event_instancesCreateWithoutTicketsInput";
import { Event_instancesWhereUniqueInput } from "../inputs/Event_instancesWhereUniqueInput";

@TypeGraphQL.InputType("Event_instancesCreateOrConnectWithoutTicketsInput", {
  isAbstract: true
})
export class Event_instancesCreateOrConnectWithoutTicketsInput {
  @TypeGraphQL.Field(_type => Event_instancesWhereUniqueInput, {
    nullable: false
  })
  where!: Event_instancesWhereUniqueInput;

  @TypeGraphQL.Field(_type => Event_instancesCreateWithoutTicketsInput, {
    nullable: false
  })
  create!: Event_instancesCreateWithoutTicketsInput;
}
