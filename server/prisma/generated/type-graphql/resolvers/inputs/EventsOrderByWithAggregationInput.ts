import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsAvgOrderByAggregateInput } from "../inputs/EventsAvgOrderByAggregateInput";
import { EventsCountOrderByAggregateInput } from "../inputs/EventsCountOrderByAggregateInput";
import { EventsMaxOrderByAggregateInput } from "../inputs/EventsMaxOrderByAggregateInput";
import { EventsMinOrderByAggregateInput } from "../inputs/EventsMinOrderByAggregateInput";
import { EventsSumOrderByAggregateInput } from "../inputs/EventsSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("EventsOrderByWithAggregationInput", {
  isAbstract: true
})
export class EventsOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  seasonid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eventname?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eventdescription?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  active?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  image_url?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => EventsCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: EventsCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EventsAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: EventsAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EventsMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: EventsMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EventsMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: EventsMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EventsSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: EventsSumOrderByAggregateInput | undefined;
}
