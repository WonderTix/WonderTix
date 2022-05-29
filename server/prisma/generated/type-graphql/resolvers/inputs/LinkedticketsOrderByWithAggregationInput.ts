import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsAvgOrderByAggregateInput } from "../inputs/LinkedticketsAvgOrderByAggregateInput";
import { LinkedticketsCountOrderByAggregateInput } from "../inputs/LinkedticketsCountOrderByAggregateInput";
import { LinkedticketsMaxOrderByAggregateInput } from "../inputs/LinkedticketsMaxOrderByAggregateInput";
import { LinkedticketsMinOrderByAggregateInput } from "../inputs/LinkedticketsMinOrderByAggregateInput";
import { LinkedticketsSumOrderByAggregateInput } from "../inputs/LinkedticketsSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LinkedticketsOrderByWithAggregationInput", {
  isAbstract: true
})
export class LinkedticketsOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  event_instance_id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  ticket_type?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dummy?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: LinkedticketsCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: LinkedticketsAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: LinkedticketsMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: LinkedticketsMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: LinkedticketsSumOrderByAggregateInput | undefined;
}
