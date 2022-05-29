import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsUpdateWithoutCustomersInput } from "../inputs/TicketsUpdateWithoutCustomersInput";
import { TicketsWhereUniqueInput } from "../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.InputType("TicketsUpdateWithWhereUniqueWithoutCustomersInput", {
  isAbstract: true
})
export class TicketsUpdateWithWhereUniqueWithoutCustomersInput {
  @TypeGraphQL.Field(_type => TicketsWhereUniqueInput, {
    nullable: false
  })
  where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => TicketsUpdateWithoutCustomersInput, {
    nullable: false
  })
  data!: TicketsUpdateWithoutCustomersInput;
}
