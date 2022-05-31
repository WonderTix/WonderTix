import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TicketsOrderByWithAggregationInput } from "../../../inputs/TicketsOrderByWithAggregationInput";
import { TicketsScalarWhereWithAggregatesInput } from "../../../inputs/TicketsScalarWhereWithAggregatesInput";
import { TicketsWhereInput } from "../../../inputs/TicketsWhereInput";
import { TicketsScalarFieldEnum } from "../../../../enums/TicketsScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByTicketsArgs {
  @TypeGraphQL.Field(_type => TicketsWhereInput, {
    nullable: true
  })
  where?: TicketsWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TicketsOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: TicketsOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"ticketno" | "type" | "eventinstanceid" | "custid" | "paid" | "active" | "checkedin" | "checkedin_ts" | "payment_intent" | "comments">;

  @TypeGraphQL.Field(_type => TicketsScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: TicketsScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
