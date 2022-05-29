import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EventsOrderByWithAggregationInput } from "../../../inputs/EventsOrderByWithAggregationInput";
import { EventsScalarWhereWithAggregatesInput } from "../../../inputs/EventsScalarWhereWithAggregatesInput";
import { EventsWhereInput } from "../../../inputs/EventsWhereInput";
import { EventsScalarFieldEnum } from "../../../../enums/EventsScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByEventsArgs {
  @TypeGraphQL.Field(_type => EventsWhereInput, {
    nullable: true
  })
  where?: EventsWhereInput | undefined;

  @TypeGraphQL.Field(_type => [EventsOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: EventsOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [EventsScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "seasonid" | "eventname" | "eventdescription" | "active" | "image_url">;

  @TypeGraphQL.Field(_type => EventsScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: EventsScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
