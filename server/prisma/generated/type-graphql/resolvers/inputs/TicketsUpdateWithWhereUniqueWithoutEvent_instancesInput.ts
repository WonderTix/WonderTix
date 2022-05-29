import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsUpdateWithoutEvent_instancesInput } from "../inputs/TicketsUpdateWithoutEvent_instancesInput";
import { TicketsWhereUniqueInput } from "../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.InputType("TicketsUpdateWithWhereUniqueWithoutEvent_instancesInput", {
  isAbstract: true
})
export class TicketsUpdateWithWhereUniqueWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => TicketsWhereUniqueInput, {
    nullable: false
  })
  where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => TicketsUpdateWithoutEvent_instancesInput, {
    nullable: false
  })
  data!: TicketsUpdateWithoutEvent_instancesInput;
}
