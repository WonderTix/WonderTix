import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TickettypeOrderByWithAggregationInput } from "../../../inputs/TickettypeOrderByWithAggregationInput";
import { TickettypeScalarWhereWithAggregatesInput } from "../../../inputs/TickettypeScalarWhereWithAggregatesInput";
import { TickettypeWhereInput } from "../../../inputs/TickettypeWhereInput";
import { TickettypeScalarFieldEnum } from "../../../../enums/TickettypeScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByTickettypeArgs {
  @TypeGraphQL.Field(_type => TickettypeWhereInput, {
    nullable: true
  })
  where?: TickettypeWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TickettypeOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: TickettypeOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TickettypeScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "name" | "isseason" | "seasonid" | "price" | "concessions">;

  @TypeGraphQL.Field(_type => TickettypeScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: TickettypeScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
