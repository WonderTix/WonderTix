import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SeasonsAvgOrderByAggregateInput } from "../inputs/SeasonsAvgOrderByAggregateInput";
import { SeasonsCountOrderByAggregateInput } from "../inputs/SeasonsCountOrderByAggregateInput";
import { SeasonsMaxOrderByAggregateInput } from "../inputs/SeasonsMaxOrderByAggregateInput";
import { SeasonsMinOrderByAggregateInput } from "../inputs/SeasonsMinOrderByAggregateInput";
import { SeasonsSumOrderByAggregateInput } from "../inputs/SeasonsSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("SeasonsOrderByWithAggregationInput", {
  isAbstract: true
})
export class SeasonsOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  startdate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  enddate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SeasonsCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: SeasonsCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: SeasonsAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: SeasonsMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: SeasonsMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: SeasonsSumOrderByAggregateInput | undefined;
}
