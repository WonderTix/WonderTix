import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("Saved_reportsCreateInput", {
  isAbstract: true
})
export class Saved_reportsCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  table_name?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  query_attr?: string | undefined;
}
