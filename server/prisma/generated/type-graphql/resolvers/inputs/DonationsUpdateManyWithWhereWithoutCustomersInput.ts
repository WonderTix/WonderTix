import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DonationsScalarWhereInput } from "../inputs/DonationsScalarWhereInput";
import { DonationsUpdateManyMutationInput } from "../inputs/DonationsUpdateManyMutationInput";

@TypeGraphQL.InputType("DonationsUpdateManyWithWhereWithoutCustomersInput", {
  isAbstract: true
})
export class DonationsUpdateManyWithWhereWithoutCustomersInput {
  @TypeGraphQL.Field(_type => DonationsScalarWhereInput, {
    nullable: false
  })
  where!: DonationsScalarWhereInput;

  @TypeGraphQL.Field(_type => DonationsUpdateManyMutationInput, {
    nullable: false
  })
  data!: DonationsUpdateManyMutationInput;
}
