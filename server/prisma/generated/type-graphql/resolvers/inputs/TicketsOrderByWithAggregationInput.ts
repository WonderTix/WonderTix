import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsAvgOrderByAggregateInput } from "../inputs/TicketsAvgOrderByAggregateInput";
import { TicketsCountOrderByAggregateInput } from "../inputs/TicketsCountOrderByAggregateInput";
import { TicketsMaxOrderByAggregateInput } from "../inputs/TicketsMaxOrderByAggregateInput";
import { TicketsMinOrderByAggregateInput } from "../inputs/TicketsMinOrderByAggregateInput";
import { TicketsSumOrderByAggregateInput } from "../inputs/TicketsSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("TicketsOrderByWithAggregationInput", {
  isAbstract: true
})
export class TicketsOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  ticketno?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  type?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eventinstanceid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  custid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  paid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  active?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  checkedin?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  checkedin_ts?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  payment_intent?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  comments?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => TicketsCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: TicketsCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TicketsAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: TicketsAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TicketsMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: TicketsMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TicketsMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: TicketsMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TicketsSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: TicketsSumOrderByAggregateInput | undefined;
}
