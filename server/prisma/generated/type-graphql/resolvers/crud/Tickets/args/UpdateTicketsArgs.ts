import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TicketsUpdateInput } from "../../../inputs/TicketsUpdateInput";
import { TicketsWhereUniqueInput } from "../../../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateTicketsArgs {
  @TypeGraphQL.Field(_type => TicketsUpdateInput, {
    nullable: false
  })
  data!: TicketsUpdateInput;

  @TypeGraphQL.Field(_type => TicketsWhereUniqueInput, {
    nullable: false
  })
  where!: TicketsWhereUniqueInput;
}
