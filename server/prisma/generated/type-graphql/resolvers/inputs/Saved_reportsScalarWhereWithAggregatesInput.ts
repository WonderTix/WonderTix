import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";

@TypeGraphQL.InputType("Saved_reportsScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class Saved_reportsScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [Saved_reportsScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: Saved_reportsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [Saved_reportsScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: Saved_reportsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [Saved_reportsScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: Saved_reportsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  table_name?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  query_attr?: StringNullableWithAggregatesFilter | undefined;
}
