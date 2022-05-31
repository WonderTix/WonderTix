import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DiscountsAvgOrderByAggregateInput } from "../inputs/DiscountsAvgOrderByAggregateInput";
import { DiscountsCountOrderByAggregateInput } from "../inputs/DiscountsCountOrderByAggregateInput";
import { DiscountsMaxOrderByAggregateInput } from "../inputs/DiscountsMaxOrderByAggregateInput";
import { DiscountsMinOrderByAggregateInput } from "../inputs/DiscountsMinOrderByAggregateInput";
import { DiscountsSumOrderByAggregateInput } from "../inputs/DiscountsSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("DiscountsOrderByWithAggregationInput", {
  isAbstract: true
})
export class DiscountsOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  code?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  amount?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  enddate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  startdate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  usagelimit?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  min_tickets?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  min_events?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => DiscountsCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: DiscountsCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DiscountsAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: DiscountsAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DiscountsMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: DiscountsMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DiscountsMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: DiscountsMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DiscountsSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: DiscountsSumOrderByAggregateInput | undefined;
}
