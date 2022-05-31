import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsOrderByRelationAggregateInput } from "../inputs/LinkedticketsOrderByRelationAggregateInput";
import { SeasonsOrderByWithRelationInput } from "../inputs/SeasonsOrderByWithRelationInput";
import { TicketsOrderByRelationAggregateInput } from "../inputs/TicketsOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("TickettypeOrderByWithRelationInput", {
  isAbstract: true
})
export class TickettypeOrderByWithRelationInput {
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
  isseason?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  seasonid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  price?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  concessions?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SeasonsOrderByWithRelationInput, {
    nullable: true
  })
  seasons?: SeasonsOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsOrderByRelationAggregateInput, {
    nullable: true
  })
  linkedtickets?: LinkedticketsOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TicketsOrderByRelationAggregateInput, {
    nullable: true
  })
  tickets?: TicketsOrderByRelationAggregateInput | undefined;
}
