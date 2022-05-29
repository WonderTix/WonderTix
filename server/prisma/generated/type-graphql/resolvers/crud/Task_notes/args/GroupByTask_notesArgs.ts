import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Task_notesOrderByWithAggregationInput } from "../../../inputs/Task_notesOrderByWithAggregationInput";
import { Task_notesScalarWhereWithAggregatesInput } from "../../../inputs/Task_notesScalarWhereWithAggregatesInput";
import { Task_notesWhereInput } from "../../../inputs/Task_notesWhereInput";
import { Task_notesScalarFieldEnum } from "../../../../enums/Task_notesScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByTask_notesArgs {
  @TypeGraphQL.Field(_type => Task_notesWhereInput, {
    nullable: true
  })
  where?: Task_notesWhereInput | undefined;

  @TypeGraphQL.Field(_type => [Task_notesOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: Task_notesOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "task_id" | "notes" | "date_created">;

  @TypeGraphQL.Field(_type => Task_notesScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: Task_notesScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
