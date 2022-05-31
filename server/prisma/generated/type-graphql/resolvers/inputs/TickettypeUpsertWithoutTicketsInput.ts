import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateWithoutTicketsInput } from "../inputs/TickettypeCreateWithoutTicketsInput";
import { TickettypeUpdateWithoutTicketsInput } from "../inputs/TickettypeUpdateWithoutTicketsInput";

@TypeGraphQL.InputType("TickettypeUpsertWithoutTicketsInput", {
  isAbstract: true
})
export class TickettypeUpsertWithoutTicketsInput {
  @TypeGraphQL.Field(_type => TickettypeUpdateWithoutTicketsInput, {
    nullable: false
  })
  update!: TickettypeUpdateWithoutTicketsInput;

  @TypeGraphQL.Field(_type => TickettypeCreateWithoutTicketsInput, {
    nullable: false
  })
  create!: TickettypeCreateWithoutTicketsInput;
}
