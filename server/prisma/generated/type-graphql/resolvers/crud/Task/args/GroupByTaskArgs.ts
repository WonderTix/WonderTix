import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TaskOrderByWithAggregationInput } from "../../../inputs/TaskOrderByWithAggregationInput";
import { TaskScalarWhereWithAggregatesInput } from "../../../inputs/TaskScalarWhereWithAggregatesInput";
import { TaskWhereInput } from "../../../inputs/TaskWhereInput";
import { TaskScalarFieldEnum } from "../../../../enums/TaskScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByTaskArgs {
  @TypeGraphQL.Field(_type => TaskWhereInput, {
    nullable: true
  })
  where?: TaskWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TaskOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: TaskOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TaskScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "parent_id" | "subject" | "description" | "status" | "assign_to" | "report_to" | "date_created" | "date_assigned" | "due_date" | "rel_contact" | "rel_donation" | "rel_ticket_order" | "rel_account">;

  @TypeGraphQL.Field(_type => TaskScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: TaskScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
