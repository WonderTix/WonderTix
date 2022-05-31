import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LinkedticketsOrderByWithAggregationInput } from "../../../inputs/LinkedticketsOrderByWithAggregationInput";
import { LinkedticketsScalarWhereWithAggregatesInput } from "../../../inputs/LinkedticketsScalarWhereWithAggregatesInput";
import { LinkedticketsWhereInput } from "../../../inputs/LinkedticketsWhereInput";
import { LinkedticketsScalarFieldEnum } from "../../../../enums/LinkedticketsScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByLinkedticketsArgs {
  @TypeGraphQL.Field(_type => LinkedticketsWhereInput, {
    nullable: true
  })
  where?: LinkedticketsWhereInput | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: LinkedticketsOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "event_instance_id" | "ticket_type" | "dummy">;

  @TypeGraphQL.Field(_type => LinkedticketsScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: LinkedticketsScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
