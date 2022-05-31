import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomersWhereInput } from "../inputs/CustomersWhereInput";

@TypeGraphQL.InputType("CustomersRelationFilter", {
  isAbstract: true
})
export class CustomersRelationFilter {
  @TypeGraphQL.Field(_type => CustomersWhereInput, {
    nullable: true
  })
  is?: CustomersWhereInput | undefined;

  @TypeGraphQL.Field(_type => CustomersWhereInput, {
    nullable: true
  })
  isNot?: CustomersWhereInput | undefined;
}
