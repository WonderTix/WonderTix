import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsCreateWithoutEvent_instancesInput } from "../inputs/TicketsCreateWithoutEvent_instancesInput";
import { TicketsWhereUniqueInput } from "../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.InputType("TicketsCreateOrConnectWithoutEvent_instancesInput", {
  isAbstract: true
})
export class TicketsCreateOrConnectWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => TicketsWhereUniqueInput, {
    nullable: false
  })
  where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => TicketsCreateWithoutEvent_instancesInput, {
    nullable: false
  })
  create!: TicketsCreateWithoutEvent_instancesInput;
}
