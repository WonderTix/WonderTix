import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DonationsAvgOrderByAggregateInput } from "../inputs/DonationsAvgOrderByAggregateInput";
import { DonationsCountOrderByAggregateInput } from "../inputs/DonationsCountOrderByAggregateInput";
import { DonationsMaxOrderByAggregateInput } from "../inputs/DonationsMaxOrderByAggregateInput";
import { DonationsMinOrderByAggregateInput } from "../inputs/DonationsMinOrderByAggregateInput";
import { DonationsSumOrderByAggregateInput } from "../inputs/DonationsSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("DonationsOrderByWithAggregationInput", {
  isAbstract: true
})
export class DonationsOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  donorid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  isanonymous?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  amount?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dononame?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  frequency?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  comments?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  donodate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => DonationsCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: DonationsCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DonationsAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: DonationsAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DonationsMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: DonationsMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DonationsMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: DonationsMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DonationsSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: DonationsSumOrderByAggregateInput | undefined;
}
