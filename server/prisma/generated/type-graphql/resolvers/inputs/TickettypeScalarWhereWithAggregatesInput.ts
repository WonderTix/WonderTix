import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolNullableWithAggregatesFilter } from "../inputs/BoolNullableWithAggregatesFilter";
import { DecimalNullableWithAggregatesFilter } from "../inputs/DecimalNullableWithAggregatesFilter";
import { IntNullableWithAggregatesFilter } from "../inputs/IntNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";

@TypeGraphQL.InputType("TickettypeScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class TickettypeScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [TickettypeScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: TickettypeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [TickettypeScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: TickettypeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [TickettypeScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: TickettypeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  name?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => BoolNullableWithAggregatesFilter, {
    nullable: true
  })
  isseason?: BoolNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableWithAggregatesFilter, {
    nullable: true
  })
  seasonid?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DecimalNullableWithAggregatesFilter, {
    nullable: true
  })
  price?: DecimalNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DecimalNullableWithAggregatesFilter, {
    nullable: true
  })
  concessions?: DecimalNullableWithAggregatesFilter | undefined;
}
