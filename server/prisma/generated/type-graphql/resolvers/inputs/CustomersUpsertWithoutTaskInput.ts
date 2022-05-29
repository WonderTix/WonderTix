import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomersCreateWithoutTaskInput } from "../inputs/CustomersCreateWithoutTaskInput";
import { CustomersUpdateWithoutTaskInput } from "../inputs/CustomersUpdateWithoutTaskInput";

@TypeGraphQL.InputType("CustomersUpsertWithoutTaskInput", {
  isAbstract: true
})
export class CustomersUpsertWithoutTaskInput {
  @TypeGraphQL.Field(_type => CustomersUpdateWithoutTaskInput, {
    nullable: false
  })
  update!: CustomersUpdateWithoutTaskInput;

  @TypeGraphQL.Field(_type => CustomersCreateWithoutTaskInput, {
    nullable: false
  })
  create!: CustomersCreateWithoutTaskInput;
}
