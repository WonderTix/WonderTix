import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DonationsOrderByWithAggregationInput } from "../../../inputs/DonationsOrderByWithAggregationInput";
import { DonationsScalarWhereWithAggregatesInput } from "../../../inputs/DonationsScalarWhereWithAggregatesInput";
import { DonationsWhereInput } from "../../../inputs/DonationsWhereInput";
import { DonationsScalarFieldEnum } from "../../../../enums/DonationsScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByDonationsArgs {
  @TypeGraphQL.Field(_type => DonationsWhereInput, {
    nullable: true
  })
  where?: DonationsWhereInput | undefined;

  @TypeGraphQL.Field(_type => [DonationsOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: DonationsOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [DonationsScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "donorid" | "isanonymous" | "amount" | "dononame" | "frequency" | "comments" | "donodate">;

  @TypeGraphQL.Field(_type => DonationsScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: DonationsScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
