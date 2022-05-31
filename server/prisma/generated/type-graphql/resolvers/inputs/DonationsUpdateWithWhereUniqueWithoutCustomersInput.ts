import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DonationsUpdateWithoutCustomersInput } from "../inputs/DonationsUpdateWithoutCustomersInput";
import { DonationsWhereUniqueInput } from "../inputs/DonationsWhereUniqueInput";

@TypeGraphQL.InputType("DonationsUpdateWithWhereUniqueWithoutCustomersInput", {
  isAbstract: true
})
export class DonationsUpdateWithWhereUniqueWithoutCustomersInput {
  @TypeGraphQL.Field(_type => DonationsWhereUniqueInput, {
    nullable: false
  })
  where!: DonationsWhereUniqueInput;

  @TypeGraphQL.Field(_type => DonationsUpdateWithoutCustomersInput, {
    nullable: false
  })
  data!: DonationsUpdateWithoutCustomersInput;
}
