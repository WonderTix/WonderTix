import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TicketsCreateInput } from "../../../inputs/TicketsCreateInput";

@TypeGraphQL.ArgsType()
export class CreateTicketsArgs {
  @TypeGraphQL.Field(_type => TicketsCreateInput, {
    nullable: false
  })
  data!: TicketsCreateInput;
}
