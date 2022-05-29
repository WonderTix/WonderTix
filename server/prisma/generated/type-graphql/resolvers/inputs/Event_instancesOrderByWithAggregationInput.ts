import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesAvgOrderByAggregateInput } from "../inputs/Event_instancesAvgOrderByAggregateInput";
import { Event_instancesCountOrderByAggregateInput } from "../inputs/Event_instancesCountOrderByAggregateInput";
import { Event_instancesMaxOrderByAggregateInput } from "../inputs/Event_instancesMaxOrderByAggregateInput";
import { Event_instancesMinOrderByAggregateInput } from "../inputs/Event_instancesMinOrderByAggregateInput";
import { Event_instancesSumOrderByAggregateInput } from "../inputs/Event_instancesSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("Event_instancesOrderByWithAggregationInput", {
  isAbstract: true
})
export class Event_instancesOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eventid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eventdate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  starttime?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  salestatus?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  totalseats?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  availableseats?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  purchaseuri?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => Event_instancesCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: Event_instancesCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => Event_instancesAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: Event_instancesAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => Event_instancesMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: Event_instancesMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => Event_instancesMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: Event_instancesMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => Event_instancesSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: Event_instancesSumOrderByAggregateInput | undefined;
}
