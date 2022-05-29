import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomersCreateWithoutTicketsInput } from "../inputs/CustomersCreateWithoutTicketsInput";
import { CustomersUpdateWithoutTicketsInput } from "../inputs/CustomersUpdateWithoutTicketsInput";

@TypeGraphQL.InputType("CustomersUpsertWithoutTicketsInput", {
  isAbstract: true
})
export class CustomersUpsertWithoutTicketsInput {
  @TypeGraphQL.Field(_type => CustomersUpdateWithoutTicketsInput, {
    nullable: false
  })
  update!: CustomersUpdateWithoutTicketsInput;

  @TypeGraphQL.Field(_type => CustomersCreateWithoutTicketsInput, {
    nullable: false
  })
  create!: CustomersCreateWithoutTicketsInput;
}
