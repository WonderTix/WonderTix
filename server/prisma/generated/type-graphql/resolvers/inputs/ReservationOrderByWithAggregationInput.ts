import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReservationAvgOrderByAggregateInput } from "../inputs/ReservationAvgOrderByAggregateInput";
import { ReservationCountOrderByAggregateInput } from "../inputs/ReservationCountOrderByAggregateInput";
import { ReservationMaxOrderByAggregateInput } from "../inputs/ReservationMaxOrderByAggregateInput";
import { ReservationMinOrderByAggregateInput } from "../inputs/ReservationMinOrderByAggregateInput";
import { ReservationSumOrderByAggregateInput } from "../inputs/ReservationSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ReservationOrderByWithAggregationInput", {
  isAbstract: true
})
export class ReservationOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  transno?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  custid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eventid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eventname?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eventdate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  showtime?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  numtickets?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => ReservationCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ReservationCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReservationAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: ReservationAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReservationMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ReservationMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReservationMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ReservationMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReservationSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: ReservationSumOrderByAggregateInput | undefined;
}
