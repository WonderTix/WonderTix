import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DonationsWhereInput } from "../inputs/DonationsWhereInput";

@TypeGraphQL.InputType("DonationsListRelationFilter", {
  isAbstract: true
})
export class DonationsListRelationFilter {
  @TypeGraphQL.Field(_type => DonationsWhereInput, {
    nullable: true
  })
  every?: DonationsWhereInput | undefined;

  @TypeGraphQL.Field(_type => DonationsWhereInput, {
    nullable: true
  })
  some?: DonationsWhereInput | undefined;

  @TypeGraphQL.Field(_type => DonationsWhereInput, {
    nullable: true
  })
  none?: DonationsWhereInput | undefined;
}
