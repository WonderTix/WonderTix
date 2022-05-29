import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TicketsOrderByWithRelationInput } from "../../../inputs/TicketsOrderByWithRelationInput";
import { TicketsWhereInput } from "../../../inputs/TicketsWhereInput";
import { TicketsWhereUniqueInput } from "../../../inputs/TicketsWhereUniqueInput";
import { TicketsScalarFieldEnum } from "../../../../enums/TicketsScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstTicketsArgs {
  @TypeGraphQL.Field(_type => TicketsWhereInput, {
    nullable: true
  })
  where?: TicketsWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TicketsOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: TicketsOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => TicketsWhereUniqueInput, {
    nullable: true
  })
  cursor?: TicketsWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [TicketsScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"ticketno" | "type" | "eventinstanceid" | "custid" | "paid" | "active" | "checkedin" | "checkedin_ts" | "payment_intent" | "comments"> | undefined;
}
