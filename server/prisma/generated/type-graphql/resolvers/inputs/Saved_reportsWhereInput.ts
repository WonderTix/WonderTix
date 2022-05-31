import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntFilter } from "../inputs/IntFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("Saved_reportsWhereInput", {
  isAbstract: true
})
export class Saved_reportsWhereInput {
  @TypeGraphQL.Field(_type => [Saved_reportsWhereInput], {
    nullable: true
  })
  AND?: Saved_reportsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [Saved_reportsWhereInput], {
    nullable: true
  })
  OR?: Saved_reportsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [Saved_reportsWhereInput], {
    nullable: true
  })
  NOT?: Saved_reportsWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  table_name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  query_attr?: StringNullableFilter | undefined;
}
