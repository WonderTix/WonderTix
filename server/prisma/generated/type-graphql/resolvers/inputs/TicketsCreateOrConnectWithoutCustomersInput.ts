import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsCreateWithoutCustomersInput } from "../inputs/TicketsCreateWithoutCustomersInput";
import { TicketsWhereUniqueInput } from "../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.InputType("TicketsCreateOrConnectWithoutCustomersInput", {
  isAbstract: true
})
export class TicketsCreateOrConnectWithoutCustomersInput {
  @TypeGraphQL.Field(_type => TicketsWhereUniqueInput, {
    nullable: false
  })
  where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => TicketsCreateWithoutCustomersInput, {
    nullable: false
  })
  create!: TicketsCreateWithoutCustomersInput;
}
