import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntNullableWithAggregatesFilter } from "../inputs/IntNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";

@TypeGraphQL.InputType("LinkedticketsScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class LinkedticketsScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [LinkedticketsScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: LinkedticketsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: LinkedticketsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: LinkedticketsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableWithAggregatesFilter, {
    nullable: true
  })
  event_instance_id?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableWithAggregatesFilter, {
    nullable: true
  })
  ticket_type?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  dummy?: StringNullableWithAggregatesFilter | undefined;
}
